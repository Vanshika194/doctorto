import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../modles/doctorModel.js";
import jwt from 'jsonwebtoken'
//API for adding doctor

const addDoctor = async (req,res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
    
      return res.json({ success: false, message: "Missing Details" });
    }
    //validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter strong password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hasedPassword = await bcrypt.hash(password, salt);

    // uplaod image to cloudinary
    const imageUpload=await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
    const imageUrl=imageUpload.secure_url

    const doctorData={
        name,
        email,
        image:imageUrl,
        password:hasedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()
    }
    const newDoctor =new doctorModel(doctorData)
    await newDoctor.save()

    res.json({success:true,message:"doctor added"})


  } catch (error) {

    console.log('123')
    res.json({success:false,message:error.message})
  }

};

//api for admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the credentials match
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // Generate the token with email and role only (no password)
      const token = jwt.sign(
        { email, role: 'admin' },  // Only include email and role
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({ success: true, token });
    } else {
      return res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

// API to   get all doctors list

const allDoctors =async (req,res)=>{

  try {
    const doctors= await doctorModel.find({}).select('-password')
    res.json({success:true,doctors})
    
  } catch (error) {
    console.log('222')
    console.log(error);
    return res.json({ success: false, message: error.message });
    
  }
}
export { addDoctor ,loginAdmin,allDoctors};
