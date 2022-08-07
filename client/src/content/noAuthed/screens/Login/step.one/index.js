import { useState , useEffect , useContext } from 'react';
import { TouchableWithoutFeedback , SafeAreaView, StyleSheet, TextInput , View , Text , Button } from 'react-native';
import AppNoAuthedTemplate from '../../../template/index';

import { UserRequests } from '../../../../../networkRequests';

import { getFromStorage , storeInStorage } from '../../../../../utils/util.localstorage';

import { UserContext } from '../../../../../contexts/context.user';

import { loginScreens } from '../../../../screenNames';

import NativeTextHeading   from '../../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../../components/native/native.text.paragraph';


// https://res.cloudinary.com/dezoqwmss/image/upload/v1659900317/project_uniTherapyapp/theripal-removebg-preview_dxzkoc.png


function WelcomeBack ({ pageNavigate , username } ) {

    let { setUsername } = useContext( UserContext );

    const resetUser = ( ) => {

    }

    useEffect( ( ) => {
        setUsername( username );
    } , [  ] );

    return (
        <View style={ [ { flex: 6 } , styles.container , styles.flex ]}>
               <NativeTextHeading size={'xl'} styling={ { paddingBottom: 20 } }>
                    Welcome back, { username } 
                </NativeTextHeading>
                <NativeTextParagraph>
                    Login using this account or sign out.
                </NativeTextParagraph>
                <Button onPress={ ( ) => pageNavigate.navigate( loginScreens.step_2 )} title="Login" color="white" />
        </View>
    )
}


function UsernameCapture ({ pageNavigate } ) {

    const [ text , onChangeText ] = useState("");

    let { setUsername } = useContext( UserContext );

    const loginWithUsername = async ( ) => {
        try {
          let userExists = await UserRequests.checkUsernameExists( text );
          if ( userExists ) {
              setUsername( text );
              await storeInStorage('username' , { username: text } );
              pageNavigate.navigate( loginScreens.step_2 )
          } 
          else {
              console.log('username doesnt exist');
          }
        }
        catch ( err ) {
          console.log(err )
        }
    }

    return (
        <View style={[ styles.container ]}>
            <View style={[ styles.flex , { flex: 3  } ]}>
                <NativeTextHeading size={'xl'}>
                        Login as a Patient
                </NativeTextHeading>
                <NativeTextParagraph>
                        welcome to Theripal
                </NativeTextParagraph>
            </View>

            <View style={ { flex: 3, flexDirection: 'column' , alignItems: 'center'} }>
                <SafeAreaView style={[ { flexDirection: 'row' } ]}>
                    <TextInput style={styles.input} onChangeText={onChangeText} value={text}  placeholder={'username'}/>
                </SafeAreaView>     
                <TouchableWithoutFeedback onPress={() => loginWithUsername()}>
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

    async function checkIfUsernameExists ( ) {

            let user = await getFromStorage('username');

            if ( user.username ) {
                // go to page to see if user wants to login with saved username.
                console.log( user.username , 'has signed in before' );
                setstate( user.username );
            } 
    }
  
    useEffect( ( ) => {
        checkIfUsernameExists();
    }, [ ] );

    return (
        <AppNoAuthedTemplate>
            <View style={ styles.container  }>
                 { state.length > 0  && <WelcomeBack pageNavigate={ navigation }  username={ state }  /> }
                 { state.length == 0 && <UsernameCapture pageNavigate={ navigation } /> }
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