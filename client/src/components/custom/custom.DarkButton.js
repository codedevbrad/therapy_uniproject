import { StyleSheet , View , TouchableWithoutFeedback } from 'react-native';

import NativeTextHeading from '../native/native.text.heading'; 


export default NativeCustomButtonDark = ( { children , styling , clickHandler = false , disabled = false } ) => {

    return (
        <TouchableWithoutFeedback disabled={ disabled } onPress={ clickHandler != false ? ( ) => clickHandler( ) : false }>
            <View style={ [ HandlerStyles.button , styling ] }>
                <NativeTextHeading color={ 'white' } size={ 'sm' }>
                     { children }
                </NativeTextHeading>
            </View>
        </TouchableWithoutFeedback>
    )
}

const HandlerStyles = StyleSheet.create({
        button: {
            alignItems: "center",
            backgroundColor: "black",
            paddingVertical: 30 , paddingHorizontal: 20 , borderRadius: 6
        }
});
    