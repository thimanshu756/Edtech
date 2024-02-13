const SubSection= require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const Section= require("../models/Section");

exports.createSubSection= async(req,res)=>{

    try {
        // fetch all the data
        const {sectionId,title,timeDuration,description}=req.body;

        // extract file video
        const video = req.files.video;
        
      
        // validate 
        if (!sectionId||!title||!description||!video) {
            return res.status(401).json({
                message:"Plese enter all the fields properly",
                success:false
            })
        }
        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);

        // create a subsection

        const subSectionDetails= await SubSection.create({
            title:title,
            // timeDuration:timeDuration,
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
        ).populate("subSection")

        return res.status(200).json({
            message:"SubSection created successfully ",
            success:true,
            data:updatedSection
        })
    } catch (error) {
        console.log("error is -->",error);
        return res.status(500).json({
            message:"SubSection canot be created",
            success:false,
            
        })  
    }
}

// update Subsection

exports.updateSubsection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

// delete the subsection


exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }