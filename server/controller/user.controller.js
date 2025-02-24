import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

export const register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password ){
            res.status(400).json({
                success:false,
                message:"All field's are required "
            })
        }
        const existinguser = await User.findOne({email}) ;
        if(existinguser) {
            return  res.status(200).json({
                success:false,
                message:"Email already registered"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            name,
            email,
            password:hashPassword
        })
        return res.status(201).json({
            success:true,
            message:"Account created Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to signup"
        })
    }
}

export const login  = async(req,res) =>{
    try {
        const {email, password} = req.body;
        if(!email || !password ){
            res.status(400).json({
                success:false,
                message:"All field's are required "
            })
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found"
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            return res.status(400).json({
                success:false,
                message:"Invalid email or password"
            })
        }
        generateToken(res, user , `Welcome back ${user.name}`);
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to login"
        })
    }
}

export const logout = async(req,res) => {
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            success:true,
            message:"Logout Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to Logout"
        })
    }
}

export const getUserProfile = async(req,res)=>{
    try {
        const userId = req.id;
        const user = await User.findById(userId).select("-password").populate("enrolledCourses");
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Profile not found"
            })
        }
        return res.status(200).json({
            success:true,
            user
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to getUserProfile"
        })
        
    }
}

export const updateUserProfile = async (req,res) => {
    try {
        const userId = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;
        
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        // extract public id of the old image 
        if(user.photoUrl){
            const publicId = user.photoUrl.split("/").pop().split(".")[0];
            deleteMediaFromCloudinary(publicId)
        }

        // upload new photo
        const cloudResponse = await uploadMedia(profilePhoto.path);
        
        const photoUrl = cloudResponse.secure_url;
        const updatedData = {name, photoUrl};

        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile Updated Successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Failed to Update Profile"
        })
    }
}