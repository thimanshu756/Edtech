const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
   courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course",
   },
   userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
   completedVideos:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"subSection",
   }]
});

module.exports = mongoose.model("courseProgress",courseProgress);