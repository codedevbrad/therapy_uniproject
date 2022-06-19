import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button , TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import screenNames from '../../screenNames';


const AppAuthedTemplate = ({ navigation, children }) => {

    const buttonPressed = ( item ) => {
        console.log( item );
    }

    return (
        <View style={styles.container}>
            <View style={ styles.topBar }>
                <View style={ styles.topBarLeft }>
                    <MaterialIcons onPress={ () => buttonPressed('profile') } name="face" size={24} color="black" />   
                </View>
                <View style={ styles.topBarRight }>
                    <Ionicons onPress={ () => buttonPressed('profile') } name="notifications-outline" size={24} color="black" />
                </View>
            </View>

            <View style={styles.screen}>
                { children } 
            </View>

            <View style={styles.navigation}>
                { screenNames.authScreens.map( ( item , index ) => 
                    <TouchableOpacity 
                      onPress={ ( ) => navigation.navigate( item ) } 
                          key={ index } 
                        style={ styles.navigationItemBtn }
                    >
                        <Text style={ styles.navigationItemText }> { item } </Text>
                    </TouchableOpacity>
                )}
            </View>
            <StatusBar style="auto" />
        </View>
    )
}


const styles = StyleSheet.create ( {
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff',
    },

    topBar: {
        flex: 1, flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    topBarLeft: {
        display: 'flex',
        flex: 1
    },

    topBarRight: {
        display: 'flex',
        flex: 1, 
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    screen: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    navigation: {
        flex: 1 ,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'black',
        color: 'white',
        borderTopLeftRadius:  40,
        borderTopRightRadius: 40,
    },

    navigationItemText: {
        color: 'white'
    }
});
  

export default AppAuthedTemplate;