import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = (props) => {
  axios.defaults.withCredentials = true;
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // prevent flicker

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(`${backendURL}/api/auth/check-auth`);
        console.log("check-auth response:", data);

        if (data.success) {
          setIsLoggedIn(true);
          setRole(data.role);
        } else {
          setIsLoggedIn(false);
          setRole(null);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setIsLoggedIn(false);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value = {
    backendURL,
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
    loading,
  };

  return (
    <AppContext.Provider value={value}>
      {loading ? (
        <div className="flex justify-center items-center h-screen text-xl text-gray-600">
          Checking authentication...
        </div>
      ) : (
        props.children
      )}
    </AppContext.Provider>
  );
};



// import axios  from "axios";
// import React, { createContext, useState,useEffect } from "react";

// export const AppContext = createContext();

// export const AppProvider = (props)=>{
   
//      axios.defaults.withCredentials = true;
//     const backendURL = import.meta.env.VITE_BACKEND_URL;
//     const[isLoggedIn,setIsLoggedIn] = useState(false);
    
//     const value = {backendURL,isLoggedIn,setIsLoggedIn}
//     return(
//         <AppContext.Provider value={value}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }


