import React from 'react'
import TextColor from './TextColor'
import Button from './Button'
import logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"
import compareWithOthersImg from "../../../assets/Images/Compare_with_others.svg"
import knowyourProgressImg from "../../../assets/Images/Know_your_progress.svg"
import planYourlessonImg from "../../../assets/Images/Plan_your_lessons.svg"
const TimelineSection = () => {
    const TimelineData = [
        {
            heading: "Leadership",
            img: logo1,
            Description: "Fully committed to the success company"
        },
        {
            heading: "Responsibility",
            img: logo2,
            Description: "Students will always be our top priority"
        },
        {
            heading: "Flexibility",
            img: logo3,
            Description: "The ability to switch is an important skills"
        },
        {
            heading: "Solve the problem",
            img: logo4,
            Description: "Code your way to a solution"
        }
    ]
    return (
        <div className='w-[11/12]'>
            <div className=' h-[auto] relative '>
                <div className='flex flex-col items-center md:flex-row gap-10 py-[90px] md:px-[120px] justify-around  h-fit'>
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
                <div className='flex flex-col md:flex-row  gap-16 md:px-[120px]'>
                    {/* Time line */}
                    <div>
                        {
                            TimelineData.map((data, index) => {
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
                                        <div className={`hidden ${TimelineData.length - 1 === index ? "hidden" : "lg:block"
                                            }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[35px]`}></div>
                                    </div>

                                )
                            })
                        }
                    </div>
                    <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <div className="absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%]  bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
            {/* Section 1 */}
            <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">10</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[105px]">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-center lg:px-14 px-7">
              <h1 className="text-3xl font-bold w-[75px]">250</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                types of courses
              </h1>
            </div>
            <div></div>
          </div>
          <img
            src={TimeLineImage}
            alt="timelineImage"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
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

                    <div className="flex flex-col md:flex-row items-center justify-center mt-8 overflow-hidden lg:mt-0">
                        <img src={knowyourProgressImg} alt=""   className="object-contain  lg:-mr-32 " />
                        <img src={compareWithOthersImg} alt=""  className="object-contain lg:-mb-10 lg:-mt-0 -mt-12"/>
                        <img src={planYourlessonImg} alt="" className="object-contain  lg:-ml-36 lg:-mt-5 -mt-16" />
                    </div>

                    {/* Button  */}
                    <div className=' mx-auto w-fit'>
                        <Button active={true} linkto={"/signup"}>
                            <div>
                                Learn More
                            </div>
                        </Button>
                    </div>

                </div>
            </div>
        
        
    )
}

// export default TimelineSection
// const TimeLine=[
//             {
//                 heading:"Leadership",
//                 img:logo1,
//                 Description:"Fully committed to the success company"
//             },
//             {
//                 heading:"Responsibility",
//                 img:logo2,
//                 Description:"Students will always be our top priority" 
//             },
//             {
//                 heading:"Flexibility",
//                 img:logo3,
//                 Description:"The ability to switch is an important skills" 
//             },
//             {
//                 heading:"Solve the problem",
//                 img:logo4,
//                 Description:"Code your way to a solution" 
//             }
//         ]
// const TimelineSection = () => {
//     return (
//       <div>
//         <div className="flex flex-col lg:flex-row gap-20 mb-20 items-center">
//           <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
//             {TimeLine.map((ele, i) => {
//               return (
//                 <div className="flex flex-col lg:gap-3" key={i}>
//                   <div className="flex gap-6" key={i}>
//                     <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
//                       <img src={ele.img} alt="" />
//                     </div>
//                     <div>
//                       <h2 className="font-semibold text-[18px]">{ele.heading}</h2>
//                       <p className="text-base">{ele.Description}</p>
//                     </div>
//                   </div>
//                   <div
//                     className={`hidden ${
//                       TimeLine.length - 1 === i ? "hidden" : "lg:block"
//                     }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
//                   ></div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="relative overflow-hidden w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
//             <div className="absolute z-[999] lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
//               {/* Section 1 */}
//               <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
//                 <h1 className="text-3xl font-bold w-[75px]">10</h1>
//                 <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
//                   Years experiences
//                 </h1>
//               </div>

//               {/* Section 2 */}
//               <div className="flex gap-5 items-center lg:px-14 px-7">
//                 <h1 className="text-3xl font-bold w-[75px]">250</h1>
//                 <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
//                   types of courses
//                 </h1>
//               </div>
//               <div></div>
//             </div>
//             <img
//               src={TimeLineImage}
//               alt="timelineImage"
//               className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
//             />
//           </div>
//         </div>
//       </div>
//     );
//   };

export default TimelineSection;