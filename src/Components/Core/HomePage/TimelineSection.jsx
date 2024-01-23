import React from 'react'
import TextColor from './TextColor'
import Button from './Button'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"
import compareWithOthersImg from "../../../assets/Images/Compare_with_others.svg"
import knowyourProgressImg from "../../../assets/Images/Know_your_progress.svg"
import planYourlessonImg from "../../../assets/Images/Plan_your_lessons.svg"
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
    <div className='w-[11/12]'>
           <div className=' h-[auto] relative '>
            <div className='flex flex-row gap-10 py-[90px] px-[120px] justify-around  h-fit'>
             <div className='text-4xl font-semibold  h-fit overflow-hidden w-[50%]'>
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
            <div className='flex flex-row  gap-16 px-[120px]'>
                {/* Time line */}
                <div>
                {
                    TimelineData.map((data , index)=>{
                        return (
                            <div key={index}>
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
                            <div   className={`hidden ${
                    TimelineData.length - 1 === index ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[35px]`}></div> 
                            </div>
                         
                        )
                    })
                }
                </div>
                <div className='relative h-[600px]'>
                    <img src={timelineImage} alt="" className=' h-fit object-cover h'/>
                    <div className='bg-caribbeangreen-700 absolute  translate-x-[70px] -translate-y-20  flex p-[42px] gap-[52px] w-auto h-auto '>
           {/* green box */}
                <div className='flex gap-[24px]'>
                <div className='text-white text-5xl font-bold'>10</div>
                <div className=' text-caribbeangreen-500'>YEARS <br />EXPERIENCES</div>
                </div>
                <div className='w-[1px] h-[44px] border border-caribbeangreen-500'></div>
                <div className='flex gap-[24px]'>
                <div className='text-white text-5xl font-bold h-14'>250</div>
             
                <div className='text-caribbeangreen-500'>TYPES OF <br />COURSES</div> 
                </div>
            </div>
            </div>
            
            </div>                    
            
            {/* Images section  */}
                <div className='h-[70px]'></div>
            <div className='w-[11/12]'>
                {/* Heading section */}
                <div className='text-center text-4xl font-semibold'>
                Your swiss knife for <TextColor text={"learning any language"} /> 
                </div>
                <div className='text-richblack-700 text-center mt-2'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, <br /> progress tracking, custom schedule and more.
                </div>
                {/*  image section */}

                <div className='flex justify-center flex-row translate-x-10'>
                <img src={knowyourProgressImg} alt="" className='relative left-[100px]' />
                <img src={compareWithOthersImg} alt="" className="z-40" />
                <img src={planYourlessonImg} alt="" className='relative right-[140px] z-50' />
                </div>

                {/* Button  */}
                <div className='w-fit flex flex-row relative left-[650px]'>
                       <Button active={true} linkto={"/signup"}>
                    <div>
                        Learn More
                    </div>
                </Button>   
                </div>
          
            </div>
        </div>
    </div>
  )
}

export default TimelineSection