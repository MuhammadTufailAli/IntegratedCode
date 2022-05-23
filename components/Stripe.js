import React from 'react';
import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import axios from 'axios';

export default function Stripe() {
  const stripe = useStripe();
  const getName = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
      };
      const url = 'http://10.113.49.146:6000/pay';

      const res = await axios.post(url, {name});
      const clientSecret = res.data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Merchant Name',
      });
      if (initSheet.error) return console.log(initSheet.error);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: clientSecret,
      });
      if (presentSheet.error) return console.log(presentSheet.error);
      alert('Payment Succeeded');
    } catch (error) {
      alert(error);
    }
  };
  const [name, setName] = React.useState('');
  return (
    <StripeProvider publishableKey="pk_test_51KwsYLCVaKSWzmtARFDdho1GLcbWNjwfEN70wYx3KjNOyC5e75FlDocnJokvvF8zSzQAL0RmVJMZufZO7ZiZLS2J00QClpJ7TF">
      <View style={styles.page}>
        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          name="name"
          onChangeText={setName}
        />
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={getName}>
            Submit
          </Text>
        </Pressable>
      </View>
    </StripeProvider>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    width: 200,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
