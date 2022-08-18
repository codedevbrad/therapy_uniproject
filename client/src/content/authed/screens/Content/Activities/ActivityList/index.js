import { StyleSheet, Text, View , Button , FlatList , TouchableOpacity } from 'react-native';
import { useEffect , useState } from 'react';
import AppAuthedTemplate from '../../../../template/index';
import NativeTextParagraph from '../../../../../../components/native/native.text.paragraph';
import { ActivityTemplateRequests } from '../../../../../../networkRequests';


export default function ActivitiesList ( { navigation } ) {

    const [activities, setactivities] = useState([]);

    const fetchContent = async( ) => {
        try {
            let activities = await ActivityTemplateRequests.fetchTemplates();
            setactivities( activities );
        } 
        catch ( err ) {
            console.log('error fetching activities');
            console.log( err );
        }
    }

    const navigate = ( link ) => {
        navigation.navigate( 'Activity' );
    }

    useEffect ( ( ) => {
        fetchContent( );
    } , [ ] );

    return (
      <AppAuthedTemplate navigation={ navigation }>

                  <View style={ styles.container }>
                      <FlatList data={ activities } keyExtractor={(item, index) => index.toString()} renderItem={( { item , index } ) => 

                          <TouchableOpacity onPress={ ( ) => navigate( item ) } key={ `activityList-link__${ index }`} style={{
                              flexDirection: 'row' , backgroundColor: 'lightblue' , marginVertical: 10 , justifyContent: 'center' , borderRadius: 10 ,
                              padding: 12 , alignItems: 'center'
                          }}> 

                                <View style={{ flexDirection: 'row' }}> 
                                      { item.articulation.map( ( word , index  ) => 
                                          <NativeTextParagraph color={ 'white' } size={ 'md' } key={ `activityListItem-link__${ index }`} styling={
                                            [ styles.item ,
                                               { backgroundColor: 'black' , marginHorizontal: 10 , borderRadius: 20 , padding: 8 }
                                            ]}>
                                              { word }
                                          </NativeTextParagraph> 
                                      )}
                                </View>    

                                <NativeTextParagraph color={ 'black' } size={ 'md' } keyIndex={ `activityListItem-link__${ index }`} styling={ styles.item }>
                                    { item.type }
                                </NativeTextParagraph> 

                          </TouchableOpacity>

                      } /> 
                 </View>
                 
      </AppAuthedTemplate>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 6, 
      justifyContent: 'center',
      alignItems: 'center', 
      flexDirection: 'row' , 
      padding: 20
    },
    item: {
      margin: 10 , 
    }
});