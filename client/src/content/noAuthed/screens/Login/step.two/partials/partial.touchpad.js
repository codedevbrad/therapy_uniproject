import { useState , useEffect } from 'react';
import { StyleSheet, Text, View , TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';


export default function TouchPad ( { resetOnRefresh , pinCode , addToPin , pinLength , completed , pinHighlight } ) {

    const keypadMethod = ( pin ) => {

        if ( pinCode.length == 0 ) {
            resetOnRefresh()
        }

        if ( ( pinCode.length + 1 ) == pinLength ) {
            let copy = [ ...pinCode ];
            copy.push( pin );
            addToPin( copy );
            completed( copy.join(""));
        } else { 
            let copy = [ ...pinCode ];
            copy.push( pin );
            addToPin( copy );
        }
    }

    const keypadDeleteMethod = ( ) => {
        let pincodeCopy = [ ...pinCode ];
        pincodeCopy.pop();
        addToPin( pincodeCopy );
        console.log('delete keypad pin')
    }
 

    const Method = ( action , value ) => {
        
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        switch( action ) {
            case 'add':
              keypadMethod( value )
              return;
            case 'ignore':
              return;
            case 'delete':
              keypadDeleteMethod();
        }
    }

    const [ touchpad , setTouchpad ] = useState([
        [ 
          { value: '1' , action: 'add' } , 
          { value: '2' , action: 'add' } , 
          { value: '3' , action: 'add' } 
        ] ,
        [ 
          { value: '4' , action: 'add' } , 
          { value: '5' , action: 'add' } , 
          { value: '6' , action: 'add' }
        ] , 
        [ 
          { value: '7' , action: 'add' } , 
          { value: '8' , action: 'add' } , 
          { value: '9' , action: 'add' } 
        ] ,
        [ 
          { value: ''  , action: 'ignore' } , 
          { value: '0' , action: 'add'    } , 
          { value: <Feather name="delete" size={24} color="white" /> , action: 'delete' }
        ]
    ]);

    useEffect( ( ) => {
        console.log('touchpad component restarted'); 
        addToPin( [ ] );
    } , [ ] );

    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
              { touchpad.map( ( row , index ) =>
                  <View style={ touchStyles.container } key={ `key-${ index }`}> 
                        { row.map( ( item , rowIndex ) => 
                            <TouchableHighlight 
                                    onPress={ () => Method( item.action , item.value ) } 
                              activeOpacity={0.6}
                              underlayColor={ pinHighlight }
                              style={ touchStyles.key } 
                              key={ `index-${ rowIndex }`}
                            > 
                                  <Text style={ touchStyles.text } key={ `row-${ rowIndex }`}> 
                                      { item.value }
                                  </Text>  
                            </TouchableHighlight>
                        )}
                  </View>
               )}
        </View>
    )
}


const touchStyles = StyleSheet.create({
    container: {
      flex: 1 , 
      flexDirection: 'row',
      height: '25%'
    } , 
    key: {
      flex: 0,
      flexBasis: '33.33%', 
      alignContent: 'center',
      justifyContent: 'center',
      borderRadius: 10
    } , 
    text: {
      textAlign: 'center',
      color: 'white',
      fontWeight: "900"
    }
});