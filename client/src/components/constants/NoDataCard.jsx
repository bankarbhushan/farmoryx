import React from 'react'
import NoDataFound_Img from '../../assets/Images/NoDataFound_Img'

const NoDataCard = ({title = 'No Data Found', message = ''}) => {
  return (
    <div className="w-full flex justify-center py-10">
      <div className="w-full max-w-md bg-white border border-[#E6E9EA] shadow-md rounded-xl p-6 text-center">
        <div className="flex justify-center mb-3">
          <div className="p-3 ">
            <NoDataFound_Img />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-[#12202E]">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">
          {`There is no ${message} to display.`}
        </p>
      </div>
    </div>
  )
}

export default NoDataCard
