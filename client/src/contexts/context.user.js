import { createContext , useState } from "react";

export const UserContext = createContext();

const UserContextWrapper = ( props ) => {
    const [ username , setUsername ] = useState('');
    const [ user , setUser ] = useState({ });
    
    // login

    // logout  

    // user data

    return (
      <UserContext.Provider value={{ 
           username , setUsername , 
           user , setUser 
      }}>
        {props.children}
      </UserContext.Provider>
    );
}

export default UserContextWrapper;