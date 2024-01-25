import React, { Children } from 'react'
import { Link } from 'react-router-dom'
const Button = ({children,active,linkto , textColor }) => {
  return (

        <Link to={`${linkto}`}>
      <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold ${active ? "bg-yellow-100 " :"bg-richblack-400"} ${textColor} transition-all duration-200 hover:scale-90`}>
        {children}
      </div>
        </Link>

  )
}

export default Button