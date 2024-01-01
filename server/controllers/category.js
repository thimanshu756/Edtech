
const Category = require("../models/Category")

// tag handler
exports.createCategory=async(req,res)=>{

    try {
        // fetch data from req.body
        const {name, description}=req.body;
        //validation
        if (!name || !description) {
            return res.status(401).json({
                success:false,
                message:"Please enter all the fields properly and try again"
            })
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
        }
    } catch (error) {
        return res.status(500).json({
            message:"got an error in creating a Category",
            success:false,
        categoryData
        })
    }
}

// get all the tags
exports.showallCategory=async(req,res)=>{
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