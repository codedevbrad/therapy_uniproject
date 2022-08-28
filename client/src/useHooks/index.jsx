import { useState , useEffect } from "react";

const useFetch = ( func , defaultState = [ ] ) => {
      const [ data, setData ] = useState( [] );

      useEffect( ( ) => {

         func()  
          .then( res => { 
             setData( res.data );
             console.log( res.data );
          })
          .catch( err => console.log( 'err' , err ) );

      }, [ func ] );

      return [ data ];
};

export default useFetch;

