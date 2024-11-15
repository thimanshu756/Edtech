 const Course = require("../models/Course");
 const User = require("../models/Users")
const RatingAndReview = require("../models/RatingAndReview");
const { default: mongoose } = require("mongoose");


//  exports.createRating=async(req,res)=>{
//     try {
//         // get userId
//         const userId = req.user.id;

//         // get all oteher details from req body
//         const {rating,review,courseId}=req.body;
//         // check if user is already enrolled or not
//         const courseDetails= await Course.findOne({
//             _id:courseId,
//             // here elem
//             studentsEnrolled:{$elemMatch:{$eq:userId}}
//         })        
//         // validate 
//         if(!courseDetails) {
//             return res.status(401).json({
//                 message:"Course Details not found",
//                 error:error.message      
//         })
//          try {
//              // check if user already reviewed the course
//              const alreadyReview= await RatingAndReview.findOne({
//                 user:userId,
//                 course:courseId
//             })
//             if (alreadyReview) {
//                 return res.status(401).json({
//                     message:"You had already reviwed the course",
//                 })
//             }
//         } catch (error) {
//             console.log(error);
//         return res.status(401).json({
//                 message:"Getting error in fetching user is already reviewed or not"
//             })
//         }

//         // create RAting
//         const ratingReview = await RatingAndReview.create({
//             rating,
//             review,
//             course:courseId,
//             user:userId
//         })

//         // update the course
//         const courseUpdated= await Course.findByIdAndUpdate({_id:courseId},
//             {$push:{
//                 ratingAndReview:ratingReview._id
//             }},{new:true})

//             return res.status(200).json({
//                 success:true,
//                 message:"Rating and Review created",
//                 ratingReview
//             })
//      }

//     } catch (error) {
//         console.log(error);
//      return res.status(401).json({
//         message:"Getting error in ratingAndReviewHandler"
//      })
//     }
//  }

 // get avg rating
 exports.createRating = async (req, res) => {
    try{

        //get user id
        const userId = req.user.id;
        //fetchdata from req body
        const {rating, review, courseId} = req.body;
        //check if user is enrolled or not
        const courseDetails = await Course.findOne(
                                    {_id:courseId,
                                    studentsEnrolled: {$elemMatch: {$eq: userId} },
                                });

        if(!courseDetails) {
            return res.status(404).json({
                success:false,
                message:'Student is not enrolled in the course',
            });
        }
        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                              user:userId,
                                                course:courseId,
                                            });
        if(alreadyReviewed) {
                    return res.status(403).json({
                        success:false,
                        message:'Course is already reviewed by the user',
                    });
                }
        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                        rating, review, 
                                        course:courseId,
                                        user:userId,
                                    });
       
        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                    {
                                        $push: {
                                            ratingAndReviews: ratingReview._id,
                                        }
                                    },
                                    {new: true});
        console.log(updatedCourseDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:"Rating and Review created Successfully",
            ratingReview,
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

 exports.getAverageRating=async(req,res)=>{

    try {
        // get courseId

        const courseId= req.body.courseId;
        //calculate the avg rating
        const result = await RatingAndReview.aggregate[{
            $match:{
                course:new mongoose.Types.ObjectId(courseId)
            },
            $group:{
                id:null,
                averageRating:{
                    $avg:"$rating"
                }
            }
        }];
        if (result.length>0) {
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }else{
            return res.status(200).json({
                success:true,
                averageRating:0,
                message:"Average rating is 0 , no rating given till now"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Getting error in calculating the average"
        })
    }
 }

 // get all the rating

 exports.getAllRating=async(req,res)=>{
    try {
        const allReviews = await RatingAndReview.find({}).sort({rating:"desc"})
        .populate({
            path:"user",
            select:"firstName lastName email image",
        })
        .populate({
            path:"course",
            select:"courseName"
        }).exec();
        return res.status(200).json({
            success:true,
            message:"sucessfully fetched all Reviews",
            data:allReviews 
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error in getting all the reviews"
        })
    }
 }