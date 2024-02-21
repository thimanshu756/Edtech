import React, { useState } from 'react'
import TextHighlight from '../Components/Core/AuthPage/TextHighlight';
import LoginForm from '../Components/Core/AuthPage/loginForm';
import loginImg from "../assets/Images/login.webp"
import { ACCOUNT_TYPE } from '../utils/constants';

const Login = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.INSTRUCTOR)
    return (
      <>
    <div className=' w-11/12 bg-richblack-900 max-w-maxContent flex flex-col-reverse md:flex-row justify-between items-center p-10  mb-28 '>
        {/* form */}
        <div className='flex md:w-[508px] p-[32px] flex-col gap-[16px] '>
        <div className=''>
            {
                     accountType=="Instructor" ? (<div className='flex flex-col gap-2 '>
                        <p className='text-richblack-5 font-inter text-4xl  '>Welcome Back </p>
                        <p className='text-richblack-100 font-inter  '>Discover your passions, <TextHighlight text={" Be Unstoppable "} /></p>
                    </div>):
                    (<div className='flex flex-col gap-4'>
                        <p className='text-richblack-5 font-inter text-3xl  '> Join the millions learning to code with StudyNotion for free</p>
                        <p className='text-richblack-100 font-inter h-20'>Build skills for today, tomorrow, and beyond.<TextHighlight text={" Education to future-proof your career."} /> </p>
                    </div>)
            }
        </div>
   
        {/* form  */}
          <LoginForm />
        </div>
        {/* image */}
        <div className='relative right-2 shadow-[25px_20px_20px_0px_#F5F5F5]'>
            <img src={loginImg} alt="" className='lg:h-[504px] lg:w-[558px] shadow-[25px_20px_20px_0px_#F5F5F5]'/>
        </div>
    </div>

    </>
  )
}


export default Login