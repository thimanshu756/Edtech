import React from 'react'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import * as Icons from "react-icons/vsc"

const SidebarLink = ({data,icon}) => {
  const location = useLocation();
  const dispatch= useDispatch();
  const Icon = Icons[icon]
  const routeMatch=(route)=>{
    return matchPath({path:route},location.pathname)
  }
  return (
    <NavLink to={data.path}
    className={`relative px-8 py-2 text-sm font-medium ${
      routeMatch(data.path) ? " bg-yellow-400 text-yellow-50":"bg-opacity-0 text-richblack-300" 
    } transition-all duration-200`}
     >
        <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${
          routeMatch(data.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
        <div className=' bg-opacity-0 flex items-center gap-x-2'>
      <Icon className="text-lg" />
      <span>{data.name}</span>
        </div>
    </NavLink>
  )
}

export default SidebarLink