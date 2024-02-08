const Profile = require("../models/Profile")
const User= require("../models/Users")
const { uploadImageToCloudinary } = require("../utils/imageUploader")



exports.updateProfile = async (req, res) => {
    try {
      const {
        firstName = "",
        lastName = "",
        dateOfBirth = "",
        about = "",
        contactNumber = "",
        gender = "",
      } = req.body
      const id = req.user.id
  
      // Find the profile by id
      const userDetails = await User.findById(id)
      const profile = await Profile.findById(userDetails.additionalDetails)
  
      const user = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
      })
      await user.save()
  
      // Update the profile fields
      profile.dateOfBirth = dateOfBirth
      profile.about = about
      profile.contactNumber = contactNumber
      profile.gender = gender
  
      // Save the updated profile
      await profile.save()
  
      // Find the updated user details
      const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
  
      return res.json({
        success: true,
        message: "Profile updated successfully",
        updatedUserDetails,
      })
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        error: error.message,
      })
    }
  }
// deleteaccount

exports.deleteProfile=async(req,res)=>{

    try {
        const {ID}=req.params;

        const userDetails = await User.findById(ID);
        const profileID = userDetails.additionalDetails;
        await Profile.findByIdAndDelete(profileID);
        await User.findByIdAndDelete(Id);
        return res.status(200).json({
            message:"Profile Deleted successfully ",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:"Profile canot be deleted",
            success:false,
            error:error.message
        })  
    }
}

// get all the users

exports.getAllUsers =async(req,res)=>{


    try {
     // get id
    const {ID} = req.params;
    // validate

    if (!ID) {
        return res.status(401).json({
            message:"NO ID FOUND",
            success:false
        })
    // get user Details

    const userDetails =  await User.findById(ID);

    return res.status(200).json({
        message:"User data fetch successfully",
        success:true,
        userDetails
    })
}
    } catch (error) {
        return res.status(500).json({
            message:"User canot be Found",
            success:false,
            error:error.message
        })  
    }



}
exports.getUserDetails=async(req,res)=>{
    try {
        // get user id
        const Id= req.user.id;

        const userDetails= await User.findById(Id).populate({
            path:"additionalDetails"
        }).exec()

        if(!userDetails){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"User  found",
            success:true,
            data:userDetails
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message:"User not found getting error in controller",
            success:false,
            error:error
        })
    }
}
exports.updateDisplayPicture = async (req, res) => {
    try {
    
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        const image = await uploadImageToCloudinary(
          displayPicture,
          process.env.FOLDER_NAME,
          1000,
          1000
        )
        console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
          { _id: userId },
          { image: image.secure_url },
          { new: true }
        )
        res.send({
          success: true,
          message: `Image Updated successfully`,
          data: updatedProfile,
        })
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: error.message,
          error:"getting...."
        })
      }

}