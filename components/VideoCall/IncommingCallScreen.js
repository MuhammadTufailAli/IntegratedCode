import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Voximplant } from 'react-native-voximplant'

export default function IncommingCallScreen({route, navigation}) {
    const {call} = route.params;
    const [caller, setCaller] = React.useState('');
    const voximplant = Voximplant.getInstance();

    const onDecline = () => {
        call.decline();
    }

    const onAccept = () => {
        navigation.navigate('Calling', { call, isIncomingCall: true});
    }

    React.useEffect(() => {
        setCaller(call.getEndpoints()[0].displayName);
        call.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
            navigation.navigate('Contacts');
        });
        
        return () => {
            call.off(Voximplant.CallEvents.Disconnected);
        };
    }, [call]);
  return (
    <View style = {styles.page}>
        <View style = {styles.container}>
            <Text style = {styles.name}>{caller}</Text>
            <Text style = {styles.phone}>ringing</Text>
        </View>
        <View style = {[styles.row, {marginTop: 'auto'}]}>
            <View style = {styles.iconsContainer}>
                <Ionicons name='alarm' color={"white"} size = {30}/>
                <Text style = {styles.iconsText}>Remind me</Text>
            </View>
            <View style = {styles.iconsContainer}>
                <Entypo name='message' color={"white"} size = {30}/>
                <Text style = {styles.iconsText}>Message</Text>
            </View>
        </View>

        <View style = {styles.row}>
            <Pressable style = {styles.iconsContainer} onPress = {onDecline}>
                <View style = {styles.iconButtonContainer}>
                    <Feather name='x' color={"white"} size = {30}/>
                </View>
                <Text style = {styles.iconsText}>Decline</Text>
            </Pressable>
            <Pressable style = {styles.iconsContainer} onPress = {onAccept}>
                <View style = {[styles.iconButtonContainer, {backgroundColor: 'yellow'}]}>
                    <Feather name='check' color={"white"} size = {30}/>
                </View>
                <Text style = {styles.iconsText}>Accept</Text>
            </Pressable>
        </View>
     </View>
  );
}

const styles = StyleSheet.create({
    page: {
        height: '100%',
        backgroundColor: 'black',
        alignItems: 'center',
        paddingBottom: 30
    },
    container: {
        alignItems: 'center'
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
    row: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    iconsContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    iconsText: {
        color: 'white',
        marginTop: 10
    },
    iconButtonContainer: {
        backgroundColor: 'red',
        padding: 20,
        borderRadius: 50,
        margin: 10
    }
})