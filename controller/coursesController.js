import Course from "../models/courseModel.js"
import uploadOnCloudinary from "../config/cloudnariy.js";



export const createCourse = async (req,res) => {
    try {
        const {title,category} = req.body
        if(!title||!category){
            return res.status(400).json({message:"title or category is required"})

        }
        const course = await Course.create({
            title,
            category,
            creator:req.userId
        })
        return res.status(201).json(course)
    } catch (error) {
        return res.status(500).json({message:`createCourses error ${error}`})
        
    }
}

export const getPublishedCourses = async (req,res) => {
    try {
        const courses = await Course.find({isPublished:true})
        if(!courses){
            return res.status(400).json({message:"Courses is not found "})
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({message:`falid to find isPublished Courses ${error}`})
        
    }
}

export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.userId
        const courses = await Course.find({creator:userId})
        if(!courses){
            return res.status(400).json({message:"Courses is not found"}) 
        }
        return res.status(200).json(courses)
    } catch (error) {
        return res.status(500).json({message:`faild to get Create Courses ${error}`})
        
    }
}

export const editCourses = async (req,res) => {
     try {
        const {courseId} = req.params
        const {title,subTitle,description,category,lavel,isPublished,price} = req.body
        let thumbnail
        if(req.file){
            thumbnail = await uploadOnCloudinary(req.file.path)

        }
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Courses is not found"})
        }
        const updateData = {title,subTitle,description,category,lavel,isPublished,price,thumbnail}
        course = await Course.findByIdAndUpdate(courseId,updateData,{new:true})
        return res.status(200).json(course)
     } catch (error) {
        return res.status(500).json({message:`faild to edit Courses ${error}`})
        
     }
}

export const getCoursesById = async (req,res) => {
    try {
        const {courseId} = req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json({message:"Courses is not founded"})
        }
        return res.status(200).json(course)
    } catch (error) {
        return res.status(500).json({message:`faild to get courses by id ${error}`})
        
    }
}

export const removeCourse = async (req,res) =>{
    try {
        const {courseId} =req.params
        let course = await Course.findById(courseId)
        if(!course){
            return res.status(400).json("Courses is not found ")

        }
        course = await Course.findByIdAndDelete(courseId,{new:true})
        return res.status(200).json({message:"Courses removed"})
    } catch (error) {
        return res.status(500).json({message:`faild to delete courses ${error}`})
        
    }
}