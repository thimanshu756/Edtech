const SubSection= require("../models/SubSection");
const { uploadToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const Section= require("../models/Section");

exports.createSubSection= async(req,res)=>{

    try {
        // fetch all the data
        const {sectionId,title,timeDuration,description}=req.body;

        // extract file video
        const video = req.files.videoFile;
        
        // validate 
        if (!sectionId||!title||!timeDuration||!description||!video) {
            return res.status(401).json({
                message:"Plese enter all the fields properly",
                success:false
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadToCloudinary(video,process.env.FOLDER_NAME);

        // create a subsection

        const subSectionDetails= await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url
        })

        // update the section with subsection
        const updatedSection = await Section.findByIdAndUpdate(
            {_id:sectionId},{
                $push:{
                    subSection:subSectionDetails._id,
                }
            },{new:true}
        )
        return res.status(200).json({
            message:"SubSection created successfully ",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:"SubSection canot be created",
            success:false,
            
        })  
    }
}

// update Subsection

exports.updateSubsection = async(req, res)=>{
    try {
                // fetch all the data
                const {subSectionId,title,timeDuration,description}=req.body;

                // extract file video
                const video = req.files.videoFile;
                const updatedSubSection = await Section.findByIdAndUpdate(
                    {_id:subSectionId},{
                        title:title,
                        timeDuration:timeDuration,
                        description:description,
                        videoUrl:uploadDetails.secure_url
                    },{new:true}
                )
                return res.status(200).json({
                    message:"SubSection updated successfully ",
                    success:true
                })
    } catch (error) {
        return res.status(500).json({
            message:"SubSection canot be updated",
            success:false,
            
        })  
    }
}

// delete the subsection


exports.deleteSubSection=async(req,res)=>{

    try {
        const {SubSectionId}=req.params;
        await Section.findByIdAndDelete(SubSectionId);
        return res.status(200).json({
            message:"SubSection Deleted successfully ",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:"SubSection canot be deleted",
            success:false,
            error:error.message
        })  
    }
}