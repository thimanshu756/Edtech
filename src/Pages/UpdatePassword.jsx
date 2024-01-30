import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { resetPassword } from '../services/operations/authApiControllers';

const UpdatePassword = () => {
    const {loading}= useSelector((state)=>state.auth);
    const[resetComplete , setResetComplete]=useState(false);
    const [showPassword , setShowPassword]=useState(false)
    const [formData , setFormData]=useState({password:"",confirmPassword:""});
    const {password, confirmPassword } = formData
    const location= useLocation();
    const dispatch = useDispatch()
    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }
    const submitPasswordHandler = (e)=>{
        e.preventDefault();
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password,confirmPassword,token,setResetComplete))
    }
  return (
    <div className='text-white h-[100vh] w-auto  flex flex-col justify-center items-center gap-9'>
        {
            loading ? ( <div>Loading.....</div> ):(
                resetComplete ?(
                <div className='flex gap-5 flex-col'>
                    <h1 className=" text-2xl">Reset complete!</h1>
                    <p className=' text-sm font-inter text-richblack-100 w-[320px]'>All done! You have successfully updated your password</p>
                    <Link to={"login"}>
                    <button className='  lg:w-[309px] md:w-[309px] sm:w-[300px] xs:w-[300px] xxs:w-[300px] bg-yellow-50 rounded-md p-[8px] text-richblack-900'>Return To Login</button>
                    </Link>
                </div>):(
                <div className='flex gap-5 flex-col'>
                    <h1 className=" text-2xl ">Choose new password</h1>
                    <p className=' text-sm font-inter text-richblack-100 w-[320px]'>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={submitPasswordHandler} className='flex flex-col gap-4'>
                       <p>New password</p>
                       <div className='bg-richblack-800 rounded-lg p-[12px] w-[440px ] flex  items-center   lg:w-[309px] md:w-[309px] sm:w-[300px] xs:w-[300px] xxs:w-[300px]'>
                        <input type={`${showPassword ? "text" : "password"}`} id='' onChange={handleOnChange} name='password' value={password} placeholder='Enter Password' className='bg-richblack-800 w-[100%] ' />
                        {
                            showPassword ? (<div><FaRegEye className='text-richblack-100' onClick={() => setShowPassword(false)} /></div>) : (<div onClick={() => setShowPassword(true)}><FaRegEyeSlash className='text-richblack-100' /> </div>)
                        }
                        </div>
                    <p>Confirm password</p>
                    <div className='bg-richblack-800 rounded-lg p-[12px] w-[440px ] flex   lg:w-[309px] md:w-[309px] sm:w-[300px] xs:w-[300px] xxs:w-[300px] items-center'>
                        <input type={`${showPassword ? "text" : "password"}`} id='' onChange={handleOnChange} name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' className='bg-richblack-800 w-[100%] ' />
                        {
                            showPassword ? (<div><FaRegEye className='text-richblack-100' onClick={() => setShowPassword(false)} /></div>) : (<div onClick={() => setShowPassword(true)}><FaRegEyeSlash className='text-richblack-100' /> </div>)
                        }
                    </div>
                    <button type='submit' className='  lg:w-[309px] md:w-[309px] sm:w-[300px] xs:w-[300px] xxs:w-[300px] bg-yellow-50 rounded-md p-[8px] text-richblack-900'>Reset Password</button>
                    </form>
                </div>)
            )
        }
    </div>
  )
}

export default UpdatePassword