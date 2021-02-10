import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {} from 'react-native-gesture-handler';
import {setToken} from '../../Components/SessionToken';
import {styles} from '../../Components/AppStyle';

const App = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPass] = useState('');
  // const [returnToken, setToken] = useState('');

  const reqLogin = () => {
    setLoading(true);
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: loginEmail,
        password: loginPassword,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setToken(responseJson.token);
        navigation.navigate('home');
        console.log(`Login Successful, ID: ${responseJson.id}`);
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
      <View style={styles.container}>
        <View style={styles.middle}>
          <Text style={styles.titleText}>Sign In</Text>
          <TextInput
            style={styles.textInput}
            autoCompleteType="email"
            label="Enter email"
            mode="flat"
            onChangeText={(inputTxt) => setLoginEmail(inputTxt)}
            dense
          />
          <TextInput
            style={styles.textInput}
            // autoCompleteType="password"
            label="Enter Password"
            mode="flat"
            // secureTextEntry
            onChangeText={(inputTxt) => setLoginPass(inputTxt)}
          />

          <Button
            style={styles.button}
            mode="contained"
            onPress={() => reqLogin()}>
            Log In{' '}
          </Button>
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => navigation.navigate('SignUp')}>
            <Text>Click here to register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
