import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const {doctors,atoken,getAllDoctors,changeAvailabilty} =useContext(AdminContext)
  useEffect(()=>{
    if(atoken){
      getAllDoctors()
    }

  },[atoken])
  return (
    <div className='max-h-[90vh] m-5  overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item,index)=>(
            <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
              <img className='bg-indigo-50 group-hover:bg-[#5F6FFF] transition-all duration-300' src={item.image} alt=""/>
              <div className='p-4'>
                <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
                <p className='text-zinc-600 text-sm'>{item.speciality}</p>
                </div>
                <div className='m-2 flex items-center gap-1 text-sm'>
                  <input onChange={()=>changeAvailabilty(item._id)} type='checkbox' checked={item.available} />
                  <p> Available</p>
                  </div>
              </div>

          ))
        }
      </div>
      
    </div>
  )
}

export default DoctorsList