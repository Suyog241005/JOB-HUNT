import { Job } from "../models/job.model.js";


export const postJob = async (req, res) => {
    try {
        const { title, description, location, companyId, salary, requirements, jobType, position, experience } = req.body;
        const userId = req.id;
        console.log(title, description, location, companyId, salary, requirements, jobType, position, experience);
        
        if (!title || !description || !location || !companyId || !salary || !requirements || !jobType || !position || !experience) {
            // Check if all fields are filled
            return res.status(400).json({ message: "Please fill all fields", success: false });
        }

        const job = await Job.create({
            title,
            description,
            location,
            company: companyId,
            salary,
            requirements: requirements.split(","),
            jobType,
            position,
            experienceLevel: experience,
            createdBy: userId
        });

        return res.status(201).json({ message: "Job posted successfully", job, success: true });

    } catch (error) {
        console.error("Error posting job:", error);
        res.status(500).json({ message: "Internal server error" });

    }

}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query={
            $or:[
                {title: {$regex: keyword, $options: "i"}},
                {description: {$regex: keyword, $options: "i"}},
            ]
        };
        const jobs = await Job.find(query).populate("company").populate("createdBy").sort({ createdAt: -1 });
        if(!jobs){
            return res.status(404).json({ message: "No jobs found", success: false });
        };

        return res.status(200).json({ message: "Jobs fetched successfully", jobs, success: true });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId= req.params.id;;
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(404).json({ message: "Job not found", success: false });
        }
        return res.status(200).json({ message: "Job fetched successfully", job, success: true });
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
} 

export const getAdminJobs = async (req, res) => {
    try {
        const adminId= req.id;
        const jobs= await Job.find({createdBy: adminId});

        if(!jobs){
            return res.status(404).json({ message: "No jobs found", success: false });
        }
        return res.status(200).json({ message: "Jobs fetched successfully", jobs, success: true });

    } catch (error) {
        console.error("Error fetching posted jobs:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}