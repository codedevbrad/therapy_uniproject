import { StyleSheet, Text, View , Button } from 'react-native';

import AppNoAuthedTemplate from '../../template/index';

export default function LoginWelcome ( {navigation} ) {
    return (
      <AppNoAuthedTemplate>
          <View>
            <Text> Hey there </Text>
            <Button title="login" onPress={ ( ) => navigation.navigate('dashboard')} />
          </View>
      </AppNoAuthedTemplate>
    );
}
