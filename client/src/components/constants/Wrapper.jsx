import React from 'react'

const Wrapper = ({children, className = ''}) => {
  return <div className={`bg-white rounded-md p-6 m-4 ${className}`}>{children}</div>
}

export default Wrapper
