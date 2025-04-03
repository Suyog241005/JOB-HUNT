import bcrypt from "bcryptjs";
import {User} from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, role } = req.body;
        if (!fullName || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        };

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ message: "User already exists", success: false });
        };

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
        });
        res.status(201).json({ message: "User registered successfully", success: true });

    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const login = async (req,res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required", success: false });
        };

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        };

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }
        //check role 

        if (role != user.role) {
            return res.status(400).json({ message: "Account doesn't exist with current role", success: false });
        };

        const tokenData = {
            userId: user._id,

        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profiile: user.profiile,
        }

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            message: `Welcome back ${user.fullName}`,
            user,
            success: true,
        })



    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const logout = async (req, res) => {
    try {
            return res.status(200).cookie("token","",{maxAge:0}).json({ message: "Logged out successfully", success: true });
    } catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const {fullName, email , phoneNumber, bio, skills} = req.body;
        const file = req.file;
        

        //claudinary upload
        let skillsArray =[];
        if (skills) {
            skillsArray=skills.split(",");
        }
        
        const userId = req.id;
        let user = await User.findById(userId);

        if(!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        //updating data
        if (fullName) user.fullName = fullName;
        if (email) user.email = email;
        if (phoneNumber)   user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills)user.profile.skills = skillsArray;


        
      
        
        

        await user.save();

        user = {
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profiile: user.profiile,
        }

        return res.status(200).json({ message: "Profile updated successfully", user, success: true });

    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}