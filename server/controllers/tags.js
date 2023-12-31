
const Tag = require("../models/Tags")

// tag handler
exports.createTAg=async(req,res)=>{

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
            const tagData= await Tag.create({
                name:name,
                description:description
            });
            console.log(tagData);
            return res.status(200).json({
                mesage:"tag created successfully",
                success:true
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"got an error in creating tag",
            success:false
        })
    }
}

// get all the tags
exports.showallTags=async(req,res)=>{
    try {
        const allTags= await Tag.find({},{name:true,description:true});
        return res.status(200).json({
            message:"Successfully fetched all tags",
            success:true,
            allTags
        })
    } catch (error) {
        return res.status(500).json({
            message:"Getting error in fetching the tags",
            success:false
        })
    }
}