const Course = require("../models/Course");
const Tag = require("../models/Category");
const User = require("../models/Users");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { populate } = require("../models/Course");
const Courseprogress = require("../models/CourseProgress")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const Category= require("../models/Category")
const { convertSecondsToDuration } = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");

exports.createCourse = async (req, res) => {

  try {
    // fetch data
    const { courseName, courseDescription, whatYouWillLearn, price, tag ,category} = req.body;

    // get thumbnail
    const thumbnail = req.files.thumbnailImage;
    // validation
    if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !category) {
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
        message: "Category details not found",
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
      category:CategoryDetails._id,
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
    const categoryDetails2 = await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    )
    console.log("HEREEEEEEEE", categoryDetails2)
    console.log("new course is -->",newCourse);
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

// exports.getFullCourseDetails = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     console.log("course Id -->",courseId);
//     const userId = req.user.Id;
//     const courseDetails = await Course.findOne({
//       _id: courseId,
//     })
//       .populate({
//         path: "instructor",
//         populate: {
//           path: "additionalDetails",
//         }
//       })
//       .populate("category")
//       .populate("ratingAndReview")
//       .populate({
//         path: "courseContent",
//         populate: {
//           path: "subSection"
//         }
//       }).exec();

//     // find the course progress count 
//     let courseProgressCount = await Courseprogress.findOne({
//       CourseID: courseId,
//       userId: userId
//     })

//     // validation 
//     if (!courseDetails) {
//       return res.status(401).json({
//         message: "cannot find the course details",
//         success: false
//       })
//     }

//     const totalDurationInSeconds = 0;
//     courseDetails.courseContent.forEach((content) => {
//       content.subSection.forEach((subSection) => {
//         const totalDurationInSeconds = parseInt(subSection.timeDuration)
//       })
//     })
//     const totalDuration = convertSecondsToDuration(totalDurationInSeconds);
//     return res.status(200).json({
//       success: true,
//       data: {
//         courseDetails,
//         // totalDuration,
//         completedVideos: courseProgressCount?.completedVideos
//         ? courseProgressCount?.completedVideos
//         : [],
//       }
//     })
//   } catch (error) {
//     console.log(error);
//     return res.json({
//       message: "getting error in fetching the fulldetails of course",
//       success: false,
//     })
//   }
// }
exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
// getInstructor Courses 

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id
    console.log("req.user is -->",req.user);
    console.log("instructor Id -->",instructorId);
    // find all courses belong to instructor 
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({createdAt: -1})

    console.log("Instructor courses -->",instructorCourses);
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

// exports.deleteCourse = async (req, res) => {
//   try {
//     const { courseId } = req.body;
//     const Course = await Course.findById(courseId);

//     // validate 

//     if (!Course) {
//       return res.status(401).json({
//         message: "Course is empty",
//         success: false
//       })
//       // unenroll the students from course 

//       const studentsEnrolled = course.studentsEnrolled
//       for (const studentId of studentsEnrolled) {
//         await User.findbyIdAndUpdate(studentId, {
//           $pull: { courses: courseId },
//         })
//       }
//     }

//     // delete sections and subSections

//     const courseSections = Course.courseContent
//     for (const sectionId of courseSections) {
//       // deleting sub-sections of the section 
//       const Section = await Section.findById(sectionId);
//       if (!Section) {
//         const subSection = Section.subSection
//         for (const subSectionId of subSection) {
//           await SubSection.findByIdAndDelete(subSectionId)

//         }
//       }
//       // delete teh section 
//       await Section.findByIdAndDelete(sectionId);
//     }

//     // delete the course 
//     await Course.findByIdAndDelete(courseId);
//     return res.status(200).json({
//       message: "Course deleted sucessfully",
//       success: true
//     })
//   } catch (error) {
//     return res.status(401).json({
//       message: "Cannot delete the course",
//     success: false
//     })
//   }
// }
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}