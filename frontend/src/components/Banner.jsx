import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate=useNavigate();
  return (
    <div className='flex rounded-lg items-center bg-primary px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-12'>
      <div className='flex flex-col py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white'>
        <p >Book Appointment</p>
        <p className='mt-4'>With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>navigate('/login')} className='bg-white rounded-full w-36 p-3 mt-6 font-semibold hover:scale-105 transition-all duration-500'>Create account</button>
      </div> 
      <div className='hidden md:block md:ml-8 md:w-1/2 lg:w-[370px] lg:h-[300px] relative'>
        <img className="w-full absolute bottom-0 max-w-md" src={assets.appointment_img} alt=""/>
      </div>
    </div>
  )
}

export default Banner
