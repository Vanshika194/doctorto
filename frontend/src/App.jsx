import React from 'react'
import {Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import DoctorsP from './pages/DoctorsP'
import Login from './pages/Login'
import Apoint from './pages/Apoint'
import About from './pages/About'
import Profile from './pages/Profile'
import Contact from './pages/Contact'
import DoctorApp from './pages/doctorApp'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer/>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/doctors' element={<DoctorsP/>}/>
        <Route path='/doctors/:speciality' element={<DoctorsP/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/Profile' element={<Profile />}/>
        <Route path='/my-appointment' element={<Apoint/>}/>
        <Route path='/appointment/:docId' element={<DoctorApp />}/>
      </Routes>
      <Footer></Footer>
      
    </div>
  )
}

export default App
