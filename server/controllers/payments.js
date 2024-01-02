const { default: mongoose } = require("mongoose");
const {instance} = require("../config/razorPay");
const Course= require("../models/Course");
const User= require("../models/Users");
const mailSender = require("../utils/mailSender");

exports.capturePayment=async(req,res)=>{
    // get courseId
    const {course_ID}= req.body;
    const UserID= req.User.id;

    //validation
    if (!course_ID) {
        return res.status(401).json({
            success:false,
            message:"please provide valid Course ID"
        })
    }
    // valid courseDetail
    let course;
    try {
        course= await Course.findById(course_ID);
        if (!course) {
            return res.status(401).json({
                success:false,
                message:"couldn't find the course"
            })
        }
        // user already paid ?
        const uid = new mongoose.Types.ObjectId(UserID);
        if (course.studentsEnrolled.includes(uid)) {
           
                return res.status(200).json({
                    success:false,
                    message:"Student is already enrolled"
                })
            
        }

    } catch (error) {
        console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
    }
    // create a order
    const amount = course.price;
    const currency= "INR";

    const options={
        amount: amount*100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseID:course_ID,
            UserID
        }
    }

    try {
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        return res.status(200).json(
            {
                success:true,
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail:course.thumbnail,
                orderId:paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            }
        )
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:"could not initiate order"
        })
    }
}

// verify signature of razorpay and server

exports.verifySignature= async(req,res)=>{
    const webhookSecret= "12345678";

    const signature= req.headers("x-razorpay-signature");

    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (shasum===digest) {
        console.log("payment is Authorized");

        const {courseId , userId}= req.body.payload.payment.entity.notes;

        try {
            // find the course and enroll the student in it
            const enrolledCourse= await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true}
            )

            if (!enrolledCourse) {
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                })
            }
            /// find the course and enroll the student
            const enrolledStudent= await User.findOneAndUpdate(
                {_id:userId},{
                    $push:{courses:courseId}
                },{new:true}
            )
            console.log(enrolledCourse);

            // sent the confirmation mail

            const mailResponse= await mailSender(
                enrolledStudent.email,
                "congratulations from codehelp",
                "Congratulations , you are boarded in to the course"
            )
            console.log(mailResponse);

            return res.status(200).json({
                success:true,
                message:"signature verified and course added"
            })
        } catch (error) {
            return res.status(500).json({
                message:"cannot verify the payment",
                success:false
            })
        }
    }else{
        return res.status(500).json({
            message:"Signature mismatched",
            success:false
        })
    }
}
