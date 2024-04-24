import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../../../services/operations/authApiControllers"
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const {email, password } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }
    const submitform = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))

        console.log("form data is -->", formData);
    }
    return (

        <>
        
          <div>

            <form className='text-richblack-5 relative flex flex-col gap-4' onSubmit={submitform}>
            
                {/* email form */}
                <div className=''>
                    <p className='-mb-1 ml-2'>Email Address<sup className='text-pink-200 '>*</sup> </p> <br />
                    <input type="text" id='firstName' name='email' value={email} onChange={handleOnChange} placeholder='Enter Email adress' className='bg-richblack-800 rounded-lg p-[12px] md:w-[440px]' />
                </div>
                {/* password */}

                <div>
                    <p className=''> Password<sup className='text-pink-200 '>*</sup> </p> <br />
                    <div className='bg-richblack-800 rounded-lg p-[12px] w-[200px] md:w-[440px] flex  items-center'>
                        <input type={`${showPassword ? "text" : "password"}`} id='' onChange={handleOnChange} name='password' value={password} placeholder='Enter Password' className='bg-richblack-800 md:w-[100%] ' />
                        {
                            showPassword ? (<div><FaRegEye className='text-richblack-100' onClick={() => setShowPassword(false)} /></div>) : (<div onClick={() => setShowPassword(true)}><FaRegEyeSlash className='text-richblack-100' /> </div>)
                        }
                    </div>
                </div>
                <div className='absolute right-0 bottom-14'>
                    <Link to={"/forgot-password"}>
                        <div className=' text-blue-400'>
                          Forgot Password ?    
                        </div>
                    </Link >
                </div>
                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 w-[100%] py-[8px] px-[12px] font-medium text-richblack-900"
                >
                    Log In
                </button>
            </form>
            
        </div>
        </>
      
    )
}




export default LoginForm;

