import { useState , useEffect , useContext } from 'react';
import { TouchableWithoutFeedback , SafeAreaView, StyleSheet, TextInput , View , Text , Button } from 'react-native';
import AppNoAuthedTemplate from '../../template/index';

import { UserRequests } from '../../../../networkRequests';

import { getFromStorage , storeInStorage } from '../../../../utils/util.localstorage';

import { UserContext } from '../../../../contexts/context.user';


function WelcomeBack ({ pageNavigate , username } ) {
    
    return (
        <View style={ [ { flex: 6 } , styles.container , styles.flex ]}>
              <Text style={ styles.whiteText }> 
                  Welcome back, { username } 
              </Text>
              <Text  style={ styles.whiteText }>
                  Login using this account or sign out.
              </Text>
              <Button onPress={ ( ) => pageNavigate.navigate('login-2')} title="Login" color="white" />
        </View>
    )
}


function UsernameCapture ({ pageNavigate } ) {

    const [text, onChangeText] = useState("");

    let { setUsername } = useContext( UserContext );

    const loginWithUsername = async ( ) => {
        try {
          let userExists = await UserRequests.checkUsernameExists( text );
          if ( userExists ) {
              setUsername( text );
              await storeInStorage('username' , { username: text } );
              pageNavigate.navigate('login-2')
          } else {
              console.log('username doesnt exist');
          }
        }
        catch ( err ) {
          console.log(err )
        }
    }
    return (
        <View style={[ styles.container ]}>
            <View style={[ styles.flex , { flex: 1  } ]}>
            
            </View>

            <View style={[ styles.flex , { flex: 5, flexDirection: 'column' } ]}>
                <SafeAreaView style={[ { flexDirection: 'row' } ]}>
                    <TextInput style={styles.input} onChangeText={onChangeText} value={text}  />
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

    const [state, setstate] = useState('-1');

    let { user } = useContext( UserContext );

    async function checkIfUserLogged ( ) {
        console.log( 'user' , user );
    }

    async function checkIfUsernameExists ( ) {
            let username = await getFromStorage('username');
            console.log( username );
            if ( username ) {
                // go to page to see if user wants to login with saved username.
                setstate( '0' );
            } else {
                // go to page to capture username.
                setstate( '1' );
            }
    }
  
    useEffect( ( ) => {
        // checkIfUserLogged();
        // checkIfUsernameExists();
        // test pass username
        navigation.navigate('login-2');
    }, [ ] );


    return (
        <AppNoAuthedTemplate>
            <View style={[ styles.container , { backgroundColor: `navy` } ]}>
                 { state == '-1' && 
                    <View>
                    </View>
                 }
                 { state == '0' && <WelcomeBack pageNavigate={ navigation } /> }
                 { state == '1' && <UsernameCapture pageNavigate={ navigation } /> }
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