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
    <div className='text-white'>
        {
            loading ? ( <div>Loading.....</div> ):(
                resetComplete ?(<div>
                    <h1>Reset complete!</h1>
                    <p>All done! You have successfully updated your password</p>
                    <button>Return To Login</button>
                    <Link to={"login"}>
                    Back to Login
                    </Link>
                </div>):(<div>
                    <h1>Choose new password</h1>
                    <p>Almost done. Enter your new password and youre all set.</p>
                    <form onSubmit={submitPasswordHandler}>
                       <p>New password</p>
                       <div className='bg-richblack-800 rounded-lg p-[12px] w-[440px ] flex  items-center'>
                        <input type={`${showPassword ? "text" : "password"}`} id='' onChange={handleOnChange} name='password' value={password} placeholder='Enter Password' className='bg-richblack-800 w-[100%] ' />
                        {
                            showPassword ? (<div><FaRegEye className='text-richblack-100' onClick={() => setShowPassword(false)} /></div>) : (<div onClick={() => setShowPassword(true)}><FaRegEyeSlash className='text-richblack-100' /> </div>)
                        }
                    </div>
                    <div className='bg-richblack-800 rounded-lg p-[12px] w-[440px ] flex  items-center'>
                        <input type={`${showPassword ? "text" : "password"}`} id='' onChange={handleOnChange} name='confirmPassword' value={confirmPassword} placeholder='Confirm Password' className='bg-richblack-800 w-[100%] ' />
                        {
                            showPassword ? (<div><FaRegEye className='text-richblack-100' onClick={() => setShowPassword(false)} /></div>) : (<div onClick={() => setShowPassword(true)}><FaRegEyeSlash className='text-richblack-100' /> </div>)
                        }
                    </div>
                    <button type='submit'>Reset Password</button>
                    </form>
                </div>)
            )
        }
    </div>
  )
}

export default UpdatePassword