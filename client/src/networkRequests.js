import axios from 'axios';

const localPort = 'http://192.168.1.64:5000';

const config = { headers: { 'Content-Type': 'application/json' } };

export const TablesApi = {
      test: async ( ) => {
          return axios.get( `${ localPort }/api/end`)
                   .then(   res => res.data )
                   .then(  data => resolve( data ))
                   .catch(  err => reject( err.response.data ) );
      }
}
