import { createContext, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ( props ) => {
    const { children } = props;
    const [ isLoggedIn, setLoggedIn ] = useState(false);
    
    return( 
        <LoginContext.Provider value = { 
            { 
                isLoggedIn : isLoggedIn,
                setLoggedIn : setLoggedIn,
            }
        }>
            {children}
        </LoginContext.Provider>
    )
}
