import React from 'react'
import Wrapper from '../constants/Wrapper'
import InfoForm from "./components/InfoForm"
import VegForm from './components/VegForm'
import BillForm from './components/BillForm'
import ActionButtons from './components/ActionButtons'
import { BillProvider } from './context/BillContext'

const Bill = () => {
  return (
    <BillProvider>
      <Wrapper>
        <div>
        <h1 className="text-xl font-bold text-center mb-4 text-gray-800">Bill </h1>            
        <div className='flex flex-col justify-betweens'>
                <InfoForm/>
                <VegForm/>
            </div>
            <BillForm/>
            <ActionButtons/>
        </div>
      </Wrapper>
    </BillProvider>
  )
}

export default Bill;