import mongoose from "mongoose";
import Course from "../models/course.js";
import User from "../models/user.js";
import courseProgess from "../models/courseProgess.js";
import { instance } from "../config/razorpay.js";
import crypto from "crypto";
import mailSender from "../utils/mailSender.js";

export const order = async (req, res) => {
  try {
    const { courses, id } = req.body;
    const userId = id;
    // console.log(req.body);
    //check the courses are there are or not
    if (!courses) {
      return res.status(400).json({
        message: "Course not found",
        success: false,
      });
    }
    // console.log(courses);
    let totalAmount = 0;

    //check all the course is valid or not
    for (const course_id of courses) {
      let course;
    //   console.log("course_id",course_id);
      try {
        course = await Course.findById({_id : course_id});
        if (!course) {
          return res.status(400).json({
            message: "Course not found",
            success: false,
          });
        }
        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
          return res.status(400).json({
            message: "Already enrolled",
            success: false,
          });
        }

        // console.log(course);
        totalAmount += course.price;
        // console.log(totalAmount);
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }

    }
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
    };

    try {
      //initiate payment using razorpay
      const paymentResponse = await instance.orders.create(options);
      // console.log(paymentResponse);
      return res
        .status(200)
        .json({ payment: paymentResponse, success: true });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

//verify payment
export const verifyPayment = async (req, res) => {
    // console.log(req.body);
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courses,
    id,
  } = req.body;
  const userid = id;
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userid
  ) {
    return res.status(400).json({
      message: "All fields are required",
      success: false,
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZOR_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await enrollStudent(courses, userid, res);
    const user = await User.findById(userid);
    let amount = 0;
    let courseIds = [];
    for(let i = 0; i < user.cart.courses.length; i++) {
      if (!courses.includes(user.cart.courses[i].toString())) {
        // Add the course ID to the new array
        courseIds.push(user.cart.courses[i]);
    
        // Find the course by ID and add its price to the amount
        const course = await Course.findById(user.cart.courses[i]);
        if (course) {
          amount += course.price;
        }
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      {
        $set: {
          "cart.courses": courseIds,
          "cart.totalPrice": amount
        },
      },
      { new: true }
    );
    console.log(courseIds,amount);
    console.log("main bhai",updatedUser);
    return res.status(200).json({
      message: "Payment verified successfully",
      success: true,
      user : updatedUser
    });
  }

  return res.status(400).json({
    message: "Invalid signature sent!",
    success: false,
  });
};

//send payment success email
export const sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount,id } = req.body
  
    const userId = id
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        // paymentSuccessEmail(
        //   `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        //   amount / 100,
        //   orderId,
        //   paymentId
        // )
        {
          name: `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount : amount / 100,
          orderId,
          paymentId
        }
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
  

export const enrollStudent = async (courses, userid, res) => {
  try {
    if (!courses || !userid) {
      return res.status(400).json({
        message: "Courses or userid is missing",
        success: false,
      });
    }
    for (const course_id of courses) {
      try {
        const course = await Course.findByIdAndUpdate(course_id, {
          $push: { studentsEnrolled: userid },
        }, {
          new: true,
        });
        // course.studentsEnrolled.push(userid);
        // await course.save();

        if (!course) {
          return res.status(400).json({
            message: "Course not found",
            success: false,
          });
        }
        // console.log(course);
        //create the courseProgess
        const courseProgress = await courseProgess.create({
          courseId: course_id,
          userId: userid,
          completedVideos: [],
        });

        if (!courseProgress) {  
          return res.status(400).json({
            message: "Course progress not created",
            success: false,
          })
        }
          else{
            console.log("Course progress created : ", courseProgress);
          }
        //find the user and updated their enrolled courses
        const user = await User.findByIdAndUpdate(
          {
            _id: userid,
          },
          {
            $push: {
              enrolledCourses: course_id,
              courseProgress: courseProgress._id,
            },
          },
          {
            new: true,
          }
        );

        // console.log("Enrolled student : ", user);
        const emailResponse = await mailSender(
          user.email,
          "Course Enrolled",
          `Your course ${course.title} is enrolled successfully`
        );
        // console.log("Email response : ", emailResponse.response);
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
        message : error.message,
        success : false
    })
  }
};
