// const { default: mongoose } = require("mongoose");
// const {instance} = require("../config/razorPay");
// const Course= require("../models/Course");
// const User= require("../models/Users");
// const mailSender = require("../utils/mailSender");

// exports.capturePayment=async(req,res)=>{
//     // get courseId
//     const {course_ID}= req.body;
//     const UserID= req.User.id;
//     //validation
//     if (!course_ID) {
//         return res.status(401).json({
//             success:false,
//             message:"please provide valid Course ID"
//         })
//     }
//     // valid courseDetail
//     let course;
//     try {
//         course= await Course.findById(course_ID);
//         if (!course) {
//             return res.status(401).json({
//                 success:false,
//                 message:"couldn't find the course"
//             })
//         }
//         // user already paid ?
//         const uid = new mongoose.Types.ObjectId(UserID);
//         if (course.studentsEnrolled.includes(uid)) {         
//                 return res.status(200).json({
//                     success:false,
//                     message:"Student is already enrolled"
//                 })       
//         }
//     } catch (error) {
//         console.error(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//     }
//     // create a order
//     const amount = course.price;
//     const currency= "INR";
//     const options={
//         amount: amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         notes:{
//             courseID:course_ID,
//             UserID
//         }
//     }
//     try {
//         // initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);
//         return res.status(200).json(
//             {
//                 success:true,
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail:course.thumbnail,
//                 orderId:paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount
//             }
//         )
//     } catch (error) {
//         console.log(error);
//         res.json({
//             success:false,
//             message:"could not initiate order"
//         })
//     }
// }
// // verify signature of razorpay and server

// exports.verifyPayment= async(req,res)=>{
//     const webhookSecret= "12345678";

//     const signature= req.headers("x-razorpay-signature");

//     const shasum = crypto.createHmac("sha256",webhookSecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if (shasum===digest) {
//         console.log("payment is Authorized");

//         const {courseId , userId}= req.body.payload.payment.entity.notes;

//         try {
//             // find the course and enroll the student in it
//             const enrolledCourse= await Course.findOneAndUpdate(
//                 {_id:courseId},
//                 {$push:{studentsEnrolled:userId}},
//                 {new:true}
//             )

//             if (!enrolledCourse) {
//                 return res.status(500).json({
//                     success:false,
//                     message:"Course not found"
//                 })
//             }
//             /// find the course and enroll the student
//             const enrolledStudent= await User.findOneAndUpdate(
//                 {_id:userId},{
//                     $push:{courses:courseId}
//                 },{new:true}
//             )
//             console.log(enrolledCourse);

//             // sent the confirmation mail

//             const mailResponse= await mailSender(
//                 enrolledStudent.email,
//                 "congratulations from codehelp",
//                 "Congratulations , you are boarded in to the course"
//             )
//             console.log(mailResponse);

//             return res.status(200).json({
//                 success:true,
//                 message:"signature verified and course added"
//             })
//         } catch (error) {
//             return res.status(500).json({
//                 message:"cannot verify the payment",
//                 success:false
//             })
//         }
//     }else{
//         return res.status(500).json({
//             message:"Signature mismatched",
//             success:false
//         })
//     }
// }
// exports.sendPaymentSuccessEmail=async(req,res)=>{
// }

const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
 const User= require("../models/Users");
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {
  courseEnrollmentEmail,
} = require("../templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  const { courses } = req.body
  const userId = req.user.id
  if (courses.length === 0) {
    return res.json({ success: false, message: "Please Provide Course ID" })
  }

  let total_amount = 0
  console.log("courses -->",courses);
  for (const course_id of courses) {
    let course
    try {
      // Find the course by its ID
      course = await Course.findById(course_id)

      // If the course is not found, return an error
      console.log("course is -->",course);
      if (!course) {
        return res
          .status(200)
          .json({ success: false, message: "Could not find the Course" })
      }

      // Check if the user is already enrolled in the course
      const uid = new mongoose.Types.ObjectId(userId)
      if (course.studentsEnrolled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" })
      }

      // Add the price of the course to the total amount
      total_amount += course.price
    } catch (error) {
      console.log("errrror-->",error)
      return res.status(500).json({ success: false, message: error.message })
    }
  }

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: Math.random(Date.now()).toString(),
  }

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log(paymentResponse)
    res.json({
      success: true,
      data: paymentResponse,
    })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "Could not initiate order." })
  }
}

// verify the payment
exports.verifyPayment = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id
  const razorpay_payment_id = req.body?.razorpay_payment_id
  const razorpay_signature = req.body?.razorpay_signature
  const courses = req.body?.courses

  const userId = req.user.id

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    await enrollStudents(courses, userId, res)
    return res.status(200).json({ success: true, message: "Payment Verified" })
  }

  return res.status(200).json({ success: false, message: "Payment Failed" })
}

// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
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
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

// enroll the student in the courses
const enrollStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please Provide Course ID and User ID" })
  }

  for (const courseId of courses) {
    try {
      // Find the course and enroll the student in it
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      )

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, error: "Course not found" })
      }
      console.log("Updated course: ", enrolledCourse)

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      })
      console.log("course progress created -->",courseProgress);
      // Find the student and add the course to their list of enrolled courses
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      )
      console.log("Enrolled student: ", enrolledStudent)
      // Send an email notification to the enrolled student
      const emailResponse = await mailSender(
        enrolledStudent.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`
        )
      )

      console.log("Email sent successfully: ", emailResponse.response)
    } catch (error) {
      console.log("error in enrollStudents -->",error)
      return res.status(400).json({ success: false, error: error.message })
    }
  }
}