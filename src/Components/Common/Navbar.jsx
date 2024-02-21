import React, { useEffect, useState } from 'react'
import { matchPath, Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from "../../data/navbar-links.js"
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";
import ProfileDropdown from '../Core/AuthPage/ProfileDropdown.jsx';
import { apiconnector } from '../../services/apiconnector.js';
import { categories } from '../../services/apis.js';
import { IoIosArrowDown } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants.js"
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai"

const Navbar = () => {
  let location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [subLinks, setSubLinks] = useState([]);
  const [openButton , setOpenButton]= useState(true)
  const fetchSublinks = async () => {
    try {
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      console.log("subliks are -->", result.data.allCategories);
      setSubLinks(result.data.allCategories)
    } catch (error) {
      console.log("could not fetch the category data");
    }
  }

  useEffect(() => {

    fetchSublinks()

  }, [])



  const matchRoute = (route) => {
    // console.log("local token -->", localStorage.getItem("token"));
    return matchPath(
      { path: route }, location.pathname
    )
  }
  // console.log("Navbar Links -->",NavbarLinks);
  return (

    <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700  z-[300]'>
      <div className='flex w-11/12 max-w-maxContent items-center justify-between z-[400]'>
        {/* image section */}
        <Link to={"/"}>
          <img src={logo} alt="" width={160} height={42} loading='lazy' />
        </Link>

        {/* nav links */}
        <nav className=' h-auto'>
          <ul className={` ${openButton ? " block":"hidden"} flex flex-col w-[250px] h-[250px] nav-ul z-0 top-20 right-2 p-2 rounded-md overflow-hidden bg-white gap-x-6 text-richblack-25 md:h-auto  md:top-0 md:overflow-hidden md:flex-row md:bg-richblack-900 md:w-auto`}>
          {/* <ul className='flex gap-x-6  text-richblack-25'> */}
            {
              NavbarLinks.map((link, i) => {
                // console.log("link-->",link.title);
                return <li key={i}>
                  {
                    link.title == "Catalog" ? (
                      <div className='  flex items-center gap-1 group hover:cursor-pointer'>
                        <p>{link.title}</p>
                        <IoIosArrowDown />
                        <div className=' opacity-0 invisible group-hover:visible group-hover:opacity-100  transition-all duration-200'>
                        <div className='absolute  top-4 translate-x-[95%] translate-y-[80%] h-6 w-6 rotate-45 rounded bg-richblack-5 md:left-[45.2%] md:top-4 md:translate-x-[95%] md:translate-y-[80%]'></div>
                          <div className=' absolute top-[5%]  catalog-dropdown translate-x-[-40%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900  lg:w-[300px] md:top-[5%] md:translate-x-[-40%]'>
                            {
                              subLinks.length ? (
                                subLinks?.map((subLink, index) => {
                                  return <Link
                                    key={index}
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}>
                                    <p className='text-richblack-900'> {subLink.name}</p>
                                  </Link>
                                })
                              ) : (<div>Nothing Here</div>)
                            }
                          </div>
                        </div>
                      </div>) : (
                      <div>
                        <Link to={link.path}>
                          <p className={`${matchRoute(link.path) ? " text-yellow-25" : " text-richblack-25"}`}> {link.title} </p>
                        </Link>
                  
                      </div>
                    )
                  }
      
                </li>
              })
            }
            <li>
            {
                token == null &&(
                  <div className=' md:hidden'>
                  <Link to="/signup">
                  <p className={``}>Signup </p>
                  </Link>
                  <Link to="/login">
                  <p className={``}>Login </p>
                  </Link>
                  </div>
                )
              }
            
            </li>
            <li>
            {token !== null && <div className=' md:hidden'>
              <Link to="/dashboard/my-profile">
              Dashboard
              </Link>
          </div>}
            </li>
          </ul>
        </nav>


        <div className=' flex items-center gap-x-2'>
        <div className='hidden md:flex gap-x-5  '>
            {token === null && (
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            )}
          </div>
         <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF"  onClick={()=> setOpenButton(!openButton)}/>
        </button> 
        {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute bottom-0 right-0 z-[999] grid h-3 w-3 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )} 
          {token !== null && <div className=' hidden md:block'>
            <ProfileDropdown />
          </div>}
        </div>     
    
      </div>
    </div>
  )
}

export default Navbar