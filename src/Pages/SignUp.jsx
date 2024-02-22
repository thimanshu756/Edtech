import React, { useState } from 'react'
import TextHighlight from '../Components/Core/AuthPage/TextHighlight';
import SignUpForm from '../Components/Core/AuthPage/signUpForm';
import signUpImg from "../assets/Images/signup.webp"
import { ACCOUNT_TYPE } from '../utils/constants';

const SignUp = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.INSTRUCTOR)
  return (
    <div className=' w-11/12 bg-richblack-900 max-w-maxContent flex flex-col-reverse md:flex-row justify-between items-center p-10  mb-28 '>
        {/* form */}
        <div className='flex  md:w-[508px] p-[32px] flex-col gap-[16px] '>
        <div className=''>
            {
                    accountType=="Instructor" ? (<div className='flex flex-col gap-4 '>
                        <p className='text-richblack-5 font-inter text-4xl h-[50px] '>Welcome </p>
                        <p className='text-richblack-100 font-inter overflow-hidden '>Discover your passions, <TextHighlight text={" Be Unstoppable "} /></p>
                    </div>):(<div className='flex gap-2 flex-col'>
                        <p className='text-richblack-5 font-inter text-3xl  '> Join the millions learning to code with Scholar Up for free</p>
                        <p className='text-richblack-100 font-inter h-20'>Build skills for today, tomorrow, and beyond.<TextHighlight text={" Education to future-proof your career."} /> </p>
                    </div>)
            }
        </div>
          {/* slider */}
        <div className=' bg-richblack-800 w-[200px] flex  rounded-full p-[4px] transition-all duration-200'>
           <div className= {`py-[6px] px-[18px] ${accountType=="Student"? " text-richblack-5 bg-richblack-900 rounded-full" : "text-richblack-200  "}`} onClick={()=>setAccountType(ACCOUNT_TYPE.STUDENT)} >Student</div>
           <div className= {`py-[6px] px-[18px] ${accountType=="Instructor" ? "text-richblack-5 bg-richblack-900 rounded-full " : "text-richblack-200"}`} onClick={()=>setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}>Instructor</div>
        </div>
        {/* form  */}
          <SignUpForm accountType={accountType} setAccountType={setAccountType} ACCOUNT_TYPE/>
        </div>
        {/* image */}
        <div className='relative right-2 shadow-[25px_20px_20px_0px_#F5F5F5]'>
            <img src={signUpImg} alt="" className='lg:h-[504px] lg:w-[558px] shadow-[25px_20px_20px_0px_#F5F5F5]'/>
        </div>

    </div>
  )
}

export default SignUp