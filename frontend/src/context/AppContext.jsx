import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  // State management
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for API calls

  // Fetch doctor data
  const getDoctorData = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(`${backendurl}/api/doctor/list`);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message || "Failed to fetch doctors.");
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error(error.response?.data?.message || "Error fetching doctor data.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Load user profile data
  const loadUserProfileData = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(`${backendurl}/api/user/get-profile`, {
        headers: { token },
      });
      if (data.success) {
        console.log(data.userData)
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to load user profile.");
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      toast.error(error.response?.data?.message || "Error fetching user data.");
    } finally {
      setLoading(false); // End loading
    }
  };

  // Token validation
  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(null); // Reset user data if token is invalid or removed
    }
  }, [token]);

  // Fetch doctors on component mount
  useEffect(() => {
    getDoctorData();
  }, []);

  const value = {
    doctors,getDoctorData,
    currencySymbol,
    token,
    setToken,
    backendurl,
    userData,
    setUserData,
    loadUserProfileData,
    loading,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
