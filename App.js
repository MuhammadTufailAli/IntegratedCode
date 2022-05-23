import React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Stripe from './components/Stripe';
import Expenses from './components/Expenses';
import LocationHome from './components/LocationTracking/LocationHome';
import ChooseLocation from './components/LocationTracking/ChooseLocation';
import FlashMessage from "react-native-flash-message";
import Login from './components/VideoCall/Login';
import ContactScreen from './components/VideoCall/ContactScreen';
import CallScreen from './components/VideoCall/CallScreen';
import CallingScreen from './components/VideoCall/CallingScreen';
import IncommingCallScreen from './components/VideoCall/IncommingCallScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stripe" component={Stripe} />
        <Stack.Screen name="Expense" component={Expenses} />
        <Stack.Screen name="location" component={LocationHome} />
        <Stack.Screen name="chooseLocation" component={ChooseLocation} />
        <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Contacts" component={ContactScreen} />
            <Stack.Group screenOptions = {{headerShown: false}}>
                <Stack.Screen name="Call" component={CallScreen}/>
                <Stack.Screen name="Calling" component={CallingScreen} />
                <Stack.Screen name="IncommingCall" component={IncommingCallScreen} />
            </Stack.Group>
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
