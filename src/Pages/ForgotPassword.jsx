import {React, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPasswordToken } from '../services/operations/authApiControllers';
import { setEmailSent } from "../Slices/authSlice"
import { GoArrowLeft } from "react-icons/go";

const ForgotPassword = () => {
    const {loading}= useSelector((state)=>state.auth);
    const {emailSent}=useSelector((state)=>state.auth);
    const [email , setEmail]=useState("")
    const dispatch= useDispatch()
    const onSubmitHandler=(e)=>{
            e.preventDefault();
        dispatch(forgotPasswordToken(email))
    }
  return (
    <div className=' text-white h-[100vh] w-auto  flex flex-col justify-center items-center'>
        <div className=' p-8 xxs:pl-[50px]'>
        {
            loading ? ( <div>Loading......</div> ):(
                <div>
                    {
                        emailSent ? (
                        <div className='flex gap-5 flex-col'>
                        <h1 className=" text-2xl">Check email</h1>
                        <p className=' text-sm font-inter text-richblack-100 w-[320px]'>We have sent the reset email to {email}</p>
                        <button onClick={onSubmitHandler} className='  lg:w-[309px] md:w-[309px] sm:w-[300px] xs:w-[300px] xxs:w-[300px] bg-yellow-50 rounded-md p-[8px] text-richblack-900'>Resend Email</button>
                        <Link to={"/login"} >
                        <div className='flex items-center gap-2'>
                            <GoArrowLeft />
                            Back to Login
                            </div>
                        </Link>

                        </div> ):(
                            <div className='flex gap-5 flex-col'>
                            <h1 className=" text-2xl ">Reset your password</h1>
                            <p className=' text-sm font-inter text-richblack-100 w-[320px]'>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
                
                            <form onSubmit={onSubmitHandler} className='flex gap-5 flex-col'>
                                <label htmlFor="email">Email Address </label>
                                <input type="email" name="email" id="email" className='text-richblack-5 bg-richblack-600 h-9 rounded-md lg:w-[309px] p-2 md:w-[309px] sm:w-[300px] xs:w-[300px] xxs:w-[300px]' onChange={
                                    (e)=>{setEmail(e.target.value)}
                                } value={email}/>
                                <button type='submit' className='  lg:w-[309px] md:w-[309px] sm:w-[300px] xs:w-[300px] xxs:w-[300px] bg-yellow-50 rounded-md p-[8px] text-richblack-900'>Reset Password</button>
                            </form>
                            <Link to={"/login"}>
                            <div className='flex items-center gap-2'>
                            <GoArrowLeft />
                            Back to Login
                            </div>
                            </Link>
                        </div> )
                    }
                </div>
            )
        }
    
        </div>
    
    </div>
  )
}

export default ForgotPassword