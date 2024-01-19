import React from 'react'

const TextColor = ({text}) => {
  return (
        <span className='font-bold textcolor text-gradient-to-r from-[#1FA2FF] from-5% via-[#12D8FA] via-90% to-[#A6FFCB] to-5%'>
         {text}
        </span>
  )
}

export default TextColor