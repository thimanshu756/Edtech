const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/Users");
const { uploadToCloudinary } = require("../utils/imageUploader");
const { populate } = require("../models/Course");



exports.createCourse = async (req, res) => {

  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;

    // get thumbnail
    const thumbnail = req.files.thumbnailImage;
    // validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag) {
      return res.status(401).json({
        message: "Please fill all the data correctly",
        success: false,
      })
    }
    // check for instructor
    const userId = req.user.id;
    const InstructorDetails = await User.findById(userId);
    if (!InstructorDetails) {
      return res.status(401).json({
        message: "Instructor details not found",
        success: false
      })
    }
    const Tagdetails = await Tag.findById(tag);
    if (!Tagdetails) {
      return res.status(401).json({
        message: "Tag details not found",
        success: false
      })
    }
    // upload img to  cloudinary
    const thumbnailImage = await uploadToCloudinary(thumbnail, process.env.FolderName);

    // create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: InstructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: Tagdetails._id,
      thumbnail: thumbnailImage.secure_url,
    })
    console.log(newCourse);

    // ad a new course to user schema of instructor
    const newInstructorCourse = await User.findByIdAndUpdate({ id: InstructorDetails._id }, {
      $push: {
        courses: newCourse._id
      },

    }, { new: true }
    )
    console.log(newInstructorCourse);
    // update the Tag Schema :Todo
    return res.status(200).json({
      message: "course created ",
      success: true
    })
  } catch (error) {
    return res.status(401).json({
      message: "Error in creating Course",
      success: false
    })
  }

}

exports.editCourse = async (req, res) => {

  // fetch the data 

  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    // validation 
    if (!course) {
      return res.status(401).json({
        success: false,
        message: "Could not find the course"
      })
    }
    // update the thumbnail if found
    if (req.files) {
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadToCloudinary(
        thumbnail,
        process.env.FolderName
      )
      Course.thumbnail = thumbnailImage.secure_url;
    }
    // update only the fields that are present in req body 
    for (const key in updates) {
      if (updates hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          Course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    // save the course 
    await Course.save();
    // find the updated course and populate it 
    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "Instructor"
        populate({
          path:"courseContent",
          populate({
            path: "subSection"
          })
        })
}).exec();

return res.json({
  success: true,
  message: "Course updated successfully",
  data: updatedCourse,
})
  } catch (error) {
  return res.status(400).json({
    message: "Getting error in editing the course",
    success: false,
    error: error.message
  })
}
}

exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({ status: "published" }, {
      courseName: true,
      price: true,
      thumbnail: true,
      instructor: true,
      ratingAndReview: true,
      studentsEnrolled: true
    })
      .populate("Instructor").exec();
    return res.status(200).json({
      message: "All courses fetched successfully",
      success: true,
      data: getAllCourses
    })
  } catch (error) {
    return res.status(400).json({
      message: "Getting error in editing the course",
      success: false,
      error: error.message
    })
  }
}
}

exports.getCourseDetail = aync(req, res)=> {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId
    })
  } catch (error) {

  }
}


