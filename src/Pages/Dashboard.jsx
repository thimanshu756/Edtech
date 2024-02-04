import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Core/Dashboard/Sidebar'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const{loading :authLoading}= useSelector((state)=>state.auth);
    const {loading :profileLoading}=useSelector((state)=>state.profile);

    if(authLoading || profileLoading){
      return (
          <div>Loading.....</div>
      )
  }
  return (
    <div className='flex '>
        <div className='lg:w-[20%] h-[calc(100vh-3.5rem)]  bg-richblack-800'>
            <Sidebar/>
        </div>
        <div className='lg:w-[70%] h-[calc(100vh-3.5rem)] '>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard