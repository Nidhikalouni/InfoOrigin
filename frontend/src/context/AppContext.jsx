import axios  from "axios";
import React, { createContext, useState } from "react";


export const AppContext = createContext();

export const AppProvider = (props)=>{
     axios.defaults.withCredentials = true;
    const backendURL = import.meta.env.VITE_BACKEND_URL;
    const[isLoggedIn,setIsLoggedIn] = useState(false);

    const value = {backendURL,isLoggedIn,setIsLoggedIn}
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

