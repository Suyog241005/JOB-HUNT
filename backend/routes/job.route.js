import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getJobById, getAllJobs, postJob, getAdminJobs } from '../controllers/job.controller.js';

const router = express.Router();

router.use(isAuthenticated);

router.route('/post').post( postJob );
router.route('/get').get( getAllJobs );
router.route('/getadminjobs').get( getAdminJobs );
router.route('/get/:id').get( getJobById );

export default router;