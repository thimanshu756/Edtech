import React from 'react'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
 import { useState } from 'react';
 import Button from "../HomePage/Button"
const Form = ({type, Instructor}) => {
    const [showPassword , setShowPassword]=useState(false);
    const [formData , setFormData]=useState({
        firstName :"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })
    const { firstName, lastName, email, password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
      }

      const submitform =(e)=>{
        e.preventDefault()
        console.log("form data is -->",formData);
      }
  return (
    <div>
        {
            type =="signUp" ? (
                <form className='text-richblack-5' onSubmit={submitform}>
                <div className='flex gap-10 mb-4'>
                <div>
                <p className='-mb-2 ml-2'>First Name<sup className='text-pink-200 '>*</sup> </p> <br />
                <input type="text" id='firstName' name='firstName' value={firstName} onChange={handleOnChange} placeholder='Enter First Name' className='bg-richblack-800 rounded-lg p-[12px] w-[200px]'/> 
                </div>
                <div>
                  <p className='-mb-2 ml-2'>Last Name <sup className='text-pink-200 '>*</sup> </p> <br />
                  <input type="text" id='lastName' name='lastName' value={lastName} onChange={handleOnChange} placeholder='Enter Last Name' className='bg-richblack-800 rounded-lg p-[12px] w-[200px]'/>
                </div>
                </div>
                {/* email form */}
                <div className='mb-4'>
                <p className='-mb-1 ml-2'>Email Address<sup className='text-pink-200 '>*</sup> </p> <br />
                <input type="text" id='firstName' name='email' value={email}  onChange={handleOnChange} placeholder='Enter Email adress' className='bg-richblack-800 rounded-lg p-[12px] w-[440px]'/> 
                </div>
                {/* password */}
                <div className='flex gap-10 mb-4'>
                <div>
                <p className='-mb-2 ml-2'>Create Password<sup className='text-pink-200 '>*</sup> </p> <br />
                <div className='bg-richblack-800 rounded-lg p-[12px] w-[200px] flex  items-center'>
                <input type={`${showPassword ? "text" :"password"}`} id=''  onChange={handleOnChange} name='password' value={password} placeholder='Enter Password'className='bg-richblack-800 ' />  
                {
                    showPassword ? ( <div><FaRegEye className='text-richblack-100' onClick={()=>setShowPassword(false)}/></div> ):( <div  onClick={()=>setShowPassword(true)}><FaRegEyeSlash className='text-richblack-100'/> </div> )
                }
                </div>
                </div>
                <div>
                <p className='-mb-2 ml-2'>Confirm Password<sup className='text-pink-200 '>*</sup> </p> <br />
                <div className='bg-richblack-800 rounded-lg p-[12px] w-[200px] flex  items-center'>
                <input type={`${showPassword ? "text" :"password"}`} id=''  onChange={handleOnChange} name='confirmPassword' value={confirmPassword} placeholder='Confirm Password'className='bg-richblack-800 ' />  
                {
                    showPassword ? ( <div><FaRegEye className='text-richblack-100' onClick={()=>setShowPassword(false)}/></div> ):( <div  onClick={()=>setShowPassword(true)}><FaRegEyeSlash className='text-richblack-100'/> </div> )
                }
                </div>
                </div>
                </div>
                <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 w-[100%] py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
        </form>
            ):( <div>
        <form className='text-richblack-5' onSubmit={submitform}>
                <div className='flex gap-10 mb-4'>
              
               
                </div>
                {/* email form */}
                <div className='mb-4'>
                <p className='-mb-1 ml-2'>Email Address<sup className='text-pink-200 '>*</sup> </p> <br />
                <input type="text" id='firstName' name='email' value={email}  onChange={handleOnChange} placeholder='Enter Email adress' className='bg-richblack-800 rounded-lg p-[12px] w-[440px]'/> 
                </div>
                {/* password */}
                
                <div>
                <p className='-mb-2 ml-2'> Password<sup className='text-pink-200 '>*</sup> </p> <br />
                <div className='bg-richblack-800 rounded-lg p-[12px] w-[440px ] flex  items-center'>
                <input type={`${showPassword ? "text" :"password"}`} id=''  onChange={handleOnChange} name='password' value={password} placeholder='Enter Password'className='bg-richblack-800 w-[100%] ' />  
                {
                    showPassword ? ( <div><FaRegEye className='text-richblack-100' onClick={()=>setShowPassword(false)}/></div> ):( <div  onClick={()=>setShowPassword(true)}><FaRegEyeSlash className='text-richblack-100'/> </div> )
                }
                </div>
                </div>
                <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 w-[100%] py-[8px] px-[12px] font-medium text-richblack-900"
        >
         Sign In
        </button>
        </form>
            </div>)
        }

    </div>
  )
}

export default Form

