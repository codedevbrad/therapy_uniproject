import { StyleSheet, Text, View , SafeAreaView , ScrollView , StatusBar , TouchableWithoutFeedback } from 'react-native';
import { useEffect , useState , useRef , useReducer } from 'react';
import AppAuthedTemplate from '../../../../../../template/index';

import NativeTextHeading from '../../../../../../../../components/native/native.text.heading';
import NativeTextParagraph from '../../../../../../../../components/native/native.text.paragraph'; 

import { authActivityNavigating } from '../../../../../../../screenNames';

import UseAudio from './audioCapture';

import { CompletedWorkRequests } from '../../../../../../../../networkRequests';


function ActivitySentances ( { canStart = false , words , interval , startActivitycallback , endActivitycallback } ) {

    const [ currWordIndex , setcurrWordIndex ] = useState(-1); 

    let timeout;

    function loopThrough ( index ) {

        let length = words.length;

        if ( index < length ) {     
            setcurrWordIndex( index );
            console.log( 'activity' , index );
            timeout = setTimeout( ( ) => { 
                loopThrough( index + 1 ); 
            } , interval );
        } 
        else if ( index == length ) {
            endActivitycallback();
        }
    }

    const start = ( ) => {
        startActivitycallback();
        setcurrWordIndex( -1 );
        loopThrough( currWordIndex );
    }

    const reset = ( ) => {
        clearTimeout( timeout );
        setcurrWordIndex( -1 );
    }

    useEffect( ( ) => {   
        
        if ( canStart ) {
            start();
        }

        return ( ) => {
            reset();
        }
    } , [ canStart ] );

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
        color: 'black', fontWeight: '700'
    }
});


// activityType = words | sentances.
function ActivityHandler ( { activity_id , activityWords , activityType , delay , navigate } ) {

    const { startRecording , stopRecording } = UseAudio();

    const reducer = ( state , action ) => {
        switch ( action.type ) {
            case "NOT STARTED":
                return { state: 0 , disabled: false , text: 'Start Activity' }
            case "PROGRESS":
                return { state: 1 , disabled: true , text: 'Activity In Progress' }
            case "ENDED":
                return { state: 2 , disabled: true  , text: 'Activity Ended' }
            default:
                return state;
        }
    }

    // use useReducer here.
    // 0 = start , 1 = progress , 2 = ended.
    const [ activityState , dispatchActivity ] = useReducer( reducer , { state: 0 , canClickButton: true  , text: 'Start Activity' } );
    const [ activityEndTick , setActivityEndTick ] = useState( 3 );


    async function loopThroughTillEnd ( index ) {
        let end = 0;
        let timeout = null;
        let nextNum = index - 1;

        if ( index > end ) {     
            timeout = setTimeout( ( ) => { 
                setActivityEndTick( nextNum );
                loopThroughTillEnd( nextNum ); 
            } , 1200 );
        } 
        else if ( index == end ) {
            authActivityNavigating( 'TO-SCREEN-END' , navigate ); 
            dispatchActivity({ type: "ENDED" });
            console.log('end, go to the end screen');
        }
    }

    const startActivity = ( ) => {
        console.log('start activity recording');
        startRecording();
    }

    const endActivity = async ( ) => {
        try {
            loopThroughTillEnd( activityEndTick );
            let audio = await stopRecording();
            console.log( 'completed activity: ' , audio );
            CompletedWorkRequests.saveSubscriptionWork({ 
                activity_id , audio
            })
            .catch( err => {
                console.log( 'had an error with ending activity' )
            })
        }
        catch (err) {
            console.log( err )
        }
    }

    return (
        <View style={ [ styles.container ] }>
            <View style={{ flex: 3 }}>
                   <ActivitySentances words={ activityWords } 
                                   interval={ delay } state={ activityState.state } 
                                   canStart={ activityState.state == 1 }
                                   startActivitycallback={ startActivity }
                                   endActivitycallback={ endActivity } 
                    />
            </View>
         
            <View style={[ styles.center , { flex: 3 }]}>

                { activityState.state == 2 &&  
                    <View style={ [styles.center , { marginBottom: 30 } ] }>
                            <NativeTextParagraph color={ 'black' } size={ 'md' }>
                                    Navigating to the end screen in ...
                                    { activityEndTick }
                            </NativeTextParagraph>
                    </View>
                }

                <TouchableWithoutFeedback disabled={ activityState.disabled } onPress={ ( ) => dispatchActivity({ type: "PROGRESS" }) }>
                    <View style={ [ HandlerStyles.button , activityState.disabled == HandlerStyles.buttonDisabled ] }>
                        <NativeTextHeading color={ activityState.disabled ? 'grey' : 'white' } size={ 'sm' }>
                           { activityState.text }
                        </NativeTextHeading>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </View>           
    )
}


const HandlerStyles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor: "black",
        paddingVertical: 30 , paddingHorizontal: 20 , borderRadius: 6
    },

    buttonDisabled: {
        backgroundColor: "#DDDDDD"
    }
});


export default function ActivityStarting ( { navigation , route } ) {

    const [ activity , setActivity ] = useState({ words: [] , delay: 0 , type: '' , activity_id: '' });

    useEffect( ( ) => {

        let { words , delay , type , activity_id } = route.params;

        setActivity({
            words , 
            delay: parseInt( delay * 1000 ) , 
            type , 
            activity_id 
        });
    } , [ ] );

    return (
        <AppAuthedTemplate navigation={ navigation }>
            <View style={[ styles.container ]}>
                <View style={[ styles.center , { flex: 1.75 }]}>
                     <NativeTextHeading size={ 'xl' } color={ 'black' }>
                            Activity
                     </NativeTextHeading>
                </View>
                <View style={{ flex: 4.25 }}>
                    <ActivityHandler 
                        activityWords={ activity.words }
                         activityType={ activity.type } 
                                delay={ activity.delay }  
                          activity_id={ activity.activity_id }
                             navigate={ navigation.navigate } 
                    />
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