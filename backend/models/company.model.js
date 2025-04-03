import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    logo: {
        type: String, //url of the logo
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    applications: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application", 
    }],
},{timestamps: true});

export const Company = mongoose.model("Company", companySchema);
