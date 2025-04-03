import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
        },
        role: {
            type: String,
            enum: ["recruiter", "student"],
            required: true,
        },
        profile: {
            bio: {
                type: String,
            },
            skills: {
                type: [String],
            },
            resume: {
                type: String,
            }, //url of the resume
            resumeOriginalName: {
                type: String,
            }, //original name of the resume
            companyName: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Company",
            },
            profilePicture: {
                type: String,
            }, //url of the profile picture
        },
    },
    { timestamps: true }
);
export const User = mongoose.model("User", userSchema);