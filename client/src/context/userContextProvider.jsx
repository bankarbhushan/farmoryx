import React, { useState } from 'react'
import UserContext from './userContext';

const UserContextProvider = ({children}) => {
      const [userName, setUserName] = useState("");

  return (
     <UserContext.Provider value={{userName,setUserName}}>{children}</UserContext.Provider>
  )
}

export default UserContextProvider;