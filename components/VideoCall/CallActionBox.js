import React from 'react';
import { View, Text, StyleSheet,Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CallActionBox({onHangUpPress}) {

  return (
    <View style = {styles.buttonContainer}>
            <View style = {styles.iconButton}>
                <Ionicons name='ios-camera-reverse' size={30} color = "white"/>
            </View>
            <View style = {styles.iconButton}>
                <MaterialIcons name='camera-off' size={30} color = "white"/>
            </View>
            <View style = {styles.iconButton}>
                <MaterialIcons name='microphone-off' size={30} color = "white"/>
            </View>
            <Pressable onPress={onHangUpPress} style = {[styles.iconButton, {backgroundColor: 'red'}]}>
                <MaterialIcons name='phone-hangup' size={30} color = "white"/>
            </Pressable>
            
        </View>
  );
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'black',
    },
    cameraPreview: {
        backgroundColor: '#7b4e80',
        flex: 1,
        alignItems: 'center',
        paddingTop: 10,
        paddingHorizontal: 10
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 50,
        marginBottom: 10
    },
    phone: {
        fontSize: 20,
        color: 'white'
    },
    buttonContainer: {
        backgroundColor: '#333333',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 30,
        marginTop: 'auto'
    },
    iconButton: {
        backgroundColor: '#4a4a4a',
        padding: 10,
        borderRadius: 50,

    }
})