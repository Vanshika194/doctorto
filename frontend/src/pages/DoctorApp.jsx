import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';

const DoctorApp = () => {
  const navigate=useNavigate()
  const { docId } = useParams();
  const { doctors, currencySymbol,backendurl,token,getDoctorData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo || null);
  };

  const getAvailableSlots = () => {
    const slots = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() + i);

      let endTime = new Date(day);
      endTime.setHours(21, 0, 0, 0); // End at 9:00 PM

      if (today.getDate() === day.getDate()) {
        day.setHours(day.getHours() > 10 ? day.getHours() + 1 : 10);
        day.setMinutes(day.getMinutes() > 30 ? 30 : 0);
      } else {
        day.setHours(10);
        day.setMinutes(0);
      }

      const timeSlots = [];
      while (day < endTime) {
        const formattedTime = day.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        timeSlots.push({
          datetime: new Date(day),
          time: formattedTime,
        });

        day.setMinutes(day.getMinutes() + 30);
      }
      slots.push({ date: day.toDateString(), timeSlots });
    }
    setDocSlots(slots);
  }
  const bookApp=async ()=>{
    if(!token){
      toast.warn('login to book appointment')
      return navigate('/login')
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src={docInfo.image}
              alt={`${docInfo.name}'s profile`}
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg bg-white mx-6 p-5 sm:mx-0 mt-[-80px] sm:mt-0">
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="Verified" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About
                <img src={assets.info_icon} alt="Info" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:
              <span> {currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slot</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
            {docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? 'bg-primary text-white'
                    : 'border border-x-gray-200'
                }`}
                key={index}
              >
                <p>{daysOfWeek[new Date(item.date).getDay()]}</p>
                <p>{new Date(item.date).getDate()}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {docSlots[slotIndex]?.timeSlots.map((slot, index) => (
              <p 
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  slot.time === slotTime
                    ? 'bg-primary text-white'
                    : 'text-gray-400 border border-gray-500'
                }`}
                key={index}
                onClick={() => setSlotTime(slot.time)}
              >
                {slot.time.toLowerCase()}
              </p>
            ))}
          </div>
          <button onClick={bookApp} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6 '>Book an appointment</button>
        </div>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
      </div>
    )
  );
};

export default DoctorApp;
