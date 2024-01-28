import {React, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { forgotPasswordToken } from '../services/operations/authApiControllers';

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
    <div className=' text-richblack-5'>
        {
            loading ? ( <div>Loading......</div> ):(
                <div>
                    {
                        emailSent ? ( <div>
                        <h1>Check email</h1>
                        <p>We have sent the reset email to {email}</p>
                        <button onClick={onSubmitHandler}>Resend Email</button>
                        <Link to={"/login"}>
                        Back to Login
                        </Link>
                        </div> ):(
                            <div>
                            <h1>Reset your password</h1>
                            <p>Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
                
                            <form onSubmit={onSubmitHandler}>
                                <label htmlFor="">Email Address </label>
                                <input type="email" name="email" id="" className='text-richblack-800' onChange={
                                    (e)=>{setEmail(e.target.value)}
                                } value={email}/>
                                <button type='submit'>Reset Password</button>
                            </form>
                            <Link>
                            Back to Login
                            </Link>
                        </div> )
                    }
                </div>
            )
        }
    
    </div>
  )
}

export default ForgotPassword