const Section = require("../models/Section")
const Course= require("../models/Course")

exports.createSection=async(req,res)=>{

   try {
     // fetch the data
     const {sectionName,courseId }=req.body;


     // validate
     if (!sectionName||!courseId) {
         return res.status(401).json({
             message:"please Enter all the fields properly"
         })
     }
     // create a entry in DB
     const sectionData= await Section.create({
         sectionName:sectionName
     })


     // update course with section object Id
     const updatedCourse = await Course.findByIdAndUpdate(courseId,{
         $push:{courseContent:sectionData._id}
     },{new:true})
     .populate({
        path: "courseContent",
        populate: {
            path: "subSection",
        },
    })
    .exec();

     // return Response 
     
     return res.status(200).json({
         message:"Section created successfully ",
         success:true,
         updatedCourse
     })
   } catch (error) {
    console.log("error in create section -->",error);
    return res.status(500).json({
        message:"Section canot be created",
        success:false
    })
   }
}

// update section
exports.updateSection=async(req,res)=>{

 try {
       // fetch data
       const {sectionName,sectionId}=req.body;

       // validate
       if (!sectionName||!sectionId) {
           return res.status(401).json({
               message:"please Enter all the fields properly"
           })
       }
           // update section
           const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
           // return response

           return res.status(200).json({
            message:"Section updated successfully ",
            success:true
        })
 } catch (error) {
    return res.status(500).json({
        message:"Section canot be updated",
        success:false,
        error:error.message
    })
 }

}
// delete section

exports.deleteSection=async(req,res)=>{

    try {
        const {sectionId}=req.params;
        await Section.findByIdAndDelete(sectionId);
        return res.status(200).json({
            message:"Section Deleted successfully ",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:"Section canot be deleted",
            success:false,
            error:error.message
        })  
    }
}