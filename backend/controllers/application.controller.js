import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({ message: "Job ID is required", success: false });
        }
        //check if user has already applied for the job
        const existingApplication = await Application.findOne({ applicant: userId, job: jobId });

        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this job", success: false });
        }

        //check if job exists

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: "Job not found", success: false });
        }

        //create application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.application.push(newApplication._id);
        await job.save();
        return res.status(201).json({ message: "Application submitted successfully", application: newApplication, success: true });

    } catch (error) {
        console.error("Error applying for job:", error);
        res.status(500).json({ message: "Internal server error" });

    }

}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const application = await Application.find({ applicant: userId }).populate({
            path: "job",
            populate: {
                path: "company",
            }
        }).sort({ createdAt: -1 });

        if (!application.length) {
            return res.status(404).json({ message: "No applications found", success: false });
        };
        console.log(application);
        

        return res.status(200).json({ message: "Applications fetched successfully", application, success: true });
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

//admin gets all applications
export const getAllApplicats = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "application",
            populate:{
                path:"applicant"
            }

        }).sort({ createdAt: -1 });

        if (!job) {
            return res.status(404).json({ message: "No applications found", success: false });
        };
        return res.status(200).json({ message: "Applications fetched successfully", application: job.application, success: true });

    } catch (error) {
        console.error("Error fetching all applications:", error);
        res.status(500).json({ message: "Internal server error" });

    }
}

export const updateApplicationStatus = async (req, res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!applicationId) {
            return res.status(400).json({ message: "Application ID is required", success: false });
        }
        if(!status) {
            return res.status(400).json({ message: "Status is required", success: false });
        }

        //check application exists

        const application = await Application.findById(applicationId);
        if(!application) {
            return res.status(404).json({ message: "Application not found", success: false });
        }
        //update status
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({ message: "Application status updated successfully", application, success: true });

    } catch (error) {
        console.error("Error updating application status:", error);
        res.status(500).json({ message: "Internal server error" });
        
    }
}