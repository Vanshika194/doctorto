import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const {atoken,Setatoken} =useContext(AdminContext)
    const navigate =useNavigate()
    
    const logout=()=>{
        navigate('/')
        atoken && Setatoken ('')
        atoken && localStorage.removeItem('atoken')


    }
  return (
    <div className='flex justify-between px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
      <p>DASHBOARD</p>
      <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>{atoken ? 'Admin ' :"Doctor"}</p>
    </div>
    <button onClick={logout} className='bg-[#5F56FF] text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar
