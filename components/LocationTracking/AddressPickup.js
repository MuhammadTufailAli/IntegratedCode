import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const AddressPickup = ({
    placeholderText,
    fetchAddress
}) => {
    const onPressAddress = (data, details) => {
        const lat = details.geometry.location.lat;
        const lng = details.geometry.location.lng;
        fetchAddress(lat, lng)
    }
  return (
    <View style = {StyleSheet.container}>
      <GooglePlacesAutocomplete
      placeholder={placeholderText}
      onPress={onPressAddress}
      fetchDetails = {true}
      query={{
        key: 'AIzaSyCehTiHyabP2UeQKY09u8E18wS3BBc3Bvo',
        language: 'en',
      }}
      styles = {{
          textInputContainer: styles.containerStyle,
          textInput: styles.textInput
      }}
    />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    containerStyle: {
        backgroundColor: 'white'
    },
    textInput: {
        height: 48,
        color: 'black',
        fontSize: 16,
        backgroundColor: '#F3F3F3'
    }
})

export default AddressPickup