import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../Common/IconBtn'
import { useNavigate } from 'react-router-dom'
import {RiEditBoxLine} from 'react-icons/ri'
const MyProfile = () => {
  const navigate=useNavigate()
  const {user}= useSelector((state)=>state.profile)
  console.log("User is +>",user.additionalDetails);
  return (
    <div className='flex flex-col text-richblack-50 items-center'> 
    <h1 className='text-4xl mt-10'>My Profile</h1>
    <div className='flex mt-20 items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 lg:w-[900px]'>
      <div className='flex gap-5 items-center'>
      <img src={user.image} alt="" className='w-[60px] rounded-full'/>
    <div className='flex flex-col'>
    <h1 className='text-richblack-5 text-xl'>{user.firstName} {" "}{user.lastName} </h1>
    <p className='text-sm'>{user.email}</p>
    </div>
      </div>
    <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
    </IconBtn>
    </div>
    <div className='flex mt-20 gap-10 flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 lg:w-[900px]'>
        <div className='flex justify-between w-[100%] items-center'>
          <h1 className='text-richblack-5 text-xl'>Personal Details</h1>
          <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
         </IconBtn>
        </div>
        <div className='flex justify-between w-[60%]'>
          <div>
            <p className='text-richblack-300'>First Name</p>
            <p className='text-richblack-5 text-lg'>{user.firstName}</p> 
          </div>
         <div>
         <p className='text-richblack-300'>Last Name</p>
          <p className='text-richblack-5 text-lg'>{user.lastName}</p> 
         </div>
        </div>
        <div className='flex justify-between w-[71%]'>
          <div>
            <p className='text-richblack-300'>Email</p>
            <p className='text-richblack-5 text-lg'>{user.email}</p> 
          </div>
         <div>
         <p className='text-richblack-300'>Phone Number</p>
          <p className='text-richblack-5 text-lg'>{user.additionalDetails.contactNumber ==null ? ("Enter the Contact No"):(`${user.additionalDetails.contactNumber}`)}</p> 
         </div>
        </div>
    </div>
    <div className='flex mt-20 mb-10 gap-10 flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 lg:w-[900px]'>
        <div className='flex justify-between w-[100%] items-center'>
          <h1 className='text-richblack-5 text-xl'>Additional Details</h1>
          <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
         </IconBtn>
        </div>
        <div className='flex justify-between w-[60%]'>
          <div>
            <p className='text-richblack-300'>About</p>
            <p className='text-richblack-5 text-lg'>{user.additionalDetails.about ==null ? ("Change The Bio"):(`${user.additionalDetails.about}`)}</p> 
          </div>
        </div>
        <div className='flex justify-between w-[71%]'>
          <div>
            <p className='text-richblack-300'>Date Of Birth</p>
            <p className='text-richblack-5 text-lg'>{user.additionalDetails.dateOfBirth ==null ? ("Enter Your DOB"):(`${user.additionalDetails.dateOfBirth}`)}</p> 
          </div>
         <div>
         <p className='text-richblack-300'>Gender</p>
          <p className='text-richblack-5 text-lg'>{user.additionalDetails.gender ==null ? ("Enter Your Gender"):(`${user.additionalDetails.contactNumber}`)}</p> 
         </div>
        </div>
    </div>
    </div>
  )
}

export default MyProfile