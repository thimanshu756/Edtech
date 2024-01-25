import React, { useState } from 'react'
import TextHighlight from '../Components/Core/AuthPage/TextHighlight';

const SignUp = () => {
    const [Instructor , setInstructor]= useState(false);

  return (
    <div className=' w-11/12 bg-richblack-900 max-w-maxContent flex '>
        {/* form */}
        <div className='flex w-[40%] p-[32px] flex-col gap-[36px]'>
    
        <div className=''>
            {
                    Instructor ? (<div className='flex flex-col gap-4 '>
                        <p className='text-richblack-5 font-inter text-4xl h-[50px] '>Welcome </p>
                        <p className='text-richblack-100 font-inter h-8 '>Discover your passions, <TextHighlight text={" Be Unstoppable "} /></p>
                    </div>):(<div>
                        <p className='text-richblack-5 font-inter text-3xl h-[100px] '> Join the millions learning to code with StudyNotion for free</p>
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

        </div>
        {/* image */}
        <div>

        </div>
    </div>
  )
}

export default SignUp