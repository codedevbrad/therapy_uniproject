import { StyleSheet, Text, View , Button } from 'react-native';

import AppAuthedTemplate from '../../template/index';


export default function Dashboard ( { navigation } ) {
    return (
      <AppAuthedTemplate navigation={ navigation }>
            <View>
              <Text> Dashboard </Text>
            </View>
      </AppAuthedTemplate>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});