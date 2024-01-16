const express = require("express")
const router = express.Router()
const { auth, isInstructor } = require("../middlewares/auth")
const {
  deleteProfile,
  updateProfile,
  getAllUsers,
  updateDisplayPicture,
  getEnrolledCourses,
  getUserDetails,
  instructorDashboard,
} = require("../controllers/Profile")

// Delete User Account
router.delete("/deleteProfile", auth, deleteProfile)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getUserDetails)

// Get Enrolled Courses
// router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router