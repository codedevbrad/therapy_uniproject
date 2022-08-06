import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button } from 'react-native';

const AppNoAuthedTemplate = ({ children , screenColor = 'navy' }) => {
    return (
     <View style={[ styles.container , { backgroundColor: screenColor } ]}>
            { children } 
        <StatusBar style="auto" />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1 , 
      paddingTop: 20
    },
});
  
export default AppNoAuthedTemplate;