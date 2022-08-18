import { StyleSheet, Text, View , SafeAreaView , ScrollView , StatusBar , TouchableWithoutFeedback } from 'react-native';
import { useEffect , useState , useRef  } from 'react';
import AppAuthedTemplate from '../../../../template/index';
import { ActivityTemplateRequests } from '../../../../../../networkRequests';

import NativeTextHeading from '../../../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../../../components/native/native.text.paragraph'; 



function ActivitySentances ( { words , interval } ) {

    const [ currWordIndex , setcurrWordIndex ] = useState(0); 

    let timeout;

    function loopThrough ( index ) {

        let length = words.length;

        if ( index < length ) {     
            setcurrWordIndex( index );
            console.log( 'activity' , index );
            timeout = setTimeout( ( ) => { 
                loopThrough( index + 1 ); 
            } , parseInt( interval * 1000 ) );
        } 
        else if ( index == length ) {
            console.log( 'end of activity' );
        }
    }
    
    useEffect( ( ) => {

        console.log('starting activity' , currWordIndex );
        setcurrWordIndex( 0 );
        loopThrough( currWordIndex );
            
        return ( ) => {
            clearTimeout( timeout );
            setcurrWordIndex( 0 );
        }

    } , [ ] );


    return (
        <SafeAreaView style={ styles.ScrollContainer }>
            <ScrollView style={ styles.scrollView } contentContainerStyle={[ styles.scrollCenter , SentanceStyles.container ]}>
                { /* if index == curr : text is black, else grey */ }
                { words.map( ( word , index ) => 
                    <NativeTextParagraph size={ 'lg' } styling={[ SentanceStyles.text , currWordIndex == index ? SentanceStyles.currText : '' ]} key={ `activity-${ index }` }> 
                        { word.word } 
                    </NativeTextParagraph>
                )}
            </ScrollView>
        </SafeAreaView>
    )
}

const SentanceStyles = StyleSheet.create({
    container: {
        flexWrap: 'wrap'
    },
    text: {
        marginHorizontal: 4 , 
        color: 'grey'
    } , 
    currText: {
        color: 'black',
        fontWeight: '700'
    }
});



function ActivityHandler ( { activityWords , activityType , delay } ) {

    // use useReducer here.

    const [ activityState , changeActivityState ] = useState({ 
        type: 'not started' , text: 'Start Activity'
    });

    function activityAudioCapture ( ) {
        // capture audio in file.
    } 
    
    const activityStart = ( ) => {
        
    };

    const activityPlaying = ( ) => {

    }

    const activityEnd = ( ) => {

    }

    return (
        <View style={ [ styles.container , { } ] }>
            <View style={{ flex: 4 }}>
                   <ActivitySentances words={ activityWords } interval={ delay } />
            </View>
         
            <View  style={{ flex: 2 }}>
                <TouchableWithoutFeedback onPress={ ( ) => activity( ) }>
                    <View style={ HandlerStyles.button }>
                        <Text>
                        { activityState.text }
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>           
    )
}


const HandlerStyles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10
    },
});


export default function ActivitiesList ( { navigation } ) {

    const [ subscribed , setSubscribed ] = useState({
        delay: '2'
    });

    const [ activity , setActivity ] = useState({
        words: [
            { word: "the" ,  inflection: [ 1 ] },
            { word: "girl",  inflection: [ 2 ] },
            { word: "wore",  inflection: [ 2 ] },
            { word: "long",  inflection: [ 3 ] },
            { word: "jeans", inflection: [ 0 ] },
            { word: "with" , inflection: [ 2 ] },
            { word: "blue" , inflection: [ 0 ] },
            { word: "bows" , inflection: [ 3 ] }
        ] , 
        type: "sentances", 
        therapistAttempt: "url",
        articulation: [ 'th' , 'r' , 's' ]
    });

    return (
        <AppAuthedTemplate navigation={ navigation }>
            <View style={[ styles.container ]}>
                <View style={[ styles.center , { flex: 1.75 }]}>
                     <NativeTextHeading size={ 'xl' } color={ 'black' }>
                            Activity
                     </NativeTextHeading>
                </View>
                <View style={{ flex: 4.25 }}>
                    <ActivityHandler activityWords={ activity.words } activityType={ activity.type } delay={ subscribed.delay } />
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
    },
    ScrollContainer: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
    },
    scrollView: {
        marginHorizontal: 20
    },

    scrollCenter: {
         flexDirection: 'row' , 
            alignItems: 'center'
    }
});