import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // For navigation

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { Setatoken, backendurl } = useContext(AdminContext);
  const navigate = useNavigate(); // React Router's navigation hook

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const url =
        state === 'Admin'
          ? `${backendurl}/api/admin/login`
          : `${backendurl}/api/doctor/login`;
      const { data } = await axios.post(url, { email, password });

      if (data.success) {
        localStorage.setItem('atoken', data.token);
        Setatoken(data.token);
        toast.success(`${state} login successful!`);
        navigate('/dashboard'); // Navigate to the dashboard or another page
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-[#5F6FFF]">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button className="bg-[#5F6FFF] text-white w-full py-2 rounded-md text-base" type="submit">
          Login
        </button>
        {state === 'Admin' ? (
          <p>
            Doctor Login?{' '}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={() => setState('Doctor')}
            >
              Click Here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{' '}
            <span
              className="text-[#5F6FFF] underline cursor-pointer"
              onClick={() => setState('Admin')}
            >
              Click Here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
