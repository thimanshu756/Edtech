
const Category = require("../models/Category")

function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }
// tag handler
exports.createCategory=async(req,res)=>{

    try {
        // fetch data from req.body
        console.log("inside create category");
        const {name, description}=req.body;
        //validation
        console.log("name-->",name,"description-->",description);
        if (!name || !description) {
            return res.status(401).json({
                success:false,
                message:"Please enter all the fields properly and try again"
            })
        }
            // create entry in db
           
            const categoryData= await Category.create({
                name:name,
                description:description
            })
            console.log(categoryData);
            return res.status(200).json({
                mesage:"Category created successfully",
                success:true
            })
       
    } catch (error) {
        return res.status(500).json({
            message:"got an error in creating a Category",
            success:false,
            categoryData
        })
    }
}

// get all the tags
exports.showAllCategories=async(req,res)=>{
    try {
        const allCategories= await Category.find({},{name:true,description:true});

        return res.status(200).json({
            message:"Successfully fetched all categories",
            success:true,
            allCategories
        })
    } catch (error) {
        return res.status(500).json({
            message:"Getting error in fetching the categories",
            success:false
        })
    }
}

// category page details

// exports.categoryPageDetails= async(req,res)=>{

//     // 
//     try {
//         // Get category Id
//         const {categoryId}= req.body;
//         // get courses for specified Id
//         const selectedCategory = await Category.findById(categoryId).populate("courses").exec();
//         // validate
//         if (!selectedCategory) {
//             return res.status(401).json({
//                 success:false,
//                 message:"Canot find the category"
//             })
//         }
//         // get courses for different categories

//         const differentCategories = await Category.find({
//             _id:{$ne:categoryId}
//         }).populate("courses").exec();

//         //validate
//         if (!differentCategories) {
//             return res.status(401).json({
//                 success:false,
//                 message:"Canot find the Different categories"
//             })
//         }
//         // get top selling course : --> next tym

//         return res.status(200).json({
//             success:true,
//             message:"Fetched the courses successfully",
//             data:{
//                 selectedCategory,
//                 differentCategories
//             }
//         })
//     } catch (error) {
        
//     }
// }
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
        //   populate: "ratingAndReview",
        })
        .exec()
  
      console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      console.log("selectedCategory.courses.length -->",selectedCategory);
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      console.log("categoriesExceptSelected -->",categoriesExceptSelected);
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[ getRandomInt(categoriesExceptSelected.length) ]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
        console.log("error -->",error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }