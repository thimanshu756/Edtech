const User = require("../models/Users");
const otpGenerator = require("otp-generator");
const OTP = require("../models/OTP");
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