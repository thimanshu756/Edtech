const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
 courseName:{
    type:String,
    trim:true,
 },
 courseDescription:{
    type:String,
    trim:true,
 },
 intructor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
 },
 whatYouWillLearn:{
    type:String,
    trim:true,
 },
 courseContent:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Section",
    required:true,
 }],
 ratingAndReview:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"RatingAndReview",
 }],
 price:{
    type:Number,
 },
 thumbnail:{
    type:String,
 },
 tag:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Tag",
 },
 studentsEnrolled:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
 }]
});

module.exports = mongoose.model("Course",courseSchema);