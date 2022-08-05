import { StyleSheet, Text, View , Button } from 'react-native';
import { useState , useContext , useEffect } from 'react';
import { UserContext } from '../../../../contexts/context.user';
import AppAuthedTemplate from '../../template/index';
import { Calendar } from 'react-native-calendars';

import { CalendarRequests } from '../../../../networkRequests'; 


export default function CalendarScreen ( { navigation } ) {

    const [ dates, setdates ] = useState( { } );
    const [ sessionSelected , setSessionDisplay ] = useState( { } );

    let { user } = useContext( UserContext );

    const fetchContent = async( ) => {
        CalendarRequests.fetchSessions()
            .then( ( sessions ) => console.log( sessions ) )
            .catch( ( err ) => console.log( err ) )
    }

    const generateDates = ( dates ) => {
        let datesObj = { };
        dates.forEach( ( date ) => {
            datesObj = { ...datesObj , [ date ]: { selected: true, selectedColor: 'blue' } };
        });
        setdates( datesObj );
    }

    const displaySession = ( event ) => {
       console.log( event.dateString );
    }

    useEffect( ( ) => {
       generateDates( [ '2022-08-10' , '2022-08-14' , '2022-08-22' ]);
       fetchContent()
    }, [ ]) ;

    return (
      <AppAuthedTemplate navigation={ navigation }>
            <View style={ styles.container }>
                <Calendar
                    markedDates={ dates }
                    onDayPress={ day => displaySession( day ) }
                />
            </View>

            <View style={ styles.sessionSelected }>
                <Text>
                    calendar 
                </Text>
                <Text>
                    { JSON.stringify( sessionSelected )}
                </Text>
            </View>
      </AppAuthedTemplate>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 3 
    },
    sessionSelected: {
        flex: 3 ,
        justifyContent: 'center' , 
        alignItems: 'center'
    }
});