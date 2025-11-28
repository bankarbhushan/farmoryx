import React from 'react'
import src from '../../assets/fruit-shop-animate.svg'

function Business_Img() {
  return (
    <div>
      <div className="md:flex m-auto w-[70%] bg-green-50 justify-center items-center">
        <img src={src} alt="Business Illustration" />
      </div>
    </div>
  )
}

export default Business_Img
