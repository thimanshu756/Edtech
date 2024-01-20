import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightLong } from "react-icons/fa6";
import TextColor from '../Components/Core/HomePage/TextColor';
import Button from '../Components/Core/HomePage/Button';
import bannerVideo from "../assets/Images/banner.mp4"
import CodeBlocks from '../Components/Core/HomePage/CodeBlocks';
import TimelineSection from '../Components/Core/HomePage/TimelineSection';
import BecomeInstructorsection from '../Components/Core/HomePage/BecomeInstructorsection';

const Home = () => {
    
  return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between '>
            <Link to={"/signup"}>
            <div className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit group '>
                <div className='flex  flex-row gap-4 items-center rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instructor</p>
                    <FaArrowRightLong />
                </div>
            </div>
            </Link>

            <div className='text-center text-4xl font-semibold mt-7'>
              Empower Your Future with <TextColor text= {"Coding Skills"}/>
            </div>             
            
            <div className='w-[90%] text-center text-lg text-richblack-300 mt-4'>
                <p>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a <br /> wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>  
            </div>

            <div className='flex gap-11 mt-10'>
                <Button active={true} linkto={"/signup"}>
                    Learn More 
                </Button>

                <Button active={false} linkto={"/"}>
                Book a Demo 
                </Button>
            </div>
            <div className='w-[11/12] mt-11 relative left-14  '>
                <video src={bannerVideo}
                muted 
                loop
                autoPlay
                className='h-[515px]' >
                </video>
            </div>

            <div className='w-[11/12] relative left-16'>
            <CodeBlocks 
            position={"flex-row"}
            heading={
                <div>
                    Unlock your 
                    <TextColor text={" coding potential "}/> <br />
                    with our online courses.
                 </div>
            }
            para={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
            button1={{buttonText:"Try it Yourself" , linkto:"/signup" ,active:true}}
            button2={{buttonText:"Learn More" , linkto:"/login" ,active:false}}
            codes={'<!DOCTYPE html> \n<head> \n <title> Example </title> \n <linkrel="stylesheet" href="styles.css"> \n </head> \n </body> \n <h1> <ahref="/">Header </a> \n </h1> \n <nav> <a href="one/"> One </a> \n <a href="two/"> Two </a> \n <a href="three/"> Three </a> \n </body> \n </html> '}
            codeColor={"text-yellow-100"}
            backgroundGradient={" bg-gradient-to-b from-[#8A2BE2] from-6.46% via-[#FFA500] via-59.04% to-[#F8F8FF] to-124.53%"}
            />
            </div>

            <div className='w-[90%] relative left-16'>
            <CodeBlocks 
            position={"flex-row-reverse"}
            heading={
                <div>
                    Start
                    <TextColor text={" coding "}/> <br />
                    <TextColor text={" in seconds "}/>
                 </div>
            }
            para={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
            button1={{buttonText:"Continue Lesson" , linkto:"/signup" ,active:true}}
            button2={{buttonText:"Learn More" , linkto:"/login" ,active:false}}
            codes={'<!DOCTYPE html> \n<head> \n <title> Example </title> \n <linkrel="stylesheet" href="styles.css"> \n </head> \n </body> \n <h1> <ahref="/">Header </a> \n </h1> \n <nav> <a href="one/"> One </a> \n <a href="two/"> Two </a> \n <a href="three/"> Three </a> \n </body> \n </html> '}
            codeColor={"text-yellow-100"}
            backgroundGradient={" bg-gradient-to-b from-[#1FA2FF] from-3.62% via-[#12D8FA] via-50.44% to-[#A6FFCB ] to-104.53%"}
            />
            </div>
            {/* Extra div */}
            <div className='h-[100px] '></div>

            <div className='text-white text-4xl text-center'>
            Unlock the  
            <TextColor 
            text={" Power of Code"}
            />
            </div>
            <div className=' mt-2 text-xl text-center text-richblack-300 '>
            Learn to Build Anything You Can Imagine
            </div>
            <div className='h-[100px] '></div>
        </div>

        {/* section 2 */}
        <div className='flex flex-col w-[11/12] bg-greys-5'>
        <div className=' h-[300px]' id='cross-section'>
        <div className='flex flex-row justify-center gap-9 mt-[130px]'>
          <Button active={true} linkto={"/signup"}>
            <div className='flex flex-row gap-3 items-center'>
            Explore Full Catalog 
            <FaArrowRightLong/>
            </div>
          </Button>
          <Button active={false} linkto={"/signup"}>
            <div className='flex flex-row gap-3 items-center text-white '>
            Learn More 
          
            </div>
          </Button>
        </div>
        </div>
        <div className='mb-10'>
                <TimelineSection/>
        </div>
        </div>
            <div>
            <BecomeInstructorsection/>
            </div>
    </div>
  )
}

export default Home