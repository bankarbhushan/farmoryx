import React from 'react'
import LoginSvg from '../../assets/Farmers market-bro.svg'

const LoginImage = () => {
  return (
    <div className="md:flex m-auto w-[65%] bg-green-50 justify-center items-center">
      <img src={LoginSvg} alt="Farm Illustration" className="max-w-lg" />
    </div>
  )
}

export default LoginImage
