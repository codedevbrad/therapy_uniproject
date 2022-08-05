import { StyleSheet, Text, View , Button } from 'react-native';
import { useContext , useEffect } from 'react';
import { UserContext } from '../../../../contexts/context.user';
import AppAuthedTemplate from '../../template/index';


export default function Dashboard ( { navigation } ) {

    let { user } = useContext( UserContext );

    const fetchContent = async( ) => {
        console.log( user );
    }

    useEffect(() => {
       fetchContent( );
    }, [ ]);

    return (
      <AppAuthedTemplate navigation={ navigation }>
            <View>
              
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
});