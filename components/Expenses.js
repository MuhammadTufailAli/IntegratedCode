import React from 'react';
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Expenses() {
  const [uri, setUri] = React.useState();

  const openGalery = async() => {
    let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, 
    }
    launchImageLibrary((options, response) => {
      if(response.didCancel){
        alert('Cancel')
      }
      else
      {
        setUri(response.assets[0].base64)
      }
    })
  }
  return (
    <View style = {styles.container}>
      <Text style = {{fontSize: 28, fontWeight: 'bold', color: 'yellow'}}>Upload Expenses</Text>
      {uri ? <Image source={{uri: 'data:image/png;base64,' +uri}} style = {{width: 300, height: 300, marginBottom: 30, marginTop: 30}}/>: null}
      <Pressable style = {styles.btn} onPress={openGalery} ><Text>Upload Image</Text></Pressable>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  btn: {
    backgroundColor: 'yellow',
    padding: 10
  }
})
