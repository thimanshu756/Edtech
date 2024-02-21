import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import Button from '../HomePage/Button';
import { TypeAnimation } from 'react-type-animation';
const CodeBlocks = ({position ,heading ,codes ,para ,button1 ,button2  ,codeColor ,backgroundGradient}) => {
  return (
    <div className={`flex ${position} my-20 justify-between  md:flex-row lg:gap-10 gap-10`}>
        {/* Section 1 */}
        <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
            <div className='text-[36px]'>
             {heading}     
            </div>
        <div className="text-richblack-300 text-base font-bold w-[85%] -mt-3">
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
        <div className= {`h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]`}>
            <div className='text-center flex flex-col   w-[10%] select-none text-richblack-400 font-inter font-bold'>
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
    <div    className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>
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


