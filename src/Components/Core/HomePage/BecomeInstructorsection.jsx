import React from 'react'
import TextColor from './TextColor'
import Button from './Button'
import instructorImg from "../../../assets/Images/Instructor.png"
import { FaArrowRightLong } from "react-icons/fa6";

const BecomeInstructorsection = () => {
  return (
    <div>
    <div className='flex flex-col gap-60 items-center md:flex-row py-[90px] p-4 md:px-[120px]'>
        <div className='md:w-[50%]'>
        <img src={instructorImg} alt="InstructorImg"   className="shadow-white shadow-[-20px_-20px_0_0]"/>
        </div>
    <div className='md:w-[50%] flex gap-10 flex-col '>
    <h1 className="lg:w-[50%] overflow-hidden text-4xl text-richblack-50 font-semibold ">
              Become an
              <TextColor text={" instructor"} />
            </h1>        
            <p className="font-medium text-[16px] text-justify w-[90%] text-richblack-300">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
            <div className='w-fit mt-5'>
            <Button active={true} linkto={"/sinup"}>
            <div className='flex items-center  gap-2'>    
                Start Teaching Today 
                <FaArrowRightLong />
            </div>
        </Button>  
        </div>
    </div>
    </div>
    </div>
  )
}

export default BecomeInstructorsection