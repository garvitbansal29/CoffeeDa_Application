import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Button, Text, TextInput, ActivityIndicator} from 'react-native-paper';
import {styles, backgroundStyles} from '../../Components/AppStyle';

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
        navigation.navigate('SignIn');
        console.log(`Registration Successful, ID: ${responseJson.id}`);
      })
      .catch((error) => {
        setLoading(false);
        console.log(`Error: ${error}`);
      });
  };

  if (isLoading) {
    return (
      <View style={{flex: 1}}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={backgroundStyles.containerWithAlignAndJustify}>
        <View style={styles.middle}>
          <Text style={styles.titleText}>Register</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TextInput
              style={styles.halfSizeTextInput}
              autoCompleteType="name"
              label="First Name"
              mode="outlined"
              onChangeText={(inputTxt) => setFirstName(inputTxt)}
              dense
            />
            <TextInput
              style={styles.halfSizeTextInput}
              autoCompleteType="name"
              label="Last Name"
              mode="outlined"
              onChangeText={(inputTxt) => setLastName(inputTxt)}
              dense
            />
          </View>
          <TextInput
            style={styles.fullSizeTextInput}
            autoCompleteType="email"
            label="Email"
            mode="outlined"
            onChangeText={(inputTxt) => setEmail(inputTxt)}
            dense
          />
          <TextInput
            style={styles.fullSizeTextInput}
            autoCompleteType="password"
            label="Password"
            mode="outlined"
            secureTextEntry
            onChangeText={(inputTxt) => setPassword(inputTxt)}
            dense
          />
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => handleRegistration()}
          >
            Register
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
