import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Core/Dashboard/Sidebar'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const{loading :authLoading}= useSelector((state)=>state.auth);
    const {loading :profileLoading}=useSelector((state)=>state.profile);

    if(authLoading || profileLoading){
      return (
          <div className='spinner'></div>
      )
  }
  return (
    <div className='flex flex-col md:flex-row'>
        <div className=' w-[100%] md:block md:w-[20%] md:h-[calc(100vh-3.5rem)]  bg-richblack-800'>
            <Sidebar/>
        </div>
        <div className='md:w-[80%]  h-[calc(100vh-3.5rem)] '>
            <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard