import React, { useState } from 'react'
import { matchPath , Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links.js"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropdown from '../Core/AuthPage/ProfileDropdown.jsx';

const Navbar = () => {
 let location=useLocation();
 const {token} = useSelector((state)=>state.auth);
 const {user} = useSelector((state)=>state.profile);
 const {totalItems} = useSelector((state)=>state.cart);

  const matchRoute = (route)=>{
    console.log("local token -->", localStorage.getItem("token"));
    return matchPath(
      {path:route},location.pathname
    )
  } 
  console.log("Navbar Links -->",NavbarLinks);
  return (
    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 '>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
      {/* image section */}
      <Link to={"/"}>
        <img src={logo} alt="" width={160} height={42} loading='lazy' />
      </Link>

      {/* nav links */}
      <nav>
        <ul className='flex gap-6 text-richblack-25'>
        {
          NavbarLinks.map((link,i)=>{
            console.log("link-->",link.title);
          return  <li key={i}>
              {
                link.title == "Catalog" ? ( <div>
                  
                </div> ):(
                  <div>
                      <Link to={link.path}>
                  <p className={`${matchRoute(link.path) ? " text-yellow-25":" text-richblack-25"}`}> {link.title} </p>
                  </Link>
                  </div>
                
                )
              }
            </li>
          })
        }
        </ul>
      </nav>
      {/* login signup button */}
      <div className='flex gap-x-4 items-center '>
        {
          user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className='relative'>
             <FaShoppingCart />
              {
                totalItems >0 && (
                  <span>
                    {totalItems}
                  </span>
                )
              }
            </Link>
          )
        }
        {
          token == null && (
            <Link to="/login">
            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
              Login
            </button>
            </Link>
          )
        }
            {
          token == null && (
            <Link to="/signup">
            <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md '>
              Sign Up
            </button>
            </Link>
          )
        }
        {
          token != null && <ProfileDropdown />
        }
      </div>
      </div>
    </div>
  )
}

export default Navbar