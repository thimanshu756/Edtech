import React, { useState } from 'react'

const SignUp = () => {
    const [Instructor , setInstructor]= useState(false);
    
  return (
    <div className=' w-11/12 bg-richblack-900 max-w-maxContent flex '>
        {/* form */}
        <div className='flex w-[40%] p-[32px] flex-col gap-[36px]'>
        <div>
            <p>Join the millions learning to code with StudyNotion for free</p>
            <p></p>
        </div>
        </div>
        {/* image */}
        <div>

        </div>
    </div>
  )
}

export default SignUp