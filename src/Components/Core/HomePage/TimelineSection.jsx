import React from 'react'
import TextColor from './TextColor'
import Button from './Button'
const TimelineSection = () => {
  return (
    <div>
           <div className=' h-[auto] w-[11/12]'>
            <div className='flex flex-row gap-10 py-[90px] px-[120px] justify-around  h-fit'>
             <div className='text-4xl font-semibold  h-[100px] w-[50%]'>
             Get the skills you need for a <TextColor text={" job that is in demand."} />
             </div>
             <div className='w-[50%] '>
                <div className='font-inter font-medium text-richblack-700 mb-7'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </div>
                <div className='w-fit'>
                <Button active={true} linkto={"/signup"}>
                <div>
                    Learn More
                </div>
                </Button>  
                </div>
               
             </div>
            </div>
            <div className='flex w-[11/12]'>
                {/* Time line */}
            <div>

            </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection