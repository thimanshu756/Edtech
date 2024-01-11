const express = require("express")
const router = express.Router();

// importing the controllers


// course controllers import 

const { createCourse, getAllCourses, getCourseDetails, getFullCourseDetails, editCourse, getInstructorCourses, deleteCourse } = require("../controllers/course");

// categies Controllers import 

const { showAllCategories, createCategory, categoryPAgeDetails } = require("../controllers/category");

// section controllers import;

const { createSection, updateSection, deleteSection } = require("../controllers/Section");

// subSection 

const { createSubSection, updateSubsection, deleteSubSection } = require("../controllers/subSection");

// rating controllers import 

const { createRating, getAllReviews, averageRating } = require("../controllers/ratingandreview");
const { updateCourseProgress } = require("../controllers/courseProgress")

// import middlewares

const { Auth, isAdmin, isStudents, isInstructor, } = require("../middlewares/auth")

// courses which can only be created by instructor 

router.post("/createCourse", auth, isInstructor, createCourse);

// Add a Section to a course
router.post("/addSection", auth, isInstructor, createSection);

// update a section 

router.post("/updateSection", auth, isInstructor, updateSection);

// delete a section 

router.post("/deleteSection", auth, isInstructor, deleteSection);

// edit Sub Section 

router.post("/updateSubsection", auth, isInstructor, updateSubsection);

