import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {assets} from '../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
const Profile = () => {
  const {userData,setUserData,token,backendurl,loadUserProfileData}=useContext(AppContext)
   console.log(userData)
  const [isEdit, setIsEdit] = useState(false);
  const[image,setImage]=useState(false)
  const updateUserProfile = async () => {
    try {
      const formData = new FormData(); // Fix capitalization
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) {
        formData.append('image', image);
      }
  
      const { data } = await axios.post(`${backendurl}/api/user/update-profile`, formData, {
        headers: { token },
      });
  
      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null); // Reset image state
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('An error occurred while updating the profile');
      console.error(error.message);
    }
  };
  

    

  
  return userData && (
    <div className="p-4 max-w-lg mx-auto bg-gray-100 rounded-lg shadow">
      <div className="text-center mb-4">
        {
          isEdit
          ? <label htmlFor='image'>
            <div className='inline-block relative cursor-pointer'>
              <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image):userData.image} alt=""/>
              <img className='w-10 absolute bottom-12 right-10' src={image ? '' :assets.upload_icon } alt=""/>
            
            </div>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
          </label>
        
        :<img
          src={userData.image}
          alt="Profile"
          className="w-24 h-24 mx-auto rounded-full"
        />
}
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="mt-2 max-w-52 p-1 w-full text-center border rounded-md"
          />
        ) : (
          <p className="text-xl font-semibold mt-2">{userData.name}</p>
        )}
      </div>

      <hr className="my-4" />

      <div className="mb-4">
        <p className="font-medium">CONTACT INFORMATION</p>
        <div className=" grid grid-cols-[1fr_3fr] gap-y-2.5  mt-3 text-neutral-700">
          <p className='font-medium'>Email:</p>
          <p className='text-blue-500'>{userData.email}</p>
          <p className='font-medium'>Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="w-full border p-1 rounded mt-1 max-w-52"
            />
          ) : (
            <p className='text-blue-500'>{userData.phone}</p>
          )}
          <p>Address:</p>
          {isEdit ? (
            <div>
              <input
                type="text"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                className="w-full max-w-52 p-1 border rounded mt-1"
              />
              <input
                type="text"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                className="w-full border max-w-52 p-1 rounded mt-1"
              />
            </div>
          ) : (
            <p>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-medium">BASIC INFORMATION</p>
        <div className=" grid grid-cols-[1fr_3fr] gap-y-2.5  mt-3 text-neutral-700">
          <p>Gender:</p>
          {isEdit ? (
            <select
              value={userData.gender}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              className="w-full border  max-w-52 p-1 rounded mt-1"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p>{userData.gender}</p>
          )}
          <p>Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={userData.dob}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              className="w-full border  max-w-52 p-1 rounded mt-1"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>
      </div>

      <div className="text-center mt-4">
        {isEdit ? (
          <button
            onClick={updateUserProfile}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-4 py-2 bg-blue-500  text-white rounded"
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
