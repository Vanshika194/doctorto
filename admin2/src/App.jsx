import React, { useContext } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import { AdminContext } from './context/AdminContext';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AllApointments from './pages/Admin/AllApointments';
import DashBoard from './pages/Admin/DashBoard';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';

const App = () => {
  const { atoken } = useContext(AdminContext);

  console.log('Token:', atoken);

  return (
    <>
      {atoken ? (
        // Render Navbar and the main content when atoken exists
        <div className="bg-[#F8F9FD]">
          <ToastContainer />
          <Navbar />
          <div className='flex items-start'>
            <Sidebar/>
            <Routes>
              <Route path='/' element={<></>}/>
              <Route path='/admin-dashboard' element={<DashBoard/>}/>
              <Route path='/all-appointmnets' element={<AllApointments/> }/>
              <Route path='/add-doctor' element={<AddDoctor/>}/>
                <Route path='/doctor-list' element={<DoctorsList/>}/>
            </Routes>
          </div>
        </div>
      ) : (
        // Render Login page when atoken is empty
        <Login />
      )}
      <ToastContainer />
    </>
  );
};

export default App;
