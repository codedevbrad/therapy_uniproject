import axios from 'axios';

const localPort = 'http://192.168.1.88:5000';

const config = { headers: { 'Content-Type': 'application/json' } };

// determine if error statuscode is a user error or network error.
   // what statuscodes are userErrors - ( 300 - 499 ?)
   // what statuscodes are networkWrror - ( 500 + )

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