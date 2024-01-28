import React, { useEffect, useState } from 'react'
import { matchPath , Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links.js"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropdown from '../Core/AuthPage/ProfileDropdown.jsx';
import { apiconnector } from '../../services/apiconnector.js';
import { categories } from '../../services/apis.js';
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
 let location=useLocation();
 const {token} = useSelector((state)=>state.auth);
 const {user} = useSelector((state)=>state.profile);
 const {totalItems} = useSelector((state)=>state.cart);

 const[subLinks, setSubLinks]=useState([]);
  
 const fetchSublinks = async()=>{
    try {
      const result = await apiconnector("GET",categories.CATEGORIES_API);
      // console.log("subliks are -->", result);
      setSubLinks(result.data.data)
    } catch (error) {
      console.log("could not fetch the category data");
    }
 }

    useEffect(()=>{
       
      fetchSublinks()

    },[])

const subLinkss =[
  {
    title:"Python",
    link:"/catalog/python"
  },
  {
    title:"C PlusPlus",
    link:"/catalog/Cpp"
  }
]

  const matchRoute = (route)=>{
    // console.log("local token -->", localStorage.getItem("token"));
    return matchPath(
      {path:route},location.pathname
    )
  } 
  // console.log("Navbar Links -->",NavbarLinks);
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
            // console.log("link-->",link.title);
          return  <li key={i}>
              {
                link.title == "Catalog" ? ( <div className='  flex items-center gap-1 group hover:cursor-pointer'>
                  <p>{link.title}</p> 
                  <IoIosArrowDown />
                  {/* className=' invisible absolute left-[40%] top-[10%] -translate-y-8 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]' */}
                  {/* className=' invisible absolute top-[5%] translate-x-[-40%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100' */}
                  <div className='opacity-0 invisible group-hover:visible group-hover:opacity-100  transition-all duration-200'>
                  <div className='absolute left-[45.2%] top-4 translate-x-[95%] translate-y-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5'></div>
                  <div  className='  absolute top-[5%] translate-x-[-40%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900  lg:w-[300px] '>
                  
               {
                subLinkss.length ? ( 
                    subLinkss?.map((subLink , index)=>{
                     return <Link to={`${subLink.link}`} key={index}>
                      <p className='text-richblack-900'> {subLink.title}</p>
                      </Link>
                    })
  
                 ):( <div>Nothing Here</div> )
               }
                  </div>
                  </div>
                  
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