import mongoose from "mongoose";
import Course from "../models/course.js";
import User from "../models/user.js";
import courseProgess from "../models/courseProgess.js";
import { instance } from "../config/razorpay.js";
import crypto from "crypto";
import mailSender, { escapeHtml } from "../utils/mailSender.js";

export const order = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;
    // console.log(req.body);
    //check the courses are there are or not
    if (!courses || !Array.isArray(courses) || courses.length === 0) {
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
      receipt: Date.now().toString(),
      // Bind the purchase to this user and course list so verification
      // cannot be tricked with a different set of courses
      notes: {
        userId: userId.toString(),
        courses: JSON.stringify(courses),
      },
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
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;
  const userid = req.user.id;
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
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

  const signatureBuffer = Buffer.from(razorpay_signature, "utf8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf8");
  const signatureValid =
    signatureBuffer.length === expectedBuffer.length &&
    crypto.timingSafeEqual(signatureBuffer, expectedBuffer);

  if (signatureValid) {
    // Take the paid-for course list from the Razorpay order itself,
    // never from the client
    let courses;
    try {
      const razorpayOrder = await instance.orders.fetch(razorpay_order_id);
      if (!razorpayOrder?.notes?.userId || razorpayOrder.notes.userId !== userid.toString()) {
        return res.status(403).json({
          message: "This order does not belong to you",
          success: false,
        });
      }
      courses = JSON.parse(razorpayOrder.notes.courses);
    } catch (orderError) {
      console.log(orderError);
      return res.status(400).json({
        message: "Could not verify order details",
        success: false,
      });
    }

    try {
      await enrollStudent(courses, userid);
    } catch (enrollError) {
      console.log(enrollError);
      return res.status(500).json({ message: enrollError.message, success: false });
    }
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
    const { orderId, paymentId, amount } = req.body

    const userId = req.user.id

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
        `<h2>Payment Successful</h2>
<p>Hi ${escapeHtml(enrolledStudent.firstName)} ${escapeHtml(enrolledStudent.lastName)},</p>
<p>Your payment of <strong>₹${escapeHtml(amount / 100)}</strong> was received.</p>
<p>Order ID: <strong>${escapeHtml(orderId)}</strong></p>
<p>Payment ID: <strong>${escapeHtml(paymentId)}</strong></p>
<p>Thank you for enrolling!</p>`
      )
      return res.status(200).json({ success: true, message: "Email sent successfully" })
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
  

export const enrollStudent = async (courses, userid) => {
  if (!courses || !userid) {
    throw new Error("Courses or userid is missing");
  }
  for (const course_id of courses) {
    const course = await Course.findByIdAndUpdate(course_id, {
      $push: { studentsEnrolled: userid },
    }, { new: true });

    if (!course) {
      throw new Error("Course not found");
    }

    const courseProgress = await courseProgess.create({
      courseId: course_id,
      userId: userid,
      completedVideos: [],
    });

    if (!courseProgress) {
      throw new Error("Course progress not created");
    }

    const user = await User.findByIdAndUpdate(
      { _id: userid },
      {
        $push: {
          enrolledCourses: course_id,
          courseProgress: courseProgress._id,
        },
      },
      { new: true }
    );

    await mailSender(
      user.email,
      "Course Enrolled",
      `<p>Your course <strong>${escapeHtml(course.title)}</strong> has been enrolled successfully.</p>`
    );
  }
};
