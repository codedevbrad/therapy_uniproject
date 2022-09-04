import { StyleSheet, View , FlatList } from 'react-native';
import { useState , useContext ,useEffect } from 'react';
import AppAuthedTemplate from '../../../template/index';
import NativeTextParagraph from '../../../../../components/native/native.text.paragraph';
import { UserContext } from '../../../../../contexts/context.user';
import { timeSinceDate } from '../../../../../utils/momentFunctions';
import NativeCustomAvatarImageCircle from '../../../../../components/custom/custom.AvatarImageCircle';

import { useFetchChats } from '../../../../../config/firebase';

function ChatTimeStamp ({ timeStamp , color = 'black' , styling }) {
    return (
        <View style={ styling }>
            <NativeTextParagraph color={ color }>
                { timeSinceDate( timeStamp )}
            </NativeTextParagraph>
        </View>
    )
}

function ChatMessage( { message } ) {

   const { user } = useContext(UserContext);

   
    const Card = ({ username , avatarUrl , cardColor , color  }) => {

        return (
            <View style={ [ styles.messageSharable , { backgroundColor: cardColor , padding: 20  }] }>

                   <ChatTimeStamp timeStamp={ message.timestamp } color={ color} styling={{  marginBottom: 13 }} />
                   
                   <View style={ { flexDirection: 'row' , alignItems: 'center' } }>

                      <NativeCustomAvatarImageCircle uri={ avatarUrl } />

                      <NativeTextParagraph color={ color } styling={ { marginLeft: 10 } }>
                            { username }
                      </NativeTextParagraph>
                   </View>

                   <NativeTextParagraph color={ color } styling={ { padding: 10 } }>
                        { message.message }
                   </NativeTextParagraph>
            </View>
        )
    }

    return (
        <View style={{ margin: 10 }}>
            { message.sentBy == 'patient' &&  

                 <Card username={ user.username } avatarUrl={ user.avatarUrl}  cardColor={ 'navy' } color={ 'white' }  /> }

            { message.sentBy == 'therapist' &&  

                 <Card username={ 'therapist'}    
                          avatarUrl={ 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }  
                          cardColor={ 'whitesmoke' } 
                              color={ 'black' }  
                 /> 
            }
        </View>
    )
}

export default function ChatScreen ( { navigation } ) {
 
    const [ chats , setChats ] = useState([]);
    const { user } = useContext(UserContext);

    useFetchChats( setChats , user._id );

    return (
      <AppAuthedTemplate navigation={ navigation } canGoBack={ true }>
            <View style={ styles.container }>
                 <FlatList data={ chats } keyExtractor={( item, index) => index.toString()} renderItem={( { item , index } ) => 
                     <ChatMessage message={ item } index={ index } />
                 }/>
            </View>
      </AppAuthedTemplate>
    );
}


const styles = StyleSheet.create({

    container: {
      flex: 1,
    },

    item: {
      margin: 10 , 
    },

    messageSharable: {
      padding: 10 , borderRadius: 15
    } 
});