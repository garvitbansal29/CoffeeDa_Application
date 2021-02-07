import React, {useState} from 'react';
import {Button, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const App = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginEmail, setEmail] = useState('');
  const [loginPassword, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleRegistration = () => {
    setLoading(true);
    return fetch('http://10.0.2.2:3333/api/1.0.0/user', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        navigation.navigate('home');
        console.log(`Registration Successful, ID: ${responseJson.id}`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(`Error: ${error}`);
      });
  };

  return (
    <View>
      <TextInput
        autoCompleteType="name"
        placeholder="Enter First Name"
        onChangeText={(inputTxt) => setFirstName(inputTxt)}
      />
      <TextInput
        autoCompleteType="name"
        placeholder="Enter Last Name"
        onChangeText={(inputTxt) => setLastName(inputTxt)}
      />
      <TextInput
        autoCompleteType="email"
        placeholder="Enter Email"
        onChangeText={(inputTxt) => setEmail(inputTxt)}
      />
      <TextInput
        autoCompleteType="password"
        placeholder="Enter Password"
        secureTextEntry
        onChangeText={(inputTxt) => setPassword(inputTxt)}
      />
      <Button title="Register" onPress={() => handleRegistration()} />
    </View>
  );
};

export default App;
