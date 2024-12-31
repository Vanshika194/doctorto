import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { use } from 'react';
import { AdminContext } from '../../context/AdminContext';
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {

  const [docImg,setDocImg]=useState(false);
  const  [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('')
  const [experience,setExperience]=useState('1 Year')
  const [fees,setFees]=useState('')
  const [about,setAbout]=useState('')
  const [speciality,setSpeciality]=useState('General Physician')
  const [degree,setDegree]=useState('')
  const [address1,setAddress1]=useState('')
  const [address2,setAdress2]=useState('')

  const {backendurl,atoken}=useContext(AdminContext)

  const onSubmitHandler =async (event)=>{
    event.preventDefault()

    try {
      if(!docImg){
        return toast.error('Image Not selected')
      }
      const formData= new FormData()
      formData.append('image',docImg)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('speciality',speciality)
      formData.append('degree',degree)
      formData.append('experience',experience)
      formData.append('about',about)
      formData.append('fees',Number(fees))
      formData.append('address',JSON.stringify({line1:address1,line2:address2}))
     
     
   
      const {data}=await axios.post(backendurl+'/api/admin/add-doctor',formData,{headers:{atoken}})
      console.log(data)
      if(data.success){
        toast.success(data.message)
        setDocImg(false)
        setName('')
        setPassword('')
        setEmail('')
        setAddress1('')
        setAdress2('')
        setDegree('')
        setAbout('')
        setFees('')
      }
      else{
        console.log(data.message)
        console.log('vanshia')
        toast.error(data.message)
      }
      
    } catch (error) {
      console.log(error.message)
      toast.error(error)
      
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>

      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        {/* Doctor Image Upload */}
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label  htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ?URL.createObjectURL(docImg): assets.upload_area}
              alt="Upload"
            />
          </label>
          <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br />
            <span className="text-sm text-gray-400">(Click image to upload)</span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          {/* Left Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            

            <div className="flex flex-col gap-1">
              <label htmlFor="doc-name">Doctor Name</label>
              <input
                onChange={(e)=>setName(e.target.value)}
                value={name}
                id="doc-name"
                type="text"
                name="doctorName"
                placeholder="Enter doctor's name"
                required
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="doc-email">Doctor Email</label>
              <input
               onChange={(e)=>setEmail(e.target.value)}
               value={email}
                id="doc-email"
                type="email"
                name="doctorEmail"
                placeholder="Enter doctor's email"
                required
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="doc-password">Doctor Password</label>
              <input
               onChange={(e)=>setPassword(e.target.value)}
               value={password}
                id="doc-password"
                type="password"
                name="doctorPassword"
                placeholder="Enter password"
                required
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="experience">Experience</label>
              <select
               onChange={(e)=>setExperience(e.target.value)}
               value={experience}
                id="experience"
                name="experience"
                className="border rounded px-3 py-2"
              >
                {[...Array(10).keys()].map((year) => (
                  <option key={year} value={`${year + 1} Year`}>
                    {`${year + 1} Year`}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="fees">Fees</label>
              <input
               onChange={(e)=>setFees(e.target.value)}
               value={fees}
                id="fees"
                type="number"
                name="fees"
                placeholder="Enter consultation fees"
                required
                className="border rounded px-3 py-2"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="speciality">Speciality</label>
              <select
               onChange={(e)=>setSpeciality(e.target.value)}
               value={speciality}
                id="speciality"
                name="speciality"
                className="border rounded px-3 py-2"
              >
                {[
                  'General physician',
                  'Gynecologist',
                  'Dermatologist',
                  'Pediatricians',
                  'Neurologist',
                  'Gastroenterologist',
                ].map((speciality) => (
                  <option key={speciality} value={speciality}>
                    {speciality}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="education">Education</label>
              <input
               onChange={(e)=>setDegree(e.target.value)}
               value={degree}
                id="education"
                type="text"
                name="education"
                placeholder="Enter doctor's education"
                required
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="address1">Address</label>
              <input
               onChange={(e)=>setAddress1(e.target.value)}
               value={address1}
                id="address1"
                type="text"
                name="address1"
                placeholder="Address line 1"
                required
                className="border rounded px-3 py-2"
              />
              <input
               onChange={(e)=>setAdress2(e.target.value)}
               value={address2}
                id="address2"
                type="text"
                name="address2"
                placeholder="Address line 2"
                required
                className="border rounded px-3 py-2 mt-2"
              />
            </div>
          </div>
        </div>

        {/* About Doctor */}
        <div className="flex flex-col gap-1 mt-4">
          <label htmlFor="about-doctor">About Doctor</label>
          <textarea
             onChange={(e)=>setAbout(e.target.value)}
             value={about}
            id="about-doctor"
            name="aboutDoctor"
            placeholder="Write about the doctor"
            rows={5}
            required
            className="border rounded px-3 py-2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
