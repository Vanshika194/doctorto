import express from 'express';
import { addDoctor,allDoctors,loginAdmin } from '../controllers/AdminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import {changeAvailabity} from '../controllers/DoctorController.js';

const adminRouter = express.Router();

adminRouter.post('/add-doctor',authAdmin, upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin );
adminRouter.post('/all-doctors',authAdmin,allDoctors)
adminRouter.post('/change-availabilty',authAdmin,changeAvailabity)
export default adminRouter;