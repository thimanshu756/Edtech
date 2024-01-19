import React from 'react'

const TextColor = ({text}) => {
  return (
        <span className='font-bold textcolor text-gradient-to-r from-[#1FA2FF] from-3.62% via-[#12D8FA] via-50.44% to-[#A6FFCB] to-104.53%'>
         {text}
        </span>
  )
}

export default TextColor