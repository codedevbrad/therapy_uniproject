import { StyleSheet, Text, View , Button , FlatList , TouchableOpacity } from 'react-native';
import { useEffect } from 'react';
import AppAuthedTemplate from '../../../template/index';

import NativeTextParagraph from '../../../../../components/native/native.text.paragraph';


export default function ActivitiesList ( { navigation } ) {

    const navigate = ( link ) => {
        navigation.navigate( link );
    }

    useEffect(() => {
    }, [ ]);

    return (
      <AppAuthedTemplate navigation={ navigation }>
            <View style={ styles.container }>
                  <FlatList data={[ 'single words' , 'paragraphs' ]} keyExtractor={(item, index) => index.toString()} renderItem={( { item , index } ) => 
                      <TouchableOpacity onPress={ ( ) => navigate( item ) } key={ `activityList-link__${ index }`}> 
                          <NativeTextParagraph color={ 'black' } size={ 'md' } keyIndex={ `activityListItem-link__${ index }`} styling={ styles.item }>
                              { item }
                          </NativeTextParagraph> 
                      </TouchableOpacity>}
                  />
            </View>
      </AppAuthedTemplate>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      margin: 10 , 
    }
});