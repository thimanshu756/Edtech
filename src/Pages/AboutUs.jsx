import React from 'react'
import TextColor from '../Components/Core/HomePage/TextColor'
import img1 from "../assets/Images/aboutus1.webp"
import img2 from "../assets/Images/aboutus2.webp"
import img3 from "../assets/Images/aboutus3.webp"
import img4 from "../assets/Images/FoundingStory.png"
import Stats from '../Components/Core/AboutUs/Stats'
import LearningGrid from '../Components/Core/AboutUs/LearningGrid'
import ContactusForm from '../Components/Common/ContactusForm'

const AboutUs = () => {
  return (
    <div className=' '>
        {/* section 1 */}
        <div className=' bg-richblack-800 mb-36 h-[500px]'>
            <div className='flex flex-col gap-7 items-center text-white mt-6 w-11/12 mx-auto relative'>
            <p className='text-richblack-100'>About Us</p>
            <h1 className='text-4xl lg:w-[913px] text-center h-[100px] lg:px-[52px]'>Driving Innovation in Online Education for a <TextColor text={" Brighter Future"}/></h1>
            <p className='text-richblack-100 text-center lg:w-[913px] lg:px-[52px]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </div>
            <div className="grid grid-cols-3 gap-4 w-11/12 mx-auto absolute h-[330px] lg:left-24 top-[400px] ">
                <img src={img1} alt="" className='h-[330px] w-[384px]'/>
                <img src={img2} alt=""  className='h-[330px] w-[384px]'/>
                <img src={img3} alt=""  className='h-[330px] w-[384px]'/>
            </div>
        </div>
        {/* section 2 */}
        <div  className=' bg-richblack-900 h-full '>
        <div className='w-11/12 mx-auto mt-36 '>
            <h1 className='text-4xl text-richblack-25 py-[90px] px-[120px] '>
            We are passionate about revolutionizing the way we learn. Our innovative platform <TextColor text={"combines technology"}/> , <span className='orangeTextColor'>expertise</span> , and community to create an <span className='yellowTextcolor'>unparalleled educational experience</span> .
            </h1>
        </div>
        <div className='w-11/12 mx-auto flex flex-row py-[90px] relative px-[120px]'>
        <div className='w-[50%] flex flex-col gap-5'>
            <h1 className='headingTextColor text-4xl  h-[50px]'> Our Founding Story</h1>
            <p className='text-richblack-100 w-[73%]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
            <p className='text-richblack-100 w-[73%]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
          </div>
          <div className='w-[50%] flex '>
        <div className='gradient-about relative '>
        </div>
        <img src={img4} alt="" className='absolute right-20 h-[278px] w-[470px]'/>
        </div>
        </div>
        <div className='w-11/12 mx-auto flex flex-row py-[90px] gap-[150px]  relative px-[120px]'>
        <div className='w-[50%] flex flex-col gap-4'>
            <h1 className='text-4xl yellowTextcolor  h-[50px]'>Our Vision</h1>
            <p className='text-richblack-100 '>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
        </div>
        <div className='w-[50%]  flex flex-col gap-4'>
        <h1 className='text-4xl  h-[50px]'> <TextColor text={"Our Mission"}/> </h1>
            <p className='text-richblack-100 '>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
        </div>
        </div>
        </div>
        {/* Section 3 */}
        <div>
            <Stats/>
        </div>
        <div>
            <LearningGrid/>
        </div>
        <ContactusForm/>
    </div>
  )
}

export default AboutUs