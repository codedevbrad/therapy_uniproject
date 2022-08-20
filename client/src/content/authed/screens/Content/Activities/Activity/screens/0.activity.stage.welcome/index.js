import { StyleSheet , View  , StatusBar , TouchableWithoutFeedback, Text } from 'react-native';
import { useEffect } from 'react';
import AppAuthedTemplate from '../../../../../../template/index';
import NativeTextHeading from '../../../../../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../../../../../components/native/native.text.paragraph'; 

import { authActivityNavigating } from '../../../../../../../screenNames';


import NativeCustomButtonDark from '../../../../../../../../components/custom/custom.DarkButton';

export default function ActivityWelcome  ( { navigation , route } ) {

   let { dataWelcome , dataPlay } = route.params;

    const goToActivity = ( ) => {
        authActivityNavigating( 'TO-SCREEN-START' , navigation.navigate , dataPlay );
    }

    return (
        <AppAuthedTemplate navigation={ navigation }>
            <View style={[ styles.container ]}>
                <View style={[ styles.center , { flex: 4 } ]}>
                     <NativeTextHeading size={ 'xl' } color={ 'black' }>
                            Activity
                     </NativeTextHeading>
                     <NativeTextParagraph size={ 'md' } color={ 'black' }>
                            The activity has a delay of { dataWelcome.delay } 's
                     </NativeTextParagraph>
                     <NativeTextParagraph size={ 'md' } color={ 'black' }>
                            { dataWelcome.tips }
                     </NativeTextParagraph>
                </View>
                
                <View style={[ styles.center , { flex: 2 } ]}>
                     <NativeCustomButtonDark clickHandler={ () => goToActivity() }>
                            Go to Activity 
                     </NativeCustomButtonDark>
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