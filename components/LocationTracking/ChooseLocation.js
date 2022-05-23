import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react';
import AddressPickup from './AddressPickup';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native'
import { showError, showSuccess } from './helper/HelperFunction';

const ChooseLocation = (props) => {
    const navigation = useNavigation();

    const [state, setState] = React.useState({
        destinationCords: {}
    })
    const {destinationCords} = state;

    const onDone = () => {
        const isValid = checkValidation()
        if(isValid) {
            props.route.params.getCoordinates({
            destinationCords
        })
        showSuccess("Ok")
        navigation.goBack();
        }
    }

    const fetchDestinationCords = (lat, lng) => {
        setState({...state, destinationCords: {
            latitude: lat,
            longitude: lng
        }})
    }

    const checkValidation = () => {
        if(Object.keys(destinationCords).length == 0){
            showError('Please Enter your Destination Location')
            return false;
        }
        return true;
    }
  return (
    <View style = {styles.container}>
      <ScrollView style = {{backgroundColor: 'white', flex: 1, padding: 24, }} keyboardShouldPersistTaps="handled">
        <AddressPickup placeholderText="Enter Drop Off Location" fetchAddress = {fetchDestinationCords}/>
        <View style = {{marginBottom: 16}}/>
        <CustomButton btnText = "Done" btnStyle={{marginTop: 30}} onPress = {onDone}/>
      </ScrollView>
    </View>
  )
}

export default ChooseLocation

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})