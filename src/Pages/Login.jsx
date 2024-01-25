import React, { useState } from 'react'
import TextHighlight from '../Components/Core/AuthPage/TextHighlight';
import Form from '../Components/Core/AuthPage/Form';
import loginImg from "../assets/Images/login.webp"
const Login = () => {
  const [Instructor , setInstructor]= useState(false);
  return (
    <div className=' w-11/12 bg-richblack-900 max-w-maxContent flex justify-between items-center p-10  mb-28 '>
        {/* form */}
        <div className='flex w-[508px] p-[32px] flex-col gap-[16px] '>
        <div className=''>
            {
                    Instructor ? (<div className='flex flex-col gap-2 '>
                        <p className='text-richblack-5 font-inter text-4xl h-[50px] '>Welcome Back </p>
                        <p className='text-richblack-100 font-inter h-8 '>Discover your passions, <TextHighlight text={" Be Unstoppable "} /></p>
                    </div>):(<div className='flex flex-col gap-4'>
                        <p className='text-richblack-5 font-inter text-3xl  '> Join the millions learning to code with StudyNotion for free</p>
                        <p className='text-richblack-100 font-inter h-20'>Build skills for today, tomorrow, and beyond.<TextHighlight text={" Education to future-proof your career."} /> </p>
                    </div>)
            }
        </div>
          {/* slider */}
        <div className=' bg-richblack-800 w-[200px] flex  rounded-full p-[4px] transition-all duration-200'>
           <div className= {`py-[6px] px-[18px] ${Instructor ? " text-richblack-200" : "text-richblack-5 bg-richblack-900 rounded-full "}`} onClick={()=>setInstructor(false)} >Student</div>
           <div className= {`py-[6px] px-[18px] ${Instructor ? "text-richblack-5 bg-richblack-900 rounded-full " : "text-richblack-200"}`} onClick={()=>setInstructor(true)}>Instructor</div>
        </div>
        {/* form  */}
          <Form type={"Login"} Instructor={Instructor}/>
        </div>
        {/* image */}
        <div className='relative right-2 shadow-[25px_20px_20px_0px_#F5F5F5]'>
            <img src={loginImg} alt="" className='lg:h-[504px] lg:w-[558px] shadow-[25px_20px_20px_0px_#F5F5F5]'/>
        </div>
    </div>
  )
}


export default Login