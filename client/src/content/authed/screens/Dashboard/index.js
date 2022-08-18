import { StyleSheet, Text, View , Button , FlatList , TouchableOpacity } from 'react-native';
import { useContext , useEffect } from 'react';
import { UserContext } from '../../../../contexts/context.user';
import AppAuthedTemplate from '../../template/index';
import { authDashboardScreens } from '../../../screenNames';
import NativeTextParagraph from '../../../../components/native/native.text.paragraph';


export default function Dashboard ( { navigation } ) {

    let { user } = useContext( UserContext );

    const navigate = ( link ) => {
        navigation.navigate( link );
    }

    return (
      <AppAuthedTemplate navigation={ navigation } disableBackButton={ true }>
            <View style={ styles.container }>
                  <FlatList  data={ Object.values( authDashboardScreens ) } keyExtractor={(item, index) => index.toString()} renderItem={( { item , index } ) => 
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
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', 
    },
    item: {
      marginVertical: 20 , textAlign: 'center'
    }
});