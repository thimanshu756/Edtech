import React from 'react'
const statsData=[{
    amount:"5k",
    name:"Active Students"
},
{
    amount:"10+",
    name:"Mentors"
},
{
    amount:"200+",
    name:"Courses"
},
{
    amount:"50+",
    name:"Awards"
}]
const Stats = () => {
  return (
    <div className='w-full mx-auto bg-richblack-800 flex flex-row gap-10 py-[90px] px-[120px] items-center justify-evenly '>
        {statsData.map((data)=>(
            <div className='flex flex-col items-center' > 
                <h1 className='text-richblack-5 text-2xl font-bold'>{data.amount}</h1>
                <p className='text-richblack-100'>{data.name}</p>
            </div>
        ))}
    </div>
  )
}

export default Stats