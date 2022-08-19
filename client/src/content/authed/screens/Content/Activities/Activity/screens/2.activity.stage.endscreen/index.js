import { StyleSheet , View  , StatusBar , TouchableWithoutFeedback } from 'react-native';
import { useEffect } from 'react';
import AppAuthedTemplate from '../../../../../../template/index';
import NativeTextHeading from '../../../../../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../../../../../components/native/native.text.paragraph'; 

import { authActivityNavigating } from '../../../../../../../screenNames';


export default function ActivityEnded  ( { navigation } ) {

    const completedMoveBack = ( ) => {
        authActivityNavigating( 'TO-SCREEN-ACTIVITIES' , navigation.navigate );
    }

    return (
        <AppAuthedTemplate navigation={ navigation }>
            <View style={[ styles.container ]}>

                <View style={[ styles.center , { flex: 4 } ]}>
                     <NativeTextHeading size={ 'xl' } color={ 'black' }>
                            Activity Ended
                     </NativeTextHeading>
                     <NativeTextParagraph size={ 'md' } color={ 'black' } styling={{ marginVertical: 20 , textAlign: 'center' }}>
                            Awesome. well done on completing your activity 👍
                     </NativeTextParagraph>
                </View>

                <View style={[ styles.center , { flex: 2 } ]}>
                     <TouchableWithoutFeedback onPress={ ( ) => completedMoveBack( ) }>
                        <View style={ [ styles.button ] }>
                            <NativeTextHeading size={ 'sm' } color={ 'white' }>
                                Go Back activity list.
                            </NativeTextHeading>
                        </View>
                     </TouchableWithoutFeedback>
                </View>
            </View>
        </AppAuthedTemplate>
    )
};

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "black",
        paddingVertical: 30 , paddingHorizontal: 35 , borderRadius: 6
    },
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