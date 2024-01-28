import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    signupData:null,
    loading:false,
    emailSent:false,
    token:localStorage.getItem("token") ? localStorage.getItem("token") : null, 
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialStates,
    reducers:{
        setToken(state ,value){
            console.log("token is -->",state.token);
            state.token=value.payload
        },
        setLoading(state,value){
            state.loading=value.payload
        },
        setSignUpData(state,value){
            state.signupData=value.payload
        },
        setEmailSent(state, value){
            state.emailSent=value.payload
        }
    }
})

export const {setToken , setLoading ,setSignUpData, setEmailSent} = authSlice.actions;
export default authSlice.reducer;