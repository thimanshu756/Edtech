import React from 'react'
import TextColor from './TextColor'
import Button from './Button'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
const TimelineSection = () => {
    const TimelineData=[
        {
            heading:"Leadership",
            img:logo1,
            Description:"Fully committed to the success company"
        },
        {
            heading:"Responsibility",
            img:logo2,
            Description:"Students will always be our top priority" 
        },
        {
            heading:"Flexibility",
            img:logo3,
            Description:"The ability to switch is an important skills" 
        },
        {
            heading:"Solve the problem",
            img:logo4,
            Description:"Code your way to a solution" 
        }
    ]
  return (
    <div>
           <div className=' h-[auto] w-[11/12] relative '>
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
            <div className='flex w-[11/12] gap-16 px-[120px]'>
                {/* Time line */}
                <div>
                {
                    TimelineData.map((data)=>{
                        return (
                            <div>
                            <div className='flex gap-10 py-[16px] px-[12px]'> 
                            <div className=' flex justify-center items-center rounded-full w-[52px] h-[52px] bg-white  '>
                                    <img src={data.img} alt="" />
                                </div>
                                 <div className='flex flex-col '>
                                    <div className='text-Rich-Black-800 font-semibold'>{data.heading}</div>
                                    <div>{data.Description}</div>
                                </div>
                            </div> 
                      {/*  */}
                            <div className='h-[42px] border border-dotted relative left-9 w-0'></div> 
                            </div>
                         
                        )
                    })
                }
                </div>
                <div>
                    <img src={timelineImage} alt="" className='h-[546px]'/>
                </div>
            <div>
                {/* green box */}
           
            </div>
            
            </div>
       
            <div className='bg-caribbeangreen-700 absolute  translate-x-[630px] -translate-y-20  flex p-[42px] gap-[52px] w-auto h-auto '>
                <div className='flex gap-[24px]'>
                <div className='text-white text-5xl font-bold'>10</div>
                <div className=' text-caribbeangreen-500'>YEARS <br />EXPERIENCES</div>
                </div>
                <div className='w-[1px] h-[44px] border border-caribbeangreen-500'></div>
                <div className='flex gap-[24px]'>
                <div className='text-white text-5xl font-bold'>250</div>
             
                <div className='text-caribbeangreen-500'>TYPES OF <br />COURSES</div> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default TimelineSection