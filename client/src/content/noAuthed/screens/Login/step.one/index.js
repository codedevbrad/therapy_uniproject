import { useState , useEffect , useContext } from 'react';
import { TouchableWithoutFeedback , SafeAreaView, StyleSheet, TextInput , View , Text , Button , Image } from 'react-native';
import AppNoAuthedTemplate from '../../../template/index';

import { getFromStorage } from '../../../../../utils/util.localstorage';

import { UserContext }  from '../../../../../contexts/context.user';
import { loginScreens } from '../../../../screenNames';

import NativeTextHeading   from '../../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../../components/native/native.text.paragraph';

import { awaitTimeout } from '../../../../../utils/delay';


// https://res.cloudinary.com/dezoqwmss/image/upload/v1659900317/project_uniTherapyapp/theripal-removebg-preview_dxzkoc.png


const states = {
    normal: { 
              color: 'navy' ,
       pinHighlight: 'navy',
            heading: '✌️',
               text: '' , 
    displayUsername: true
    }, 
    danger: {
             color: 'crimson',
      pinHighlight: 'navy',
           heading: 'Oops 😞',
              text: 'Dangg. Thats the wrong username. Keep trying',
   displayUsername: false
    },
    accepted: { 
             color: 'mediumseagreen',
      pinHighlight: 'navy',
           heading: 'Awesome 😀' ,
              text: '',
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


function WelcomeBack ( { pageNavigate , username , resetBack } ) {

    let { setUsername , resetUsernameFromStorage } = useContext( UserContext );

    const resetUser = ( ) => {
        resetUsernameFromStorage();
        resetBack();
    }

    useEffect( ( ) => {
        setUsername( username );
    } , [ ] );

    return (
        <View style={ [ { flex: 6 } , styles.container ] }>

               <View style={[ styles.flex , { flex: 3 , marginVertical: 40 }]}>
                    <Image style={{ borderRadius: 30 , width: 150 , height: 150 } } source={{ uri: 'https://res.cloudinary.com/dezoqwmss/image/upload/v1659969982/project_uniTherapyapp/theripal_xnjvug.png' }} />
               </View>
            
               <View style={ { flex: 4 , alignItems: 'center' , justifyContent: 'start' }}>
                    <NativeTextHeading size={'xl'} styling={ { paddingBottom: 20 } }>
                        Welcome back, { username } 
                    </NativeTextHeading>
                    <NativeTextParagraph>
                        Login using this account.
                    </NativeTextParagraph>

                    <View style={{ backgroundColor: 'white' , borderRadius: 5 , paddingHorizontal: 30 , paddingVertical: 15 , margin: 30 }} >
                        <Button onPress={ ( ) => pageNavigate.navigate( loginScreens.step_2 )} title="Login" color="black" />
                    </View>
                
                    <TouchableWithoutFeedback onPress={ ( ) => resetUser( ) }>
                        <Text style={ { color: 'white' , textDecorationLine: 'underline'  } }> 
                            or Login with an another account 
                        </Text>
                    </TouchableWithoutFeedback>
                </View>
              
        </View>
    )
}


function UsernameCapture ( { pageNavigate , currentBackground , changeBackground } ) {

    const [ text , onChangeText ] = useState("");

    const { loginWithUsername } = useContext( UserContext );

    const onTextInput = ( ) => {
        if ( text.length == 0 ) {
            changeBackground( states.normal );
        }
    }

    const login = async ( textInput ) => {

        if ( textInput.length == 0 ) return false;
        
        else {
            loginWithUsername( textInput )
                .then( async ({ logged  }) => {
                    if ( logged ) {
                        changeBackground( states.accepted );
                        await awaitTimeout( 500 );
                        pageNavigate.navigate( loginScreens.step_2 );
                    } else {
                        changeBackground( states.danger );
                        onChangeText('');
                        console.log('not logged');
                    }
                })
                .catch( ( err ) => {
                    changeBackground( states.error );
                    console.log( err );
                });
        }   
    }

    return (
        <View style={[ styles.container ]}>

            <View style={[ styles.flex , { flex: 2 } ]}>
                <NativeTextHeading size={'xl'}>
                        Login as a Patient
                </NativeTextHeading>
                <NativeTextParagraph>
                        welcome to Theripal
                </NativeTextParagraph>
            </View>

            <View style={[ styles.flex , { flexDirection: 'column' } ]}>
                  <NativeTextHeading size={ 'lg' } styling={{ textAlign: 'center' , padding: 10 }}>
                      { currentBackground.heading }
                  </NativeTextHeading>
                  <NativeTextParagraph styling={{ textAlign: 'center' , padding: 10 , lineHeight: 30 }}>
                      { currentBackground.text }  
                  </NativeTextParagraph>
            </View>

            <View style={ { flex: 3 , flexDirection: 'column' , alignItems: 'center'} }>

                <SafeAreaView style={[ { flexDirection: 'row' } ]}>
                    <TextInput style={styles.input} onChangeText={onChangeText} value={text} placeholder={'username'} onKeyPress={ onTextInput } />
                </SafeAreaView>     

                <TouchableWithoutFeedback onPress={ ( ) => login( text ) }>
                    <Text style={ { color: 'white' } }> 
                          Login 
                    </Text>
                </TouchableWithoutFeedback>

            </View>

        </View>
    )
}


export default function LoginUsername ( { navigation } ) {

    const [ state , setstate ] = useState('');
    const [ background , setbackground ] = useState( states.normal );

    const resetToUsernameCapture = ( ) => {
        setstate('');
    }

    async function checkIfUsernameExists ( ) {
        let user = await getFromStorage('username');

        if ( user !== null && user.username ) {
            // go to page to see if user wants to login with saved username.
            console.log( user.username , 'has signed in before' );
            setstate( user.username );
        } else {
            console.log('no user set from before')
        }
    }
  
    useEffect( ( ) => {
        setbackground( states.normal );
        checkIfUsernameExists();
    }, [ ] );

    return (
        <AppNoAuthedTemplate screenColor={ background.color }>
            <View style={ styles.container  }>
                 { state.length > 0  && <WelcomeBack pageNavigate={ navigation }  username={ state } resetBack={ resetToUsernameCapture } /> }
                 { state.length == 0 && <UsernameCapture currentBackground={ background } pageNavigate={ navigation } changeBackground={ setbackground } /> }
            </View>
        </AppNoAuthedTemplate>
    );
}


const styles = StyleSheet.create({

  whiteText: {
    color: 'white'
  } ,
  container: {
    flex: 1,
    flexDirection: "column" ,
    color: 'white'
  },
  flex: { 
    flex: 1,
    alignItems: 'center' , 
    justifyContent: 'center'
  },
  input: {
    flex: 0.8,
    height: 65,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderColor: 'white',
    color: 'white'
  },
});