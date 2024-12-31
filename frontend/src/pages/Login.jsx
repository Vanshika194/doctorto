import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate=useNavigate();
  const {backendurl,token,setToken}=useContext(AppContext)
  const [state, setState] = useState('signup'); // 'signup' or 'login'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if(state==='signup'){
        const {data}=await axios.post(backendurl+'/api/user/register',{name,password,email})

        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else{
          console.log('vanshika')
          toast.error(data.message)
        }
      }
      else{
        const {data}=await axios.post(backendurl+'/api/user/login',{email,password})

        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else{
          toast.error(data.message)
        }

      }
      
    } catch (error) {
      console.log('123')
      toast.error(error.message)
      
    }
  };
  useEffect(()=>{
    if(token)
    {
      navigate('/')
    }
  },[token])
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md max-w-md w-full"
        onSubmit={onSubmitHandler}
      >
        <div>
          <p className="text-2xl font-semibold text-gray-800">
            {state === 'signup' ? 'Create Account' : 'Login'}
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Please {state === 'signup' ? 'sign up' : 'log in'} to book an appointment.
          </p>
          {state === 'signup' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 ">Full Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm hover:bg-blue-100 focus:ring-primary focus:border-primary  transition-all duration-300 sm:text-sm"
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-1 block w-full  h-10 border-gray-300 rounded-md shadow-sm focus:ring-primary  hover:bg-blue-100 focus:border-primary transition-all duration-300  sm:text-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="mt-1 block w-full  h-10 border-gray-300 rounded-md shadow-sm focus:ring-primary  hover:bg-blue-100 focus:border-primary transition-all duration-300  sm:text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition"
          >
            {state === 'signup' ? 'Create Account' : 'Login'}
          </button>
          <p className="text-sm text-center text-gray-500 mt-4">
            {state === 'signup' ? 'Already have an account?' : "Create an new account?"}{' '}
            <button
              type="button"
              onClick={() => setState(state === 'signup' ? 'login' : 'signup')}
              className="text-primary font-medium hover:underline"
            >
              {state === 'signup' ? 'Log in' : 'Sign up'}
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
