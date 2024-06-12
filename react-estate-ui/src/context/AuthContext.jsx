import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) =>{
    let curUser = JSON.parse(localStorage.getItem('user'))  ||  null ;
    const [currentUser, setCurrentUser] = useState( curUser );

    const updateUserInfo = (data) =>{
        setCurrentUser(data);
    }

    useEffect(() => {
            localStorage.setItem('user',JSON.stringify(currentUser));
    },[currentUser] )
  
   return ( <AuthContext.Provider value={{ currentUser , updateUserInfo }}>{children}</AuthContext.Provider>);
};

