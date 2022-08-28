import { StyleSheet, Text, View , Button , FlatList , TouchableOpacity } from 'react-native';
import { useEffect , useState } from 'react';
import AppAuthedTemplate from '../../../../authed/template/index';
import NativeTextParagraph from '../../../../../components/native/native.text.paragraph';

import useFetch from '../../../../../useHooks';

import { GoalsRequests } from '../../../../../networkRequests';
import NativeTextHeading from '../../../../../components/native/native.text.heading';


function GoalArticulation ( { amount , articulation } ) {
    return (
        <View style={{ flexDirection: 'row' , alignItems: 'center' }}> 
                <NativeTextParagraph color={ 'black' } size={ 'md' }>
                    complete { amount } activities that contain 
                </NativeTextParagraph>
                
                { articulation.map( ( goal , index  ) => 
                    <NativeTextParagraph color={ 'white' } size={ 'md' } key={ `activityListItem-link__${ index }`} styling={
                        [ styles.item ,
                        { backgroundColor: 'black' , marginHorizontal: 10 , borderRadius: 20 , padding: 8 }
                        ]}>
                        { goal }
                    </NativeTextParagraph> 
                )}
        </View>    
    )
}

function Goal ( { amount = 0 , goalType = 'not set' } ) {
    return (
        <View>
                <NativeTextParagraph color={ 'black' } size={ 'md' }>
                    complete { amount } activities that are { goalType }.
                </NativeTextParagraph>
        </View>
    )
}

export default function GoalsList ( { navigation } ) {

    const [ goals , setgoals ] = useState([]);

    useEffect( ( ) => {
        GoalsRequests.fetchGoals()
                     .then( ( data ) => {
                        setgoals( data.data.goals );
                        console.log( data.data.goals )
                     })
                     .catch( err => console.log( err ) );
    } , [ ] );

    return (
        <AppAuthedTemplate navigation={ navigation }>

            <View style={[ { flex: 2 } , styles.center ]}>
                <NativeTextHeading color={ 'black' } size={ 'xl' }>
                        Goals set this Week
                </NativeTextHeading>
            </View>

            <View style={[ { flex: 4 , flexDirection: 'row' ,  padding: 20} ]}>
                    <FlatList data={ goals } keyExtractor={ ( keyItem , index ) => index.toString()} renderItem={( { item , index } ) => 
                        <View style={ { marginVertical: 10 }}>
                             { item.goal.case === 'articulation' ? <GoalArticulation amount={ item.amount } articulation={ item.goal.data } /> 
                               : 
                               <Goal amount={ item.amount } goalType={ item.goal.case } />  
                             } 
                        </View>
                    } /> 
            </View>
                    
        </AppAuthedTemplate>
    );
}


const styles = StyleSheet.create({
    center: {
      justifyContent: 'center',
      alignItems: 'center', 
    },
    item: {
      margin: 10 , 
    }
});