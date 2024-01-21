import React from 'react'
import TextColor from './TextColor'
import Button from './Button'
import instructorImg from "../../../assets/Images/Instructor.png"
import { FaArrowRightLong } from "react-icons/fa6";

const BecomeInstructorsection = () => {
  return (
    <div className='flex flex-col w-[11/12] '>
    <div className='flex gap-60 items-center flex-row py-[90px] px-[120px]'>
        <div className='shadow-[25px_20px_20px_0px_#F5F5F5] '>
        <img src={instructorImg} alt="InstructorImg" className='h-[445px] '/>
        </div>
    <div className='w-[39%] '>
        <div className='text-4xl text-richblack-5 h-28'>Become an <br/> <TextColor text={"instructor"}/> </div>
        <div className='text-richblack-300 mt-3'>Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</div>
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