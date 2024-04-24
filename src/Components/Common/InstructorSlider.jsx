import {React,useEffect, useState} from 'react'
import { getAllInstructor } from '../../services/operations/profileAPI'
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules"
import Spinnner from './Spinnner'

const InstructorSlider = () => {
    const [Instructor , setInstructor]=useState(null)
    let data=[];
    async function FaFirstAid(){
        data = await getAllInstructor();
        setInstructor(data)
    }
    useEffect(()=>{
        FaFirstAid();
      },[])

  return (
    <>
    {
        !Instructor ? (<div className=' text-richblack-25 mt-24'>
          <Spinnner/>
        </div>):(
            <div className="text-white">
      <div className="my-[50px]">
      {/* <div> */}
      <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          breakpoints={{
            '@0.00': {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            '@0.75': {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            '@1.00': {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            '@1.50': {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
           modules={[FreeMode, Pagination, Autoplay]}
           className="mySwiper"
        >
            {
                Instructor.map((user,i)=>{
             
                return (
                    <SwiperSlide key={i}>
                     <div className="flex flex-col gap-3  bg-richblack-800 p-3 h-[350px] md:h-[350px] w-[] text-[14px] text-richblack-25">
                     <div className="flex items-center flex-col gap-4">
                    <img
                      src={
                        user?.image ? user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${user?.firstName} ${user?.lastName}`
                      }
                      alt=""
                      className="h-[70%] w-[80%] rounded-md object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-center text-richblack-5">{`${user?.firstName} ${user?.lastName}`}</h1>
                     
                    </div>
                    <p className=' overflow-hidden'> {user?.additionalDetails?.about}</p>
                  </div>
                    </div>
                    </SwiperSlide>
                )
                })
            }
            
        </Swiper>
      </div>
    </div>
        )
    }
    </>
   
  )
}

export default InstructorSlider