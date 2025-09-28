import React from 'react'
import Reg_Svg from "../../assets/fruit shop-amico.svg"


const Register_Image = () => {
  return (
   <div className="hidden md:flex w-full bg-green-50 justify-center items-center">
        <img
          src={Reg_Svg}
          alt="Farm Illustration"
          className="max-w-lg"
        />
      </div>
  )
}

export default Register_Image