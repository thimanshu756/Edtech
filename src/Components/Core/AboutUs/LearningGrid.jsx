import React from 'react'
import learningGridData from "../../../data/learningGridData"
import TextColor from '../HomePage/TextColor'
import Button from '../HomePage/Button'
const LearningGrid = () => {
  return (
        <div className="grid mx-auto sm:w-[350px] lg:w-11/12 mt-10 grid-cols-1 lg:grid-cols-4 mb-12">
          { learningGridData.map((card, i) => {
            return (
              <div
                key={i}
                className={`${i === 0 && "lg:col-span-2 text-richblack-5 lg:h-[294px]"}  ${
                  card.order % 2 === 1
                    ? "bg-richblack-700 h-[294px]"
                    : card.order % 2 === 0
                    ? "bg-richblack-800 h-[294px]"
                    : "bg-transparent"
                } ${card.order === 3 && "lg:col-start-2"}  `}
              >
                {card.order < 0 ? (
                  <div className="lg:w-[90%] flex flex-col gap-3 pb-10 lg:pb-0">
                    <div className="text-4xl h-[90px] font-semibold ">
                      {card.heading}
                      <TextColor text={card.highlightText} />
                    </div>
                    <p className="text-richblack-300 font-medium">
                      {card.description}
                    </p>
    
                    <div className="w-fit mt-2">
                      <Button active={true} textColor={"text-richblack-800"} linkto={card.BtnLink}>
                        {card.BtnText}
                      </Button>
                    </div>
                  </div>
                ) : (
                 <div className="p-8 flex flex-col gap-8">
                    <h1 className="text-richblack-5 text-lg">{card.heading}</h1>
    
                    <p className="text-richblack-300 font-medium">
                      {card.description}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
  )
}

export default LearningGrid