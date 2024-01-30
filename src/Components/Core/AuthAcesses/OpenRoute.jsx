import React, { Children } from 'react'
import { useSelector} from 'react-redux'
import { Navigate } from 'react-router-dom'
const OpenRoute = () => {
    const {token}=useSelector((state)=>state.auth)
    
    if (token==null) {
        return Children
    }else{
        return <Navigate to="/dashboard/my-profile"></Navigate>
    }
}

export default OpenRoute