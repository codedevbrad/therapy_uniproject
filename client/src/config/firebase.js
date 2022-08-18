// v9 compat packages are API compatible with v8 code
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'; 
import Constants from 'expo-constants';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    databaseURL: Constants.manifest.extra.databaseURL
};

let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} 
else {
    app = firebase.app();
}

const db = firebase.firestore();


const sanatizeData = async ( querySnapshot ) => {
    let data = [ ];
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
       data.push( doc.data() );
    });
    return data[0];
} 
  
  
const useFetchChats = ( saveToState ) => {
    useEffect( ( ) => {
        db.collection("chats").where("patient_id", "==", "62f021c297e5dd1b15ca5334").onSnapshot( async ( querySnapshot ) => {
            let chats = await sanatizeData( querySnapshot );
            saveToState( chats.messages );
         });
    }, [ ] );
}

  
export { db , useFetchChats };