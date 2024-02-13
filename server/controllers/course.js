const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/Users");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { populate } = require("../models/Course");
const Courseprogress = require("../models/CourseProgress")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const Category= require("../models/Category")
exports.createCourse = async (req, res) => {

  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag ,category} = req.body;

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
    const CategoryDetails = await Category.findById(category);
    if (!CategoryDetails) {
      return res.status(401).json({
        message: "Tag details not found",
        success: false
      })
    }
    // upload img to  cloudinary
    const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FolderName);

    // create an entry for new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: InstructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag:tag,
      category:category._id,
      thumbnail: thumbnailImage.secure_url,
    })
    console.log(newCourse);

    // ad a new course to user schema of instructor
    const newInstructorCourse = await User.findByIdAndUpdate({ _id: InstructorDetails._id }, {
      $push: {
        courses: newCourse._id
      },

    }, { new: true }
    )
    console.log(newInstructorCourse);
    // update the Tag Schema :Todo
    return res.status(200).json({
      message: "course created ",
      success: true,
      data:newCourse
    })
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Error in creating Course",
      success: false
    })
  }

}
exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
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
exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await Course.findOne({
      _id: courseId
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        }
      })
      .populate("category")
      // .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videourl"
        }
      }).exec();

    // time duration management
    // const totalDurationInSeconds = 0;
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //   })
    // })
    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    return res.status(200).json({
      message: "corse detail fetched sucessfully",
      data: {
        courseDetails,
      },
      success: true
    })
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "getting error in fetching the course Detail",
      success: false
    })
  }
}

// get full course details controllers

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.Id;
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        }
      })
      .populate("category")
      // .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection"
        }
      }).exec();

    // find the course progress count 
    let courseProgressCount = await Courseprogress.findOne({
      CourseID: courseId,
      userId: userId
    })

    // validation 
    if (!courseDetails) {
      return res.status(401).json({
        message: "cannot find the course details",
        success: false
      })
    }

    // const totalDurationInSeconds = 0;
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //   })
    // })
    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        // totalDuration,
        completedVideos: courseProgressCount?.completedVideos
        ? courseProgressCount?.completedVideos
        : [],
      }
    })
  } catch (error) {
    console.log(error);
    return res.json({
      message: "getting error in fetching the fulldetails of course",
      success: false,
    })
  }
}
// getInstructor Courses 

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.Id
    // find all courses belong to instructor 
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({createdAt: -1})

    return res.status(200).json({
      success: true,
      data: instructorCourses
    })
  } catch (error) {
    return res.status(401).json({
      message: "cannot get the instructor courses",
      success: false,
    })
  }
}

// delete the course 

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const Course = await Course.findById(courseId);

    // validate 

    if (!Course) {
      return res.status(401).json({
        message: "Course is empty",
        success: false
      })
      // unenroll the students from course 

      const studentsEnrolled = course.studentsEnroled
      for (const studentId of studentsEnrolled) {
        await User.findbyIdAndUpdate(studentId, {
          $pull: { courses: courseId },
        })
      }
    }

    // delete sections and subSections

    const courseSections = Course.courseContent
    for (const sectionId of courseSections) {
      // deleting sub-sections of the section 
      const Section = await Section.findById(sectionId);
      if (!Section) {
        const subSection = Section.subSection
        for (const subSectionId of subSection) {
          await SubSection.findByIdAndDelete(subSectionId)

        }
      }
      // delete teh section 
      await Section.findByIdAndDelete(sectionId);
    }

    // delete the course 
    await Course.findByIdAndDelete(courseId);
    return res.status(200).json({
      message: "Course deleted sucessfully",
      success: true
    })
  } catch (error) {
    return res.status(401).json({
      message: "Cannot delete the course",
    success: false
    })
  }
}
