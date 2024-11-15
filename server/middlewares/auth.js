const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.auth=async(req,res,next)=>{

    // extract the token

    try {
        console.log("inside auth");
    const token = req.cookies.token||req.body.token||req.header("Authorization").replace("Bearer ","");
    
    console.log("Token is {} -->",token);

    if(!token){
        return res.status(500).json({
            message:"Token is missing",
            sucess:false
        })
    }

    try {
       // verify the token
       console.log("Secret 1 is -->",process.env.JWT_SECRET);
    const decode = await jwt.verify(token , process.env.JWT_SECRET);
    console.log("Secret is -->",process.env.JWT_SECRET);
    req.user=decode;
    console.log("Decode is -->",decode);
    } catch (error) {
        console.log("The error is -->",error);
        return res.status(401).json({
            message:"Token is wrong",
            sucess:false
        })
    }
    next();
    
    } catch (error) {
        return res.status(401).json({
            message:"Something went wrong while validating the token",
            sucess:false
        })
    }

}

// isStudent
exports.isStudent=(req,res,next)=>{

    try {
        if (req.user.accountType!=="Student") {
            return res.status(401).json({
                sucess:false,
                message:"You are not authorised to enter in student"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:"User role cannot be verified please try again"
        })
    }
}

// isAdmin 

exports.isAdmin=(req,res,next)=>{

    try {
        console.log("inside isAdmin");
        if (req.user.accountType!=="Admin") {
            return res.status(401).json({
                sucess:false,
                message:"You are not authorised to enter in Admin"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:"User role cannot be verified please try again"
        })
    }
}


// isInstructor
exports.isInstructor=(req,res,next)=>{

    try {
        if (req.user.accountType!=="Instructor") {
            return res.status(401).json({
                sucess:false,
                message:"You are not authorised to enter in Instructor"
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            sucess:false,
            message:"User role cannot be verified please try again"
        })
    }
}