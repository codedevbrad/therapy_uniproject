import { useState } from 'react';
import { StyleSheet , View } from 'react-native';

export default function Pin ({ entered = 0 } ) {
    const [ pin , setPin ] = useState([ 1,2,3,4,5 ] );
    return (
        <View style={[ PinStyles.container ]}>
              { pin.map( ( item , index ) => 
                   <View style={ PinStyles.container } key={ `pin-index-${ index }`}> 
                        { entered >= item ?
                              <View style={ PinStyles.circle_entered }> 
                              </View>
                          : 
                              <View style={ PinStyles.circle }> 
                              </View>
                        }
                  </View> 
              ) }
        </View>
    )
}


const PinStyles = StyleSheet.create({
    container: {
      flex: 1 , 
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'center'
    } ,

    item: {
      flex: 1 , 
      textAlign: 'center',
      padding: 15
    } ,
    circle_entered: {
      height : 26 ,
      width  : 26 ,
      borderRadius: 1000,
      backgroundColor: 'white' 
    } , 
    circle: {
      height : 16 ,
      width :  16 ,
      borderRadius: 1000,
      backgroundColor: 'darkslateblue'
    }
});