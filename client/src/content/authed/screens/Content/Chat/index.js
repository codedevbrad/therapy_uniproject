import { StyleSheet, View , FlatList } from 'react-native';
import { useState , useContext } from 'react';
import AppAuthedTemplate from '../../../template/index';
import NativeTextParagraph from '../../../../../components/native/native.text.paragraph';
import { UserContext } from '../../../../../contexts/context.user';
import { timeSinceDate } from '../../../../../utils/momentFunctions';
import NativeCustomAvatarImageCircle from '../../../../../components/custom/custom.AvatarImageCircle';


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

                   <ChatTimeStamp timeStamp={ message.timeStamp } color={ color} styling={{  marginBottom: 13 }} />
                   
                   <View style={ { flexDirection: 'row' , alignItems: 'center' } }>

                      <NativeCustomAvatarImageCircle uri={ avatarUrl } />

                      <NativeTextParagraph color={ color } styling={ { marginLeft: 10 } }>
                            { username }
                      </NativeTextParagraph>
                   </View>

                   <NativeTextParagraph color={ color } styling={ { padding: 10 } }>
                        { message.text }
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

    const [ chats , setchats ] = useState([
          {
              sentBy: 'patient' , 
              text: 'hi there, great to start therapy with you' , 
              timeStamp: '2022-08-06T20:36:14.000+00:00'
          } , 
          {
            sentBy: 'therapist' , 
            text: 'Hi. Yes, great to meet you on here' , 
            timeStamp: '2022-08-07T15:20:14.000+00:00'
        }
     ]);

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