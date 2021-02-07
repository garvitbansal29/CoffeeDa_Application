import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#566EA4',
  },
  middle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 150,
    marginHorizontal: 70,
  },
});

const App = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPass] = useState('');
  const [returnToken, setToken] = useState('');

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
        setToken(responseJson.session_token);
        setLoading(false);
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
    <View style={styles.container}>
      <View style={styles.middle}>
        <Text>Signin Page</Text>
        <TextInput
          autoCompleteType="email"
          placeholder="Enter email"
          onChangeText={(inputTxt) => setLoginEmail(inputTxt)}
        />
        <TextInput
          autoCompleteType="password"
          placeholder="Enter Password"
          secureTextEntry
          onChangeText={(inputTxt) => setLoginPass(inputTxt)}
        />
        <Button title="Submit" onPress={() => reqLogin()} />
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text>Click here to register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
