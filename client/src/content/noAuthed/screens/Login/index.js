import axios from 'axios';
import { useEffect } from 'react';
import { StyleSheet, Text, View , Button } from 'react-native';

import AppNoAuthedTemplate from '../../template/index';

export default function LoginWelcome ( {navigation} ) {

    useEffect( ( ) => { 
      console.log('hey dude')
      axios.get('http://192.168.1.88:5000/')
        .then(json => console.log(json.data))
        .catch( err => console.log( err.response ))
  }, [ ] );

    return (
      <AppNoAuthedTemplate>
          <View>
            <Text> Hey there </Text>
            <Button title="login" onPress={ ( ) => navigation.navigate('dashboard')} />
          </View>
      </AppNoAuthedTemplate>
    );
}
