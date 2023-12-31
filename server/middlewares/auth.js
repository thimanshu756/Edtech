const jwt = require("jsonwebtoken")
require("dotenv").config();

exports.Auth=async(req,res,next)=>{

    // extract the token

    try {
    const token = req.cookies.token||req.body.token||req.header("Authorization").replace("Bearer","");
    
    if(!token){
        return res.status(500).json({
            message:"Token is missing",
            sucess:false
        })
    }
    try {
       // verify the token
    const decode = await jwt.verify(token,process.env.JWT_SECRET);
    req.user=decode;   
    } catch (error) {
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
exports.isStudents=(req,res,next)=>{

    try {
        if (req.user.accountType!=="Student") {
            return res.Status(401).json({
                sucess:false,
                message:"You are not authorised to enter in student"
            })
        }

    } catch (error) {
        return res.Status(401).json({
            sucess:false,
            message:"User role cannot be verified please try again"
        })
    }
}

// isAdmin 

exports.isAdmin=(req,res,next)=>{

    try {
        if (req.user.accountType!=="Admin") {
            return res.Status(401).json({
                sucess:false,
                message:"You are not authorised to enter in Admin"
            })
        }

    } catch (error) {
        return res.Status(401).json({
            sucess:false,
            message:"User role cannot be verified please try again"
        })
    }
}


// isInstructor
exports.isInstructor=(req,res,next)=>{

    try {
        if (req.user.accountType!=="Instructor") {
            return res.Status(401).json({
                sucess:false,
                message:"You are not authorised to enter in Instructor"
            })
        }

    } catch (error) {
        return res.Status(401).json({
            sucess:false,
            message:"User role cannot be verified please try again"
        })
    }
}