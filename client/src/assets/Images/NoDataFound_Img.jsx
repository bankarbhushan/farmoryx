import React from 'react'
import No_Date_foud_Img from '../../assets/Images/No_Data_found.png'

const NoDataFound_Img = () => {
  return (
    <div className="md:flex m-auto w-[40%] bg-green-50 justify-center items-center">
      <img src={No_Date_foud_Img} alt="Farm Illustration" className="max-w-sm" />
    </div>
  )
}

export default NoDataFound_Img
