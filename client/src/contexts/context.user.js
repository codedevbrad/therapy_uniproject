import { createContext , useState } from "react";
import { getFromStorage , storeInStorage , removeFromStorage } from '../utils/util.localstorage';
import { UserRequests } from '../networkRequests';

export const UserContext = createContext();


const UserContextWrapper = ( props ) => {
    const [ username , setUsername ] = useState('');
    const [ user , setUser ] = useState({ });
    
    // login
    const loginWithUsername = ( text = '') => new Promise( async ( resolve , reject ) => {
        try {
            let userExists = await UserRequests.checkUsernameExists( text );
            if ( userExists ) {
                setUsername( text );
                await storeInStorage('username' , { username: text } );
                resolve({ logged: true });
            } 
            else {
                resolve({ logged: false });
            }
        }
        catch ( err ) {
          reject({ 
            message: 'error loggin in.' , 
                res: err 
          });
        }
    });


    // logout  

    // reset cached username.
    const resetUsernameFromStorage = async ( ) => {
        setUsername('');
        removeFromStorage('username');
    }

    // user data

    return (
      <UserContext.Provider value={{ 
           username , setUsername , 
           user , setUser ,
           loginWithUsername , resetUsernameFromStorage
      }}>
        { props.children }
      </UserContext.Provider>
    );
}

export default UserContextWrapper;