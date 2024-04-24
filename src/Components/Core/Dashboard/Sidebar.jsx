import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {sidebarLinks} from "../../../data/dashboard-links"
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authApiControllers';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModal from '../../Common/ConfirmationModal';
import Spinnner from '../../Common/Spinnner';
const Sidebar = () => {
    const{loading :authLoading}= useSelector((state)=>state.auth);
    const {user,loading :profileLoading}=useSelector((state)=>state.profile);
    const dispatch = useDispatch()
    const navigate= useNavigate()

    const [confirmationModal, setConfimationModal]=useState();
    if(authLoading || profileLoading){
        return (
            <div>
              <Spinnner/>
            </div>
        )
    }

  return (
    <div className='flex md:h-[calc(100vh-3.5rem)] min-w-[220px] mx-[10px] flex-col md:flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
        <div className=' flex md:flex-col min-w-[200px]  md:gap-0 flex-row w-[100%] md:w-auto '>
            {
                sidebarLinks.map((link)=>{
                  if(link.type && user?.accountType != link.type) return null
                  return(
                  <SidebarLink key={link.id} icon={link.icon} data={link} />  
                  )
                })
            }
            </div>
            <div className=' hidden md:block border mx-5 border-b-1 md:mt-20 border-richblack-300'>
            </div>
            <div className='flex md:flex-col flex-row md:mt-8'>
              <SidebarLink data={{ name: "Settings", path: "/dashboard/settings" }}
              icon="VscSettingsGear"/>
              <button  
              onClick={()=>{
                setConfimationModal({
                  text1 : "Are you sure?",
                  text2 : "You will be logged out of your account.",
                  btn1Text:"Logout",
                  btn2Text:"Cancel",
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
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
       
        </div>
  )
}

// more comment added lol

export default Sidebar