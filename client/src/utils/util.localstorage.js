import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeInStorage = async ( key , value ) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem( key , jsonValue)
  } catch (e) {
    // saving error
    console.log('error saving in storage' , e)
  }
}
  
export const getFromStorage = async ( key ) => {
  try {
    let data = await AsyncStorage.getItem( key );
    return JSON.parse( data );
  } catch(e) {
    // error reading value
    console.log('error fetching storage' , e )
  }
}