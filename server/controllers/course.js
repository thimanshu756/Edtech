const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/Users");
const { uploadToCloudinary } = require("../utils/imageUploader");



exports.createCourse=async(req,res)=>{

    try {
            // fetch data
        const {courseName,courseDescription,whatYouWillLearn, price,tag}=req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;
        // validation
        if (!courseName||!courseDescription||!whatYouWillLearn||!price||!tag) {
            return res.status(401).json({
                message:"Please fill all the data correctly",
                success:false,
            })
        }
        // check for instructor
        const userId = req.user.id;
        const InstructorDetails = await User.findById(userId);
        if (!InstructorDetails) {
           return res.status(401).json({
                message:"Instructor details not found",
                success:false
            })
        }
        const Tagdetails = await Tag.findById(tag);
        if (!Tagdetails) {
            return res.status(401).json({
                message:"Tag details not found",
                success:false
            })
        }
        // upload img to  cloudinary
        const thumbnailImage = await uploadToCloudinary(thumbnail,process.env.FolderName);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:InstructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:Tagdetails._id,
            thumbnail:thumbnailImage.secure_url,
        })
        console.log(newCourse);
        
        // ad a new course to user schema of instructor
        const newInstructorCourse= await User.findByIdAndUpdate({id:InstructorDetails._id},{
            $push:{
                courses:newCourse._id
            },
           
        },{new:true}
        )
        console.log(newInstructorCourse);
        // update the Tag Schema :Todo
        return res.status(200).json({
            message:"course created ",
            success:true
        })
    } catch (error) {
        return res.status(401).json({
            message:"Error in creating Course",
            success:false
        })
    }

}