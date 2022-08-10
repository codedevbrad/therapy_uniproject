import { useState , useEffect , useContext } from 'react';
import { StyleSheet , View } from 'react-native';
import { useIsFocused } from "@react-navigation/native";


import AppNoAuthedTemplate from '../../../template/index';

import { UserContext } from '../../../../../contexts/context.user';

import { UserRequests } from '../../../../../networkRequests';

import { storeInStorage } from '../../../../../utils/util.localstorage';

import NativeTextHeading from '../../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../../components/native/native.text.paragraph';

import Pin from './partials/partial.pin';
import TouchPad from './partials/partial.touchpad';

import { awaitTimeout } from '../../../../../utils/delay';


export default function LoginPassword ( { navigation } ) {

    const states = {
        normal: { 
                  color: 'navy' ,
           pinHighlight: 'navy',
                heading: 'Hey there ✌️',
                   text: 'welcome' , 
        displayUsername: true
        }, 
        danger: {
                 color: 'crimson',
          pinHighlight: 'navy',
               heading: 'Oops 😞',
                  text: 'Dangg. Thats the wrong pin. Keep trying',
       displayUsername: false
        },
        accepted: { 
                 color: 'mediumseagreen',
          pinHighlight: 'navy',
               heading: 'Awesome 😀' ,
                  text: 'great to see you again',
       displayUsername: true
        } , 
        error: {
                 color: 'crimson',
          pinHighlight: 'navy',
               heading: 'An Error occured 🤐',
                  text: 'Something went wrong trying to login. Keep trying or contact us if the problem keeps persisting.',
       displayUsername: false
        }
    }

    const isFocused = useIsFocused();

    const [ state, setState ] = useState( states.normal );

    let { username , setUser } = useContext( UserContext );
    
    const [ pin , setPin ] = useState([]);

    const resetAttempt = ( state ) => {
        setPin( [ ] );  
        setState( state );
    }

    const resetColor = ( ) => setState( states.normal );

    const loginAttempt = async ( username , password ) => {
          try {
              let { didLogin , response } = await UserRequests.login({ username , password });

              if ( didLogin ) {
                   setState( states.accepted );
                   setUser( response.user );
                   await storeInStorage('token' , response.token );
                   await awaitTimeout( 700 );
                   navigation.navigate('dashboard');
                
              } else {
                  resetAttempt( states.danger );
              }   
          }
          catch ( err ) {
              console.log('something went wrong communicating with the app');
              resetAttempt( states.error );
          }
    }

    const pinCompleted = async ( password ) => { 
          console.log('logging in' , username , password );
          loginAttempt( username , password );
    }

    useEffect( ( ) => {
        // Call only when screen open or when back on screen 
        if ( isFocused ) { 
            console.log('refreshed');
            resetAttempt( states.normal );
        }
    } , [ isFocused ] );


    return (
      <AppNoAuthedTemplate screenColor={ state.color }>
          <View style={[ styles.container ]}>

            <View style={{ flex: 2 }}>
                  <Pin entered={ pin.length } />
            </View>

            <View style={[ styles.flex , { flexDirection: 'column' } ]}>
                  <NativeTextHeading size={ 'lg' } styling={{ textAlign: 'center' , padding: 10 }}>
                      { state.heading }
                  </NativeTextHeading>
                  <NativeTextParagraph styling={{ textAlign: 'center' , padding: 10 , lineHeight: 30 }}>
                      { state.text } 
                      { state.displayUsername ? `, ${ username }` : '' }
                  </NativeTextParagraph>
            </View>

            <View style={[ styles.flex , { flex: 3 }]}>          
                  <TouchPad resetOnRefresh={ resetColor } 
                                   pinCode={ pin } 
                                  addToPin={ setPin } 
                                 pinLength={ 5 } 
                                 completed={ pinCompleted } 
                              pinHighlight={ state.pinHighlight } 
                    />
            </View>

          </View>
      </AppNoAuthedTemplate>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column" 
    },
    flex: {
      flex: 1 , 
      alignContent: 'center' , 
      justifyContent: 'center'
    }
});

