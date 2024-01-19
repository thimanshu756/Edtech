import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Button from '../HomePage/Button';
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({position ,heading ,codes ,para ,button1 ,button2  ,codeColor ,backgroundGradient}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 w-[90%]`}>
        {/* Section 1 */}
        <div className='w-[50%] flex flex-col gap-8 '>
            <div className='text-[36px]'>
             {heading}     
            </div>
        <div className='text-richblack-300 font-normal text-[20px]'>
            {para}
        </div>

        <div className='flex gap-11 mt-10'>
            <Button  linkto={button1.linkto} active={button1.active}>
                <div className='flex gap-2 items-center'>
                    {button1.buttonText}
                  <FaArrowRightLong />
                </div>
            </Button>
            <Button linkto={button2.linkto} active={button2.active}>
            <div className='flex gap-2 items-center'>
                    {button2.buttonText}
                </div>
            </Button>
        </div>
        </div>

        {/* code section */}
        <div className= {`flex w-[50%] border-greys-100 relative p-5 font-bold font-mono pr-2`}>
            <div className='flex flex-col ml-7 mr-5'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>
    <div className= {`w-[60%]  gap-2 ${codeColor}  `}>
    {/* bg-gradient-to-b from-[#8A2BE2] from-6.46% via-[#FFA500] via-59.04% to-[#F8F8FF] to-124.53% */}
    <span className={` rounded-[372.949px] w-[472.949px] h-[257.054px] absolute left-0 top-[-5px] border p-5 font-bold font-mono ${backgroundGradient} blur-[34px] opacity-20 pr-2`}> </span>

    <TypeAnimation 
    sequence={[
        codes,
        2000,
        ""
    ]}
    repeat={Infinity}
    cursor={true}
    style={
        {
            whiteSpace:"pre-line",
            display:"block",
            width:"100%",
            fontSize:"14px",
        
        }
    }
    omitDeletionAnimation={true}
    />   
    </div>

     </div>
    </div>
  )
}

export default CodeBlocks