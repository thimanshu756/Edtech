import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    token:localStorage.getItem("token") ? localStorage.getItem("token") : null, 
}

const authSlice = createSlice({
    name:"auth",
    initialState:initialStates,
    reducers:{
        setToken(state ,value){
            console.log("token is -->",state.token);
            state.token=value.payload
        }
    }
})

export const {setToken} = authSlice.actions;
export default authSlice.reducer;