import { StyleSheet, Text, View, Pressable, PermissionsAndroid, Alert, } from 'react-native'
import React, {useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Voximplant } from 'react-native-voximplant'
import CallActionBox from './CallActionBox';

const CallingScreen = ({route, navigation}) => {
    const {user, call: incommingcall, isIncomingCall} = route.params;
    const [permissionGranted, setPermissionGranted] = React.useState(false);
    const [callState, setCallState] = React.useState('Initializing...');
    const [localVideoStreamId, setLocalVideoStreamId] = React.useState('');
    const [remoteVideoStreamId, setRemoteVideoStreamId] = React.useState('');
    const voximplant = Voximplant.getInstance();
    const call = useRef(incommingcall);
    const endpoint = useRef(null);

    const permissions = [
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.CAMERA
    ]

    React.useEffect(() => {
        const requestPermissions = async () => {
            const granted = await PermissionsAndroid.requestMultiple(permissions);
            const recordAudioGranted = granted[PermissionsAndroid.PERMISSIONS.RECORD_AUDIO] == 'granted';
            const cameraGranted = granted[PermissionsAndroid.PERMISSIONS.CAMERA] == 'granted';
            if (!cameraGranted || !recordAudioGranted) {
                Alert.alert('Permissions not granted');
            } 
            else {
                setPermissionGranted(true);
            }
        };

        if (Platform.OS == 'android') 
        {
            requestPermissions()
        } 
        else 
        {
            setPermissionGranted(true);
        }
    }, []);

    React.useEffect(() => {
        if(!permissionGranted){
            return
        }

        const callSettings = {
            video: {
                sendVideo: true,
                receiveVideo: true,
            },
        };

        const makeCall = async () => {
            call.current = await voximplant.call(user, callSettings);
            subscribeToCallEvent();
        };

        const answerCall = async () => {
            subscribeToCallEvent();
            endpoint.current = call.current.getEndpoints()[0];
            subscribeToEndpointEvents();
            call.current.answer(callSettings);
        };


        const subscribeToCallEvent = () => {
            call.current.on(Voximplant.CallEvents.Failed, (callEvent)  => {
                showCallError(callEvent.reason);
            });

            call.current.on(Voximplant.CallEvents.ProgressToneStart, (callEvent) => {
                setCallState('Calling...');
            });

            call.current.on(Voximplant.CallEvents.Connected, (callEvent) => {
                setCallState('Call connected');
            });

            call.current.on(Voximplant.CallEvents.Disconnected, (callEvent) => {
                navigation.navigate('Contacts');
            });
            call.current.on(Voximplant.CallEvents.LocalVideoStreamAdded, (callEvent) => {
                setLocalVideoStreamId(callEvent.videoStream.id);
            });
            call.current.on(Voximplant.CallEvents.EndpointAdded, callEvent => {
                endpoint.current = callEvent.endpoint;
                subscribeToEndpointEvents();
            });

        }

        const subscribeToEndpointEvents = () => {
            endpoint.current.on(
                Voximplant.EndpointEvents.RemoteVideoStreamAdded,
                (endpointEvent) => {
                    setRemoteVideoStreamId(endpointEvent.videoStream.id);
                },
            );
        }


        const showCallError = (reason) => {
            Alert.alert("Call failed", `Reason: ${reason}`, [{text: "OK", onPress: navigation.navigate('Contacts')}])
        }

        if(isIncomingCall){
            answerCall();
        }
        else{
            makeCall();
        }

        return() => {
            call.current.off(Voximplant.CallEvents.Failed);
            call.current.off(Voximplant.CallEvents.ProgressToneStart);
            call.current.off(Voximplant.CallEvents.Connected);
            call.current.off(Voximplant.CallEvents.Disconnected);
        }

    }, [permissionGranted])

    const onHangUpPress = () => {
        call.current.hangup();
    }
  return (
    <View style = {styles.page}>
        <Pressable style = {styles.backButton} onPress={() => {
            navigation.goBack();
        }}><Ionicons name = "chevron-back" size={25} color="white"/></Pressable>

        <View style = {styles.cameraPreview}>
            <Text style = {styles.name}>{user}</Text>
            <Text style = {styles.phone}>{callState}</Text>
        </View>

        <Voximplant.VideoView
            style={styles.remoteVideo}
            videoStreamId={remoteVideoStreamId}
        />

        <Voximplant.VideoView
            style={styles.selfView}
            videoStreamId={localVideoStreamId}
        />

        <CallActionBox onHangUpPress = {onHangUpPress}/>
    </View>
  )
}

export default CallingScreen

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
        marginTop: 30,
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
        paddingBottom: 30
    },
    iconButton: {
        backgroundColor: '#4a4a4a',
        padding: 10,
        borderRadius: 50,

    },
    backButton: {
        position: 'absolute',
        top: 45,
        left: 20,
        zIndex: 10
    },
    selfView: {
        width: 100,
        height: 150,
        position: 'absolute',
        right: 20,
        top: 450,
        borderRadius: 10,
        zIndex: 1
    },
    remoteVideo: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        borderRadius: 10
    }
})