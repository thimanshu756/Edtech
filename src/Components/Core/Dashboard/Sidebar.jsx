import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {sidebarLinks} from "../../../data/dashboard-links"
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authApiControllers';
import { VscSignOut } from 'react-icons/vsc';

const Sidebar = () => {
    const{loading :authLoading}= useSelector((state)=>state.auth);
    const {user,loading :profileLoading}=useSelector((state)=>state.profile);
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const [confirmationModal, setConfimationModal]=useState();
    if(authLoading || profileLoading){
        return (
            <div>Loading.....</div>
        )
    }

  return (
    <div className='flex h-[calc(100vh-3.5rem)] min-w-[220px] mx-[10px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
        <div className=' flex flex-col '>
            {
                sidebarLinks.map((link)=>{
                  if(link.type && user?.accountType != link.type) return null
                  return(
                  <SidebarLink key={link.id} icon={link.icon} data={link} />  
                  )
                })
            }
            </div>
            <div className=' border mx-5 border-b-1 mt-20 border-richblack-300'>
            </div>
            <div className='flex flex-col mt-8'>
              <SidebarLink data={{ name: "Settings", path: "/dashboard/settings" }}
              icon="VscSettingsGear"/>

              <button  
              onClick={()=>{
                setConfimationModal({
                  text1 : "Are you sure?",
                  text2 : "You will be logged out of your account.",
                  bt1Text:"Logout",
                  bt2Text:"Cancel",
                  btn1Handler: ()=> dispatch(logout(navigate)),
                  btn2Handler :()=> setConfimationModal(null)
                })
              }}
              className='px-8 py-2 text-sm font-medium text-richblack-300 '
              >
                <div className=' flex items-center gap-x-2'>
                <VscSignOut className='text-lg'/>
                <span>Logout</span>
                </div>
              </button>
            </div>

       
        </div>
  )
}

// more comment added lol

export default Sidebar