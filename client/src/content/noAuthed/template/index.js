import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Button } from 'react-native';

const AppNoAuthedTemplate = ({ children }) => {
    return (
     <View style={styles.container}>
        <View>
            { children } 
        </View>
        <StatusBar style="auto" />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  
export default AppNoAuthedTemplate;