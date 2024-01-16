const User = require("../models/Users")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
// resetpassword token

exports.resetPasswordToken=async(req,res)=>{
    try {
        // fetch email from req
        const email = req.body.email;
        // validate
        console.log("email is :",email);
        if(!email){
            return res.Status(401).json({
                sucess:false,
                message:"Please Enter the email properly"
            })
        }
        // kya user hai
        const user= await User.findOne({email:email});
        console.log("USER IS -->",user);
        if(!user){
            return res.Status(401).json({
                sucess:false,
                message:"Enterd email has no account ! Please create first"
            })
        }
        const token = crypto.randomUUID();

        const url = `http://localhost:3000/update-password/${token}`

        // update the user by adding token and expiration time
        const updatedDetails= await User.findOneAndUpdate({email:email},
            {
                token:token,
                resetPasswordExpires:Date.now()+5*60*100
            },
            {new:true})
            // send the mail containing the url
            const mailData= await mailSender(email,"password Reset Link",`Password reset link : ${url}`);
            return res.status(200).json({
                sucess:true,
                message:"Mail Sent Sucessfully"
            })
    } catch (error) {
          console.log(error);
        return res.status(500).json({
            sucess:false,
            message:"Getting error in setting resetToken"
        })
    }
}

// resetpassword
exports.resetPassword=async(req,res)=>{
    try {
    const {password,confirmPassword,token}=req.body;
        
    //validation
    if (!password||!confirmPassword||!token) {
        return res.Status(401).json({
            sucess:false,
            message:"Fill all the fields properly"
        })
    }
    // get userdetails from db using token
    const userDetails = await User.findOne({token:token});
    // no entry if token is expired
    console.log("date is --->",userDetails.resetPasswordExpires);
    console.log(" my date is --->",Date.now());
    if (userDetails.resetPasswordExpires>Date.now()){
        return res.status(401).json({
            sucess:false,
            message:"Token expired ! please try again"
        })
    }
    // hash the password
    const hashedPass= await bcrypt.hash(password,10);
    // update the password
    const userUpdated= await User.findOneAndUpdate({token:token},{password:hashedPass},{new:true});
    return res.status(200).json({
        sucess:true,
        message:"Password changed sucessfully"
    })
    } catch (error) {
        return res.status(500).json({
            sucess:false,
            message:"Getting error in updating the password"
        })
    }

}