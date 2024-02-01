import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Core/Dashboard.jsx/Sidebar'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const{loading :authLoading}= useSelector((state)=>state.auth);
    const {loading :profileLoading}=useSelector((state)=>state.profile);
  return (
    <div className='flex '>
        <div className='lg:w-[30%] h-[calc(100vh-3.5rem)]  bg-richblack-800'>
            <Sidebar/>
        </div>
        <div className='lg:w-[70%] h-[calc(100vh-3.5rem)] '>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard