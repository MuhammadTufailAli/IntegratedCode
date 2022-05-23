import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CallActionBox from './CallActionBox';

export default function CallScreen() {
  return (
    <View style = {styles.page}>
      <View style = {styles.cameraPreview} />
        <CallActionBox />
     </View>
  );
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: 'black',
    },
    cameraPreview: {
        width: 100,
        height: 150,
        backgroundColor: 'red',
        position: 'absolute',
        right: 10,
        top: 100,
        borderRadius: 10
    },
})
