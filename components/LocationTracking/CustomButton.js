import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({
    onPress = () => {},
    btnStyle = {},
    btnText
}) => {
  return (
    <TouchableOpacity onPress={onPress} style = {{...styles.btnStyle, btnStyle}}>
        <Text>{btnText}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btnStyle: {
        height: 48,
        backgroundColor: 'white',
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    }
})

export default CustomButton