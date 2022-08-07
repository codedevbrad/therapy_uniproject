import { StyleSheet, Text, View , SafeAreaView, ScrollView } from 'react-native';
import { useState , useEffect } from 'react';
import { UserContext } from '../../../../contexts/context.user';

import AppAuthedTemplate from '../../template/index';
import { Calendar } from 'react-native-calendars';

import { CalendarRequests } from '../../../../networkRequests'; 
import { formatDate , getTimeFromDateUTC } from '../../../../utils/formatDate';

import NativeTextHeading   from '../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../components/native/native.text.paragraph';


export default function CalendarScreen ( { navigation } ) {

    const [ sessionData , setSessions ] = useState([]);
    const [ dates, setdates ] = useState( { } );
    const [ sessionSelected , setSessionSelected ] = useState([]);

    const generateSessions = ( sessions ) => {
        sessions.forEach( ( session ) => {
                let date = session.date;
                session.dateFormatted = formatDate( date );
                session.dateDisplay = getTimeFromDateUTC( date );
        });
        setSessions( sessions );
    }

    const populateCalendarWithDates = ( sessions ) => {
        let datesObj = { };
        sessions.forEach( ( session ) => {
            datesObj = { ...datesObj , [ session.dateFormatted ]: { selected: true, selectedColor: 'blue' } };
        });
        setdates( datesObj );
    }

    const fetchContent = async( ) => {
        CalendarRequests.fetchSessions()
            .then( ( sessions ) => {
                generateSessions( sessions );
                populateCalendarWithDates( sessions );
            })
            .catch( ( err ) => console.log( err ) )
    }

    const displaySession = ( event ) => {
       let date = event.dateString;
       let selectedSessions = sessionData.filter( ( session ) => session.dateFormatted === date );
       console.log('------');
       console.log( date , '----' , selectedSessions );
       setSessionSelected( selectedSessions );
    }

    useEffect( ( ) => {
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
                <NativeTextHeading size={ 'lg' } styling={ { textAlign: 'center' , color: 'black' , padding: 8 , marginTop: 30 } }>
                    Sessions.
                </NativeTextHeading>

                <SafeAreaView style={styles.scrollContainer}>
                    <ScrollView style={styles.scrollView}>

                            { sessionSelected.map( ( session , id  ) =>
                                <View key={ `calendar_id__${ id }` } style={ { backgroundColor: 'lightblue' ,  padding: 15 , borderRadius: 10 , marginTop: 10 , marginBottom: 10 } }>
                                    <NativeTextHeading size={ 'sm' } styling={ { color: 'white' , padding: 8 } }>
                                        { session.date_timezone }
                                    </NativeTextHeading>

                                    <NativeTextHeading size={ 'md' } styling={ { color: 'white' , padding: 8 } }>
                                        { session.session_reason }
                                    </NativeTextHeading>

                                    <NativeTextParagraph size={ 'sm' } styling={ { color: 'white' , padding: 8 } }>
                                        { session.session_notes }
                                    </NativeTextParagraph>
                                </View>
                            )}
                    
                     </ScrollView>
                </SafeAreaView>       

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
        overflow: 'hidden',
        paddingBottom: 20
    },

    scrollContainer: {
        flex: 6 
    },
    scrollView: {
        marginHorizontal: 20,
    }
});