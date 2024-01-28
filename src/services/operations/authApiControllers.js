import {apiconnector} from "../apiconnector"
import { setLoading } from "../../Slices/authSlice"
import { setToken } from "../../Slices/authSlice"
import { setUser } from "../../Slices/profileSlice"
import { toast } from "react-hot-toast"
import { endpoints } from "../apis"
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
            navigate("/login")
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
                    navigate("/verify-otp")

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