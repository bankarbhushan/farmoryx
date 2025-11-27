import React from 'react'
import Business_Img from "../../assets/Images/Business_Img";
import Wrapper from '../constants/Wrapper';

const Greet = () => {
  return (
    <div>
      <h1 className="font-bold  items-center flex justify-center mb-5 mt-5 text-green-700 text-lg">🌿 माऊली भाजी भांडार, साकोली 🌿</h1>
      <hr className='text-2xl  m-auto text-amber-700' />
     <Business_Img/>
</div>

  )
}

export default Greet;