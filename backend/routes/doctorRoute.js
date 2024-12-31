import express from 'express'
import {doctorLists} from '../controllers/DoctorController.js'
const doctorRouter =express.Router()

doctorRouter.get('/list',doctorLists)
export default doctorRouter