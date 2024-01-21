import React from 'react'
import lightLogo from '../../assets/Logo/Logo-Full-Light.png'
import { Link } from 'react-router-dom'
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className='w-[11/12] bg-richblack-800 py-[52px] px-[120px]'> 
    <div className='flex flex-row gap-16 mb-5'>
        {/* 1st section */}
    <div className='flex flex-col gap-4'>
            <img src={lightLogo} alt="" />
            <div className='text-xl text-richblack-100'>Company</div>
            <div className='text-richblack-400'> <Link  to={"/"}> About </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Careers </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Affiliates </Link> </div>
            {/* icons */}
            <div className='flex flex-row gap-4 text-richblack-400 '>
          <Link to={"/"}> <FaFacebook className='w-[24px] h-[24px]'/> </Link>
            <Link to={"/"}> <FaGoogle className='w-[24px] h-[24px]'/> </Link>
            <Link to={"/"}> <FaXTwitter className='w-[24px] h-[24px]'/> </Link>
            <Link to={"/"}> <FaYoutube className='w-[24px] h-[24px]'/> </Link>
            </div>
    </div>
    {/* second section */}
    <div className='flex flex-col gap-8' >   
        <div className='flex flex-col gap-4'>
            <div className='text-xl text-richblack-100'>Company</div>
            <div className='text-richblack-400'> <Link  to={"/"}> Articles </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Blog </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Chart Sheet </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Docs </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Projects </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Videos </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Workspaces </Link> </div>
        </div>
        <div className='flex flex-col gap-4'>
        <div className='text-xl text-richblack-100'>Support</div>
        <div className='text-richblack-400'> <Link  to={"/"}> Help Center </Link> </div>
        </div>
    </div>
    {/* Third section */}
    <div className='flex flex-col gap-8' >   
        <div className='flex flex-col gap-4'>
            <div className='text-xl text-richblack-100'>Plans</div>
            <div className='text-richblack-400'> <Link  to={"/"}> Paid memberships</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> For students </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Business solutions</Link>  </div>
        </div>
        <div className='flex flex-col gap-4'>
        <div className='text-xl text-richblack-100'>Community</div>
        <div className='text-richblack-400'> <Link  to={"/"}> Forums</Link> </div>
        <div className='text-richblack-400'> <Link  to={"/"}> Chapters</Link> </div>
        <div className='text-richblack-400'> <Link to={"/"}>Events</Link> </div>
        </div>
    </div>
    {/* Border  */}
    <div className='border border-richblack-600'></div>
    {/* 4rd section */}
    <div className='flex flex-col gap-8' >   
        <div className='flex flex-col gap-4'>
            <div className='text-xl text-richblack-100'>Subjects</div>
            <div className='text-richblack-400'> <Link  to={"/"}> AI</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Cloud Computing</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Code Foundations</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Computer Science</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Cybersecurity</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Data Analytics</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Data Science</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Data Visualization</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Developer Tools</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}>DevOps</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Game Development</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>IT</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Machine Learning</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Math</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Developer Tools</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Web Design</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Web Development</Link> </div>        </div>
    
    </div>
    {/* 5th section */}
    <div className='flex flex-col gap-8' >   
        <div className='flex flex-col gap-4'>
            <div className='text-xl text-richblack-100'>Languages</div>
            <div className='text-richblack-400'> <Link  to={"/"}> Bash</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> C</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>C++</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}>C#</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Go</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>HTML & CSS</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Java</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>JavaScript</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Kotlin</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}>PHP</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Python</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>R</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}> Ruby</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}> SQL</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Swift</Link>  </div>
     </div>
    
    </div>
    {/* 6th section */}
    <div className='flex flex-col gap-8' >   
        <div className='flex flex-col gap-4'>
            <div className='text-xl text-richblack-100'>Career building</div>
            <div className='text-richblack-400'> <Link  to={"/"}> Career paths</Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Career services </Link> </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Interview prep</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Professional certification</Link>  </div>
            <div className='text-richblack-400'> - </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Full Catalog</Link>  </div>
            <div className='text-richblack-400'> <Link  to={"/"}>Beta Content</Link>  </div>
        </div>
    </div>
    </div>
    {/* single line */}
    <div className='w-full border border-richblack-600'></div>
 {/*privacy section   */}
    <div className='flex justify-between mt-7'>
        <div className='flex gap-7'>
    <div className='text-richblack-400'> <Link  to={"/"}> Privacy Policy </Link> </div>
    <div className='text-richblack-400'> <Link  to={"/"}> Cookie Policy </Link> </div>
    <div className='text-richblack-400'> <Link  to={"/"}> Terms </Link> </div>  
    </div>
    <div className='text-richblack-400'>Made with <span className='text-pink-200'> ♥ </span> <Link to={"https://www.himanshutiwari.in"}>Himanshutiwari</Link> © 2024 Edunotion</div>
    </div>
    </div>
  )
}

export default Footer