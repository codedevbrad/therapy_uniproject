import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button , TouchableOpacity , Image , TouchableWithoutFeedback } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useContext } from 'react';

import { authScreens } from '../../screenNames';
import { UserContext } from '../../../contexts/context.user';

import NativeTextHeading from '../../../components/native/native.text.heading';


const BackTrack = ( { navigation } ) => {
    return (
        <TouchableWithoutFeedback onPress={() => navigation.goBack( ) }>
            <View style={{ marginHorizontal: 10 }}>
                <Ionicons name="arrow-back" size={24} color="black" /> 
            </View>
        </TouchableWithoutFeedback>
    )
}


const AppAuthedTemplate = ({ navigation, children , screenColor = 'white' , disableBackButton = false } ) => {

    const { user } = useContext( UserContext );

    const buttonPressed = ( item ) => {
        console.log( item );
    }

    return (
        <View style={styles.container}>

            <View style={ styles.topBar }>

                { !disableBackButton &&  <BackTrack navigation={ navigation }/> }

                <View style={ styles.topBarLeft }>
                    <View>
                       <Image style={{ borderRadius: 25 , width: 50 , height: 50 } } source={{ uri: user.avatarUrl }} />
                    </View>
                    <NativeTextHeading size={ 'sm' } color={ 'black' } styling={ { paddingHorizontal: 10 } }>
                         { user.username }
                    </NativeTextHeading>
                </View>
                <View style={ styles.topBarRight }>
                    <Ionicons onPress={ () => buttonPressed('profile') } name="notifications-outline" size={24} color="black" />
                </View>
            </View>

            <View style={ styles.screenLayout }>
                { children } 
            </View>

            <View style={styles.navigation}>
                { authScreens.map( ( item , index ) => 
                    <TouchableOpacity 
                      onPress={ ( ) => navigation.navigate( item ) } 
                          key={ index } 
                        style={ styles.navigationItemBtn }
                    >
                        <Text style={ styles.navigationItemText }> { item } </Text>
                    </TouchableOpacity>
                )}
            </View>
            <StatusBar style="dark"  />
        </View>
    )
}


const styles = StyleSheet.create ( {
    container: {
        flex: 1 , display: 'flex', backgroundColor: 'white', paddingTop: 40
    },

    topBar: {
        flex: 0.5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
    },

    topBarLeft: {
        display: 'flex',
        flex: 1 , 
        flexDirection: 'row',
        alignItems: 'center'
    },

    topBarRight: {
        display: 'flex',
        flex: 1, 
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    screenLayout: {
        flex: 5,
        flexDirection: 'column',
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