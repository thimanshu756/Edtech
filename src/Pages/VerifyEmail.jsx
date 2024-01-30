import React, { useState, useEffect } from 'react'
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GoArrowLeft } from "react-icons/go";
import { GiBackwardTime } from "react-icons/gi";

import { signUp } from '../services/operations/authApiControllers';
const VerifyEmail = () => {
  const [otp, setOtp] = useState("")
  const { signupData, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Only allow access of this route when user has filled the signup form
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const submitOtp = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;
    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );

  }
  return (
    <div className='text-white h-[100vh] w-auto  flex flex-col justify-center items-center'>
      <div  className=' p-8'>
      <div className=' '>
        <h1 className=" text-2xl mb-3">Verify email</h1>
        <p className=' text-sm font-inter text-richblack-100 w-[320px]'>A verification code has been sent to you.  Enter the code below</p>
      </div>
      <div>
        <form onSubmit={submitOtp}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span style={{ width: "8px" }}></span>}
            containerStyle="h-[100px]  "
            inputStyle={{
              border: "1px solid transparent",
              borderRadius: "8px",
              width: "44px",
              height: "54px",
              fontSize: "20px",
              color: "richblack-5",
              fontWeight: "400",
              caretColor: "white"
            }}
            renderInput={(props) => <input {...props} className='text-richblack-5 bg-richblack-700 h-7' />}

          />
          <button type='submit' className='lg:w-[309px] md:w-[309px] sm:w-[300px] xs:w-[300px] xxs:w-[300px] bg-yellow-50 rounded-md p-[12px] text-richblack-900'>
            Verify And Register
          </button>
        </form>
      </div>

      <div className='flex lg:gap-[100px] md:gap-[100px] sm:gap-[100px] xs:gap-[80px] xxs:gap-[70px] mt-5'>
        <Link to={"/login"}>
          <div className='flex items-center gap-2'>
            <GoArrowLeft />
            Back to Login
          </div>
        </Link>

        <Link>
          <div className='flex items-center gap-2 text-blue-300'>
            <GiBackwardTime />
            Resend It
          </div>
        </Link>


      </div>
      </div>
      
    </div>
  )
}

export default VerifyEmail