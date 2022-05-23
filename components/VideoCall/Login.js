import React from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Alert } from 'react-native';
import { Voximplant } from 'react-native-voximplant'

export default function Login({navigation}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const voximplant = Voximplant.getInstance();

    const appname = "video-call video-call.sajjad123.n2.voximplant.com"
    const accname = "sajjad123"
    const signIn = async () => {
        try {
            voximplant.login(
                `${username}@video-call.sajjad123.voximplant.com`, password,
            );
            navigation.reset({index: 0, routes: [{name: 'Contacts'}]});
        } 
        catch (e) {
            Alert.alert(e.name, `Error code: ${e.code}`);
        }
    }

    React.useEffect(() => {
        const connect = async () => {
            let clientState = await voximplant.getClientState();
            console.log("Status: ", clientState)
            if (clientState = Voximplant.ClientState.DISCONNECTED) {
                await voximplant.connect();
            } 
            else if (clientState = Voximplant.ClientState.LOGGED_IN) {
                navigation.reset({index: 0, routes: [{name: 'Contacts'}]});
                return;
            }
        };
        connect();
    }, [username])
  return (
    <View style = {styles.page}>
      <Text style = {{textAlign: 'center'}}>Login</Text>
      <TextInput placeholder='Username' style = {styles.input} onChangeText = {setUsername} autoCapitalize = "none"/>
      <TextInput placeholder='Password' secureTextEntry style = {styles.input} onChangeText = {setPassword}/>

        <Pressable style = {styles.button} onPress = {signIn}>
            <Text style = {styles.text}>Login</Text>
        </Pressable>
     </View>
  );
}

const styles = StyleSheet.create({
  page: {
      padding: 10,
      alignItems: 'stretch',
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'black'
  } ,
  input: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'yellow'
  },
  button: {
      backgroundColor: 'yellow',
      padding: 10,
      marginVertical: 10,
      borderRadius: 5,
      alignItems: 'center'
  },
  text: {
      color: 'black'
  } 
})