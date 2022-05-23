import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Home({navigation}) {
  return (
    <View style = {styles.container}>
      <TouchableOpacity style = {styles.button} onPress={() => {
        navigation.navigate('Login')
      }} >
          <Text>Video Call</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button} onPress={() => {
        navigation.navigate('Stripe')
      }}>
          <Text>Stripe</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button} onPress={() => {
        navigation.navigate('location')
      }}>
          <Text>Tracking</Text>
      </TouchableOpacity>
      <TouchableOpacity style = {styles.button} onPress={() => {
        navigation.navigate('Expense')
      }}>
          <Text>Expenses</Text>
      </TouchableOpacity>
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
  button: {
    backgroundColor: 'yellow',
    padding: 15,
    margin: 10,
    width: 150,
    alignItems: 'center',
  }
})