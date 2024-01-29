import {apiconnector} from "../apiconnector"
import { setLoading } from "../../Slices/authSlice"
import { setToken } from "../../Slices/authSlice"
import { setUser } from "../../Slices/profileSlice"
import { toast } from "react-hot-toast"
import { endpoints } from "../apis"
import { setEmailSent } from "../../Slices/authSlice"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,

} = endpoints

export function sendOtp (email , navigate){
    return async(dispatch)=>{
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",SENDOTP_API,{email ,checkUserPresent :true})
            console.log("SENDOTP API....",response);

            console.log(response.data.success);
            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("OTP Sent Successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR....",error);
            toast.error("Could Not send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
  }

export function signUp(
    accountType,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    otp,
    navigate
        ){
            return async (dispatch)=>{
                const toastId = toast.loading("...Loading")
                dispatch(setLoading(true))
                try {
                    const response = await apiconnector("POST",SIGNUP_API,{
                        accountType,
                        firstName,
                        lastName,
                        email,
                        password,
                        confirmPassword,
                        otp,
                    })
                    console.log("Sign Up API respose ....",response);

                    if (!response.data.success) {
                        throw new Error(response.data.message)
                    }

                    toast.success("Sign Up Successfully");
                    navigate("/login")

                } catch (error) {
                    console.log("Gettong error in SignUp api handler",error);
                    toast.error("Can not complete the signup")
                    navigate("/signup")
                }
                dispatch(setLoading(false))
                toast.dismiss(toastId)
            }
        }

export function login(email, password, navigate) {

    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
           
          const response = await apiconnector("POST", LOGIN_API, {
            email,
            password,
          })
    
          console.log("LOGIN API RESPONSE............", response)
    
          if (!response.data.success) {
            throw new Error(response.data.message)
          }
    
          toast.success("Login Successful")
          dispatch(setToken(response.data.token))
          const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`
          dispatch(setUser({ ...response.data.user, image: userImage }))
          
          localStorage.setItem("token", JSON.stringify(response.data.token))
          localStorage.setItem("user", JSON.stringify(response.data.user))
          navigate("/dashboard/my-profile")
        } catch (error) {
          console.log("LOGIN API ERROR............", error)
          toast.error("Login Failed")
        }

        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function forgotPasswordToken(email){
    return async(dispatch)=>{
        dispatch(setEmailSent(false))
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const result = await apiconnector("POST",RESETPASSTOKEN_API,{
                email
            })
            console.log("email sent successfully->",result);
            console.log(result.data.success);
            if (!result.data.success) {
                throw new Error(result.data.message)
            }
            toast.success("OTP Sent Successfully")
            dispatch(setEmailSent(true))
        } catch (error) {
            console.log("SendEmail API ERROR....",error);
            toast.error("Could Not send Email")
        }        
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function resetPassword(password,confirmPassword,token,setResetComplete){
   return async(dispatch)=>{
        const toastId = toast.loading("Loading....")
        dispatch(setLoading(true));
        try {
            const response = await apiconnector("POST",RESETPASSWORD_API,{
                token,password,confirmPassword
            })
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Password Updated Successfully")
            setResetComplete(true);
        } catch (error) {
            console.log("Resetpassword API ERROR....",error);
            toast.error("Could Not Reset the Password")
        }
         dispatch(setLoading(false))
        toast.dismiss(toastId)
       
    }
}

export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        // dispatch(resetCart())
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}