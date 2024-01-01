const Profile = require("../models/Profile")
const User= require("../models/Users")


//updateprofile

exports.updateProfile= async(req,res)=>{

    try {
    // get data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        // get user id
        const ID = req.user.id;
        // find the profile

        const userDetails = await User.findById(ID);
        const profileID = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileID);

        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            message:"profile updated successfully ",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:"profile canot be updates",
            success:false,
            
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