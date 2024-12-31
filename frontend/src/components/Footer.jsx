import React from 'react'

const Footer = () => {
  return (
    <div className='md:mx-10 mt-32'>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr]  gap-14 my-10 text-sm'>
        <div className=''>
            <h1 className='text-primary font-bold text-4xl ml-16 font-serif mb-4' >DOCTORTO</h1>
            <p className=' w-full md:w-2/3 text-gray-600 leading-6 '>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci hic similique, exercitationem eveniet tempore voluptatibus iure esse, eius cum libero, laborum voluptatum! Sint doloribus expedita laudantium soluta sit cupiditate tenetur.
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corrupti labore quasi ipsam repudiandae dolor culpa a quas eaque deleniti at, praesentium ea facere autem nobis sit exercitationem harum, quam neque.
            
             </p>
        </div>
        <div>
            <h1 className='text-xl fonr-medium mb-5'>COMPANY</h1>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>Home</li>
                <li>About Us</li>
                <li>Contact Us</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div >
            <h1 className='text-xl fonr-medium mb-5'>GET IN TOUCH</h1>
            <ul className='flex flex-col gap-2 text-gray-600'>
                <li>+1-212-965-7825</li>
                <li>vanshikagahlot</li>
            </ul>
        </div>
    </div>
        <div>
        <hr/>
        <p className='py-5 text-sm text-center'>copyright@</p>
        </div>
    </div>
  )
}

export default Footer
