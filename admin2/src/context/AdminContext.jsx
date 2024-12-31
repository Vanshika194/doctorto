import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  // Set the token from localStorage or initialize as null
  const [atoken, Setatoken] = useState(localStorage.getItem('atoken') || null);
  const [doctors,setDoctors]=useState([])
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const getAllDoctors=async()=>{
    try {
      const {data}=await axios.post(backendurl+'/api/admin/all-doctors',{},{headers:{atoken}})
      if(data.success){
        setDoctors(data.doctors)
        console.log(data)
      }
      else{
       
        toast.error(data.message)
      }
    } catch (error) {
    
      toast.error(error.message)
      
    }
  }

  const changeAvailabilty= async(docId)=>{
    try {
      console.log(docId)
      const {data}=await axios.post(backendurl+'/api/admin/change-availabilty',{docId},{headers:{atoken}})
      if(data.success){
        toast.success(data.message)
        getAllDoctors()
      }
      else{
      
        toast.error(data.message)
      }
    } catch (error) {
     
      toast.error(error.message)
      
    }
  }
  const value = {
    atoken,
    Setatoken,
    backendurl,
    doctors,
    getAllDoctors,
    changeAvailabilty
  };

  // This useEffect will update the token in localStorage whenever it changes
  useEffect(() => {
    if (atoken) {
      localStorage.setItem('atoken', atoken);
    }
  }, [atoken]);

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
