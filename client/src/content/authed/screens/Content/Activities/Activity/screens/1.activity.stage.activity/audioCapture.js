import React , { useState } from 'react';
import { Audio } from 'expo-av';
import base64 from 'react-native-base64';

// https://docs.expo.dev/versions/latest/sdk/audio/#usage
// https://stackoverflow.com/questions/67833814/expo-av-audio-recording
// https://stackoverflow.com/questions/71017649/how-to-get-expo-audio-recording-content-as-base64
// how audio uri can be converted. why a uri isnt a audio file.
// how do i get a sound file from the EXPO audio URI?
// can I ask the question on stackoverflow?

export default function UseAudio ( ) {

    const [ recording  , setRecording ]  = useState( new Audio.Recording() );

    async function startRecording ( ) {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
              allowsRecordingIOS: true,
              playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            await recording.prepareToRecordAsync(
              Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            await recording.startAsync();
            console.log('Recording started');
          }
        catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording ( ) {
        console.log('Stopping recording..');

        let updatedRecording = { };

        await recording.stopAndUnloadAsync();
        
        const uri = recording.getURI();

        const { sound , status } = await recording.createNewLoadedSoundAsync();

        updatedRecording = {
               sound: sound,
            duration: getDurationFormatted(status.durationMillis),
                file: uri,
        };

        function getDurationFormatted(millis) {
            const minutes = millis / 1000 / 60;
            const minutesDisplay = Math.floor(minutes);
            const seconds = Math.round((minutes - minutesDisplay) * 60);
            const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
            return `${minutesDisplay}:${secondsDisplay}`;
          }        
      
        // utitlity function to convert BLOB to BASE64
        const blobToBase64 = (blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          return new Promise((resolve) => {
            reader.onloadend = () => {
              resolve(reader.result);
            };
          });
        };
      
        // Fetch audio binary blob data
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", uri , true);
          xhr.send(null);
        });
      
        const audioBase64 = await blobToBase64(blob);

        blob.close();

        return audioBase64;
  
    }

    return {
        startRecording , stopRecording
    }
}