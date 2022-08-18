import axios from 'axios';
import { getFromStorage } from './utils/util.localstorage';

const localPort = 'http://192.168.1.88:5000';

const config = { headers: { 'Content-Type': 'application/json' } };

// determine if error statuscode is a user error or network error.
   // what statuscodes are userErrors - ( 300 - 499 ?)
   // what statuscodes are networkWrror - ( 500 + )


// @ NOT AUTHED.

// api / serviceuser / 0 / 

export const UserRequests = {

      api_endpoint: '/api/serviceuser/0' ,

      login: async function ( userObject ) {
            return new Promise( ( resolve , reject ) => {
                  // body ( username , password )
                  let body = JSON.stringify( userObject );
                  return axios.post( `${ localPort + this.api_endpoint }/login` , body , config )
                        .then(   res => res.data )
                        .then(  data => resolve( data ))
                        .catch(  err => reject( err.response.data ) );
            });
      } ,
      
      checkUsernameExists: function ( username ) {
            return new Promise( ( resolve , reject ) => {        
                   axios.get( `${ localPort + this.api_endpoint }/checkusername?username=${ username }`)
                        .then(   res => res.data )
                        .then(  data => resolve( data ))
                        .catch(  err => reject( err.response.data ) );
            });
      }
}


// @ AUTHED 
// @ requires
//    * Bearer token for authentication.

// api / app / activitytemplate / 

export const ActivityTemplateRequests = {

      api_endpoint: '/api/app/activitytemplate/' ,

      fetchTemplates: function ( ) {
            return new Promise( async ( resolve , reject ) => {  

                   let token = await getFromStorage('token');

                   const config = {
                        headers: { Authorization: `Bearer ${token}` }
                  };

                   axios.get( `${ localPort + this.api_endpoint }/fetch` , config )
                        .then(   res => res.data )
                        .then(  data => resolve( data ))
                        .catch(  err => reject( err.response.data ) );
            });
        }
}


// api / app / sessions

export const CalendarRequests = {

      api_endpoint: '/api/app/sessions/' ,

      fetchSessions: function ( ) {
            return new Promise( async ( resolve , reject ) => {  

                   let token = await getFromStorage('token');

                   const config = {
                        headers: { Authorization: `Bearer ${token}` }
                  };

                   axios.get( `${ localPort + this.api_endpoint }/fetch` , config )
                        .then(   res => res.data )
                        .then(  data => resolve( data ))
                        .catch(  err => reject( err.response.data ) );
            });
      }
}