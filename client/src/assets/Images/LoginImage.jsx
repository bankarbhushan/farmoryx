import React from 'react'
import LoginSvg from "../../assets/Farmers market-bro.svg"


const LoginImage = () => {
  return (
   <div className="hidden md:flex w-full bg-green-50 justify-center items-center">
        <img
          src={LoginSvg}
          alt="Farm Illustration"
          className="max-w-lg"
        />
      </div>
  )
}

export default LoginImage