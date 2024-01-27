import React, { useState ,useEffect} from 'react'
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { signUp } from '../services/operations/authApiControllers';
const VerifyEmail = () => {
    const [otp , setOtp]=useState("")
    const { signupData, loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Only allow access of this route when user has filled the signup form
        if (!signupData) {
          navigate("/signup");
        }
      }, []);
    
    const submitOtp =(e)=>{
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
    <div className='text-white'>
        <div>
            <h1>Verify email</h1>
            <p>A verification code has been sent to you. Enter the code below</p>
        </div>
            <form onSubmit={submitOtp}>
        <OtpInput
      value={otp}
      onChange={setOtp}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} className='text-richblack-800'/>}
    />  
     <button type='submit'>
    Verify And Register
    </button> 
</form>
    <div>
        <Link to={"/login"}>
        Back to Login
        </Link>

        <Link>
        Resend It
        </Link>
    </div>
    </div>
  )
}

export default VerifyEmail