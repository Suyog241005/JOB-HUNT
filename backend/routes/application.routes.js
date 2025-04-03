import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { applyJob, getAllApplicats, getAppliedJobs, updateApplicationStatus } from '../controllers/application.controller.js';

const router = express.Router();

router.use(isAuthenticated); // Apply authentication middleware to all routes

router.route('/apply/:id').post(applyJob);
router.route('/get').get(getAppliedJobs);
router.route('/:id/applicants').get(getAllApplicats);
router.route('/update/:id').put(updateApplicationStatus);

export default router;