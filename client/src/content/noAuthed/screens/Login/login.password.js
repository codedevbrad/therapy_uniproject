import axios from 'axios';
import { useState , useEffect , useContext } from 'react';
import { StyleSheet, Text, View , TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';

import AppNoAuthedTemplate from '../../template/index';

import { UserContext } from '../../../../contexts/context.user';

import { UserRequests } from '../../../../networkRequests';

import { storeInStorage } from '../../../../utils/util.localstorage';

import NativeTextHeading from '../../../../components/native/native.text.heading';


function Pin ({ entered = 0 } ) {
    const [ pin , setPin ] = useState([ 1,2,3,4,5 ] );
    return (
        <View style={[ PinStyles.container ]}>
              { pin.map( ( item , index ) => 
                   <View style={ PinStyles.container } key={ `pin-index-${ index }`}> 
                        { entered >= item ?
                              <View style={ PinStyles.circle_entered }> 
                              </View>
                          : 
                              <View style={ PinStyles.circle }> 
                              </View>
                        }
                  </View> 
              ) }
        </View>
    )
}


const PinStyles = StyleSheet.create({
    container: {
      flex: 1 , 
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center'
    } ,

    item: {
      flex: 1 , 
      textAlign: 'center',
      padding: 15
    } ,
    circle_entered: {
      height : 26 ,
      width  : 26 ,
      borderRadius: 1000,
      backgroundColor: 'white' 
    } , 
    circle: {
      height : 16 ,
      width :  16 ,
      borderRadius: 1000,
      backgroundColor: 'darkslateblue'
    }
});


function TouchPad ( { resetOnRefresh , resetColor , pinCode , addToPin , pinLength , completed , pinHighlight } ) {

    const keypadMethod = ( pin ) => {

        if ( pinCode.length == 0 ) {
            resetOnRefresh()
        }

        if ( ( pinCode.length + 1 ) == pinLength ) {
            let copy = [ ...pinCode ];
            copy.push( pin );
            addToPin( copy );
            completed( copy.join(""));
        } else { 
            let copy = [ ...pinCode ];
            copy.push( pin );
            addToPin( copy );
        }
    }

    const keypadDeleteMethod = ( ) => {
        let pincodeCopy = [ ...pinCode ];
        pincodeCopy.pop();
        addToPin( pincodeCopy );
        console.log('delete keypad pin')
    }
 

    const Method = ( action , value ) => {
        switch( action ) {
            case 'add':
              keypadMethod( value )
              return;
            case 'ignore':
              return;
            case 'delete':
              keypadDeleteMethod();
        }
    }

    const [ touchpad , setTouchpad ] = useState([
        [ 
          { value: '1' , action: 'add' } , 
          { value: '2' , action: 'add' } , 
          { value: '3' , action: 'add' } 
        ] ,
        [ 
          { value: '4' , action: 'add' } , 
          { value: '5' , action: 'add' } , 
          { value: '6' , action: 'add' }
        ] , 
        [ 
          { value: '7' , action: 'add' } , 
          { value: '8' , action: 'add' } , 
          { value: '9' , action: 'add' } 
        ] ,
        [ 
          { value: ''  , action: 'ignore' } , 
          { value: '0' , action: 'add'    } , 
          { value: <Feather name="delete" size={24} color="white" /> , action: 'delete' }
        ]
    ]);

    useEffect( ( ) => {
        console.log('touchpad component restarted'); 
        addToPin( [ ] );
    } , [ ] );

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
              { touchpad.map( ( row , index ) =>
                  <View style={ touchStyles.container } key={ `key-${ index }`}> 
                        { row.map( ( item , rowIndex ) => 
                            <TouchableHighlight 
                                    onPress={ () => Method( item.action , item.value ) } 
                              activeOpacity={0.6}
                              underlayColor={ pinHighlight }
                              style={ touchStyles.key } 
                              key={ `index-${ rowIndex }`}
                            > 
                                      <Text style={ touchStyles.text } key={ `row-${ rowIndex }`}> 
                                        { item.value }
                                      </Text>  
                            </TouchableHighlight>
                        )}
                  </View>
               )}
        </View>
    )
}


const touchStyles = StyleSheet.create({
    container: {
      flex: 1 , 
      flexDirection: 'row',
      height: '25%'
    } , 
    key: {
      flex: 0,
      flexBasis: '33.33%', 
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 10
    } , 
    text: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold'
    }
});


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
        loginAttempt(  username , password );
    }

    useEffect( ( ) => {
        console.log('logging in');
        // loginAttempt( 'patient1' , '12345' );
    } , [ ] );

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
                  <Text style={{ color: 'white' , textAlign: 'center' , padding: 10 , lineHeight: 30 }}>
                      { state.text } 
                      { state.displayUsername ? `, ${ username }` : '' }
                  </Text>
            </View>

            <View style={[ styles.flex , { flex: 3 }]}>          
                  <TouchPad resetOnRefresh={ resetColor } pinCode={ pin } addToPin={ setPin } pinLength={ 5 } completed={ pinCompleted } pinHighlight={ state.pinHighlight } />
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

