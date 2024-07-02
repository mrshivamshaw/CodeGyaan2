import mongoose from "mongoose";
import Course from "../models/course.js";
import User from "../models/user.js";
import { instance } from "../config/razorpay.js";
import crypto from "crypto";
import courseProgess from "../models/courseProgess";
import mailSender from "../utils/mailSender.js";

export const order = async (req, res) => {
  try {
    const { courses, userId } = req.body;

    //check the courses are there are or not
    if (!courses) {
      return res.status(400).json({
        message: "Course not found",
        success: false,
      });
    }

    let totalAmount = 0;

    //check all the course is valid or not
    for (const course_id in courses) {
      let course;
      try {
        course = await Course.findById(course_id);
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

        totalAmount += course.price;
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          message: error.message,
          success: false,
        });
      }

      const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
      };

      try {
        //initiate payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res
          .status(200)
          .json({ payment: paymentResponse, success: true });
      } catch (error) {}
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
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    courses,
    userid,
  } = req.body;
  if (
    !razorpay_order_id ||
    razorpay_payment_id ||
    razorpay_signature ||
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
    return res.status(200).json({
      message: "Payment verified successfully",
      success: true,
    });
  }
};

export const enrollStudent = async (courses, userid, res) => {
  try {
    if (!courses || !userid) {
      return res.status(400).json({
        message: "Courses or userid is missing",
        success: false,
      });
    }
    for (const course_id in courses) {
      try {
        const course = await Course.findById(course_id);
        course.studentsEnrolled.push(userid);
        await course.save();

        if (!course) {
          return res.status(400).json({
            message: "Course not found",
            success: false,
          });
        }

        //create the courseProgess
        const courseProgress = await courseProgess.create({
          courseID: course_id,
          userId: userid,
          completedVideos: [],
        });

        //find the user and updated their enrolled courses
        const user = await User.findByIdAndUpdate(
          {
            _id: userid,
          },
          {
            $push: {
              enrolledCourses: course_id,
              courseProgess: courseProgress._id,
            },
          },
          {
            new: true,
          }
        );

        console.log("Enrolled student : ", user);
        const emailResponse = await mailSender(
          user.email,
          "Course Enrolled",
          `Your course ${course.title} is enrolled successfully`
        );
        console.log("Email response : ", emailResponse.response);
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
