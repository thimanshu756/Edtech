import React from 'react'
import { useForm } from "react-hook-form"
import countrycode from "../../data/countrycode.json"
const ContactusForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className='text-white flex flex-col lg:w-[600px] md:w-[400px] sm:w-[300px] xs:w-[300px] xxs:w-[300px] mx-auto '>
            <form className='flex flex-col gap-6 w-full' onSubmit={handleSubmit((data) => console.log(data))}>
                <div className='flex flex-row gap-5 w-full'>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor="firstname">First Name</label>
                        <input className='bg-richblack-700 rounded-md p-[12px]' placeholder='Enter first name' id='firstname' {...register('firstName', { required: true })} />
                        {errors.firstName && <p>First Name is required</p>}
                    </div>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor="lastname">Last Name</label>
                        <input className='bg-richblack-700 rounded-md p-[12px] ' placeholder='Enter last name' id='lastname' {...register('lastName')} />
                    </div>
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input className='bg-richblack-700 rounded-md p-[12px]' placeholder='Enter email address' id='email' {...register('email', { required: true })} />
                    {errors.email && <p>Email is required</p>}
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col'>
                        <label htmlFor="phoneno">phone no</label>
                        <div className='flex flex-row gap-3'>
                            <select name="" id="phoneno" className=' w-[70px] bg-richblack-700 rounded-md text-richblack-100 p-[12px]' {...register('countrycode', { required: true })}>
                                {
                                    countrycode.map((data, index) => {
                                        return <option value={`${data.code}`}>{data.code} {" "} {data.country}</option>
                                    })
                                }
                            </select>
                            <input type="number" id="phoneno" placeholder='12345 67890 ' className='bg-richblack-700 rounded-md p-[12px] w-full' {...register('phoneno', { required: true })}/>
                        </div>
                    </div>
                   
                </div>
                <div className='flex flex-col gap-3'>
                    <label htmlFor="message">Message</label>
                    <textarea className='bg-richblack-700 rounded-md p-[12px]' placeholder='Enter your message' rows={5} id='message' {...register('message', { required: true })} />
                    {errors.message && <p> Message is required</p>}  
                    </div>
                <button type='submit' className='border w-full text-richblack-900 mx-auto p-[12px] bg-yellow-50 border-none rounded-md '>Send Message </button>
            </form>
        </div>
    )
}

export default ContactusForm