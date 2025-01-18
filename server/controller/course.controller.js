import { Course } from "../models/course.model.js";

export const createCourse = async (req,res) => {
    try {
        const {courseTitle,category} = req.body;
        if(!courseTitle || !category) {
            return res.status(400).json({
                message:"Course Title and category is required"
            })
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator:req.id
        })
       
        return res.status(201).json({
            course,
            message:"Course created."
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const getCreatorCourses = async (req,res) => {
    try {
        const userId = req.id;
        const courses = await Course.find({creator:userId});
        if(!courses){
            return res.status(404).json({
                success:false,
                message:"Course not found"
            })
        }
        return res.status(200).json({
            courses,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to get admin Course"
        })
    }
}