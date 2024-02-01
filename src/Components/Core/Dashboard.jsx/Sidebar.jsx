import React from 'react'
import { useSelector } from 'react-redux'

import {sidebarLinks} from "../../../data/dashboard-links"
import SidebarLinks from './SidebarLinks';
const Sidebar = () => {
    const{user,loading :authLoading}= useSelector((state)=>state.auth);
    const {loading :profileLoading}=useSelector((state)=>state.profile);

    if(authLoading || profileLoading){
        return (
            <div>Loading.....</div>
        )
    }

  return (
    <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
        <div>
            {
                sidebarLinks.map((link)=>{
                  <SidebarLinks data={link} />  
                })
            }
            
        </div>
    </div>
  )
}

// more comment added lol

export default Sidebar