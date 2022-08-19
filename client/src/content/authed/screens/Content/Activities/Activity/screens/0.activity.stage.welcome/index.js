import { StyleSheet , View  , StatusBar , TouchableWithoutFeedback, Text } from 'react-native';
import { useEffect } from 'react';
import AppAuthedTemplate from '../../../../../../template/index';
import NativeTextHeading from '../../../../../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../../../../../components/native/native.text.paragraph'; 

import { authActivityNavigating } from '../../../../../../../screenNames';


export default function ActivityWelcome  ( { navigation , route } ) {

    const goToActivity = ( ) => {
        authActivityNavigating( 'TO-SCREEN-START' , navigation.navigate );
    }

    return (
        <AppAuthedTemplate navigation={ navigation }>
            <View style={[ styles.container ]}>
                <View style={[ styles.center , { flex: 4 } ]}>
                     <NativeTextHeading size={ 'xl' } color={ 'black' }>
                            Activity
                     </NativeTextHeading>
                     <NativeTextParagraph size={ 'md' } color={ 'black' }>
                            Some useful advice for the activity.
                     </NativeTextParagraph>
                </View>
                
                <View style={[ styles.center , { flex: 2 } ]}>
                     <TouchableWithoutFeedback onPress={ ( ) => goToActivity( ) }>
                            <Text>
                                Go the activity
                            </Text> 
                     </TouchableWithoutFeedback>
                </View>
            </View>
        </AppAuthedTemplate>
    )
};

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center', 
    },
    container: {
        flex: 6, 
        justifyContent: 'center',
        alignItems: 'center', 
        flexDirection: 'column',
        padding: 20
    }
});