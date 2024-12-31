 import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
 import { assets} from '../assets/assets'
import { AppContext } from '../context/AppContext';
 const Navbar = () => {
    const navigate=useNavigate();


    const [showmenu,setShowmenu]=useState(false)
    const {token,setToken,userData}=useContext(AppContext)
    const logout=()=>{
        setToken(false)
        localStorage.removeItem('token')
    }

   return (
     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
       <span onClick={()=>navigate('/')} className=' text-lg text-sky-800 font-semibold'>Doctorto</span>
       <ul className='hidden md:flex items-center gap-5 font-medium'>
        <NavLink to='/' >
            <li className='py-1'>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto  hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
            <li  className='py-1'>ALL DOCTORS</li>
            <hr  className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li  className='py-1'>ABOUT</li>
            <hr  className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
            <li  className='py-1'>CONTACT</li>
            <hr  className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
        </NavLink>
       </ul>
       <div className='flex items-center gap-4'>
        {
            token && userData
             ? 
            <div className='flex items-center gap-2 cursor-pointer group relative'>
                <img  className="w-8 rounded-full" src={userData.image} alt="" />
                <img className='w-2.5' src={assets.dropdown_icon} alt="" />
                <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block'>
                    <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={()=>navigate('/Profile')}className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={()=>navigate('/my-appointment')}className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                    </div>
                </div>
            </div>
            :   <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light  md:block'>Create Account</button>

        }
        <img onClick={()=>setShowmenu(true)} className='w-6 md:hiiden' src={assets.menu_icon} alt=""></img>
        <div className={`${showmenu ? 'fixed w-full ' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 overflow-hidden x-20 bg-white transition-all`}>
            <div className='flex items-center justify-between px-5 py-6' >
                <img className='w-36' src={assets.logo} at=""/>
                <img className='w-7' onClick={()=>setShowmenu(false)} src={assets.cross_icon} alt=""/>
            </div>
            <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg  font-medium' >
                <NavLink  onClick={()=>setShowmenu(false)} to='/'><p className='px-4 py-2 rounde inline-block'>HOME</p></NavLink>
                <NavLink onClick={()=>setShowmenu(false)} to='/doctors'><p className='px-4 py-2 rounde inline-block' >ALL DOCTORS</p></NavLink>
                <NavLink  onClick={()=>setShowmenu(false)} to='about'><p className='px-4 py-2 rounde inline-block' >ABOUT</p></NavLink>
                <NavLink  onClick={()=>setShowmenu(false)} to='contact'><p className='px-4 py-2 rounde inline-block' >CONTACT</p></NavLink>
            </ul>
        </div>
       </div>
     </div>
   )
 }
 
 export default Navbar
 