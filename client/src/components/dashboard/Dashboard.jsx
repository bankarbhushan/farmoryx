import React from 'react'
import Wrapper from '../constants/Wrapper'
import InfoForm from "./components/InfoForm"
import VegForm from './components/VegForm'
import Bill from './components/Bill'
import ActionButtons from './components/ActionButtons'

const Dashboard = () => {
  return (
    <Wrapper>
        <div>
            <div className='flex flex-col justify-betweens md:flex-row'>
                <Wrapper className='min-h-57 min-w-[38%] shadow-none'>
                     <InfoForm/>
                 </Wrapper>
                <Wrapper  className='min-h-57  min-w-[58%] shadow-none'>
                    <VegForm/>
                </Wrapper>
            </div>
            <Bill/>
            <ActionButtons/>
        </div>
    </Wrapper>
  )
}

export default Dashboard