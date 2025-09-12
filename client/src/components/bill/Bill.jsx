import React from 'react'
import Wrapper from '../constants/Wrapper'
import InfoForm from "./components/InfoForm"
import VegForm from './components/VegForm'
import BillForm from './components/BillForm'
import ActionButtons from './components/ActionButtons'

const Bill = () => {
  return (
    <Wrapper>
        <div>
        <h1 className="text-xl font-bold text-center mb-4 text-gray-800">Bill </h1>            
        <div className='flex flex-col justify-betweens md:flex-row'>
                <Wrapper className='min-h-57 min-w-[38%] shadow-none'>
                     <InfoForm/>
                 </Wrapper>
                <Wrapper  className='min-h-57  min-w-[58%] shadow-none'>
                    <VegForm/>
                </Wrapper>
            </div>
            <BillForm/>
            <ActionButtons/>
        </div>
    </Wrapper>
  )
}

export default Bill;