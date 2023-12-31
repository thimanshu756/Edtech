const User = require("../models/Users");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
const bcrypt = require("bcrypt")
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
dotenv.config();
exports.SendOtp =async(req,res)=>{

    try {
         // get email from user
        const {email} = req.body;
        // check if user already exist or not
        const userexists = await User.findOne({email});
        
        if (userexists) {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        // generateotp
        let otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        // check whether the otp is unique or not
        const result = await OTP.findOne({otp:otp});
        while(result) {
            // again generate the otp
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
            // Again check the result
            result = await OTP.findOne({otp:otp});
        }
        // create entry in db
        const otpPayload ={email , otp}
        const otpBody= await OTP.create(otpPayload)

        console.log("Otp Body in Send OTP func is :",otpBody);
        return res.status(200).json({
            success:true,
            message:'Otp generated sucessfully'
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Getting error while sending the Otp',
        })
    }
}

// Signup handler

exports.signUp=async(req,res)=>{

    try {
            // fetch the data from req body

    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        contactNumber,
        otp
    }= req.body;
    // validate the data
    if(!firstName || !lastName||!email||!password||!confirmPassword||!accountType||!contactNumber||!otp){
        return res.status(400).json({
            success:false,
            message:"please enter all the fields properly"
        })
    }
    // match the both password
    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password dont match"
        })
    }
    // check user already exists or not

    const userExists = User.findOne({email});
    if (userExists) {
        return res.status(400).json({
            success:false,
            message:"User already exists "
        })
    }
    // find the recent otp

    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    // validate otp
    if(recentOtp.length==0){
        return res.status(400).json({
            success:false,
            message:'Getting invalid otp from DB',
        })   
    }else if(otp!==recentOtp){
        return res.status(400).json({
            success:false,
            message:'Invalid otp entered',
        })   
    }
    // hash the password
    const hashedPass = await bcrypt.hash(password,10);

    const profileDetails = await Profile.create({
        gender:null,
        dateOfBirth:null,
        about:null,
        contactNumber:null
    })
    // create entry in db
    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPass,
        accountType,
        additionalDetails:profileDetails._id,
        img:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    });
    console.log("User that is saved in DB is :" , user);
    return res.status(200).json({
        success:true,
        message:"User registerd sucessfully",
        user
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Getting error Signing up',
        })
    }



}
// login controller

exports.login=async(req,res)=>{
    try {
    // get data from req.body
    const {email , password}=req.body;

    // validate data 
    if(!email||!password){
        return res.status(500).json({
            success:false,
            message:'Getting error while sending the Otp',
        })
    }
    // check user exists or not
    const user = await User.findOne({email}).populate("additionalDetails");
    if(!user){
        return res.status(400).json({
            success:false,
            message:'User doesnot Exists please signup first',
        })
    }

    // generate token after pass comparing 
    if (bcrypt.compare(password,user.password)){
        const payload ={
            email:user.email,
            id:user._id,
            accountType:user.accountType
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        });
        user.token=token;
        user.password=undefined;
    }
    // create cookie

    const options ={
        expires:new Date(Date.now()+3*24*60*60**1000);
        httpOnly:true
    }
    res.cookie("token",token,options).status(200).json({
        success:true,
        message:"Logged in sucessfully",
        token,
        user
    })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:'Getting error in login',
        })
    }

}



// change password