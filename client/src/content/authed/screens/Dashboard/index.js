import { StyleSheet, Text, View , Button , FlatList , TouchableOpacity } from 'react-native';
import { useContext , useEffect } from 'react';
import { UserContext } from '../../../../contexts/context.user';
import AppAuthedTemplate from '../../template/index';

import { authDashboardScreens } from '../../../screenNames';

import NativeTextParagraph from '../../../../components/native/native.text.paragraph';


export default function Dashboard ( { navigation } ) {

    let { user } = useContext( UserContext );

    const fetchContent = async( ) => {
        console.log( user );
    }

    const navigate = ( link ) => {
        navigation.navigate( link );
    }

    useEffect(() => {
       fetchContent( );
    }, [ ]);

    return (
      <AppAuthedTemplate navigation={ navigation }>
            <View>
                  <FlatList data={ Object.values( authDashboardScreens ) }  keyExtractor={(item, index) => index.toString()} renderItem={( { item , index } ) => 
                      <TouchableOpacity onPress={ ( ) => navigate( item ) }> 
                          <NativeTextParagraph color={ 'black' } size={ 'md' } keyIndex={ `dashboard-link__${ index }`} styling={ styles.item }>
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      margin: 10 , 
    }
});