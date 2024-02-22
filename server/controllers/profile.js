const Profile = require("../models/Profile")
const User = require("../models/Users")
const CourseProgress = require("../models/CourseProgress")
const { uploadImageToCloudinary } = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration")
const Course = require("../models/Course")
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
exports.deleteProfile = async (req, res) => {

  try {
    const { ID } = req.params;

    const userDetails = await User.findById(ID);
    const profileID = userDetails.additionalDetails;
    await Profile.findByIdAndDelete(profileID);
    await User.findByIdAndDelete(Id);
    return res.status(200).json({
      message: "Profile Deleted successfully ",
      success: true
    })
  } catch (error) {
    return res.status(500).json({
      message: "Profile canot be deleted",
      success: false,
      error: error.message
    })
  }
}
// get all the users
exports.getAllUsers = async (req, res) => {

  try {
    // get id
    const { ID } = req.params;
    // validate

    if (!ID) {
      return res.status(401).json({
        message: "NO ID FOUND",
        success: false
      })
      // get user Details

      const userDetails = await User.findById(ID);

      return res.status(200).json({
        message: "User data fetch successfully",
        success: true,
        userDetails
      })
    }
  } catch (error) {
    return res.status(500).json({
      message: "User canot be Found",
      success: false,
      error: error.message
    })
  }



}
exports.getUserDetails = async (req, res) => {
  try {
    // get user id
    const Id = req.user.id;

    const userDetails = await User.findById(Id).populate({
      path: "additionalDetails"
    }).exec()

    if (!userDetails) {
      return res.status(400).json({
        message: "User not found",
        success: false
      })
    }
    return res.status(200).json({
      message: "User  found",
      success: true,
      data: userDetails
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "User not found getting error in controller",
      success: false,
      error: error
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
      error: "getting...."
    })
  }

}
exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()
    userDetails = userDetails.toObject()
    console.log("userDetails -->", userDetails.courses);
    var SubsectionLength = 0
    for (var i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      SubsectionLength = 0
      for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[
          j
        ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
        console.log("total duration in seconds -->", totalDurationInSeconds);
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          totalDurationInSeconds
        )
        console.log("total duration after conversion -->", convertSecondsToDuration(totalDurationInSeconds));
        SubsectionLength +=
          userDetails.courses[i].courseContent[j].subSection.length
      }
      let courseProgressCount = await CourseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId: userId,
      })
      console.log("courseProgress count -->", courseProgressCount);
      courseProgressCount = courseProgressCount?.completedVideos.length
      console.log("courseProgress count 2-->", courseProgressCount);
      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        // To make it up to 2 decimal point
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round(
            (courseProgressCount / SubsectionLength) * 100 * multiplier
          ) / multiplier
      }
    }

    console.log("data -->", userDetails.courses);
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })
    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }
      return courseDataWithStats
    })
    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server Error", error: error.message })
  }
}
exports.getAllInstructor = async (req, res) => {
  try {
    console.log("inside get all Instructor");
    const allInstructors = await User.find({
      accountType: "Instructor"
    }).populate({
      path: "additionalDetails",
      select: "about",
    })
    // console.log("All Instructors -->",allInstructors);
    if (!allInstructors) {
      return res.status(400).json({
        message: "AllInstructors not found",
        success: false,
    
      })
    }
    return res.status(200).json({
      success:true,
      message:"Sucessfully Fetched instructor data",
      data:allInstructors
    })
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Instructor not found getting error in controller",
      success: false,
      error: error
    })
  }
}