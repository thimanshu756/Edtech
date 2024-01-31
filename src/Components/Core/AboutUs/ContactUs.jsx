import React from 'react'
import ContactusForm from '../../Common/ContactusForm'
const ContactUs = () => {
  return (
    <div>
        <div className='mt-10 mx-auto mb-10 gap-3 lg:w-[600px] text-center flex flex-col'>
        <h1 className='text-richblack-5 text-4xl'>Get in Touch</h1>
        <p className='text-richblack-100'>We’d love to here for you, Please fill out this form.</p>
        </div>
        <ContactusForm/>
    </div>
  )
}

export default ContactUs