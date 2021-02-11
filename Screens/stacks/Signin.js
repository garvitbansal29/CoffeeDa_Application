import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Text, TextInput, ActivityIndicator} from 'react-native-paper';
import {} from 'react-native-gesture-handler';
import {setToken} from '../../Components/SessionToken';
import {styles, backgroundStyles} from '../../Components/AppStyle';

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
      <View style={backgroundStyles.containerWithAlignAndJustify}>
        <View style={styles.middle}>
          <Text style={styles.titleText}>Sign In</Text>
          <TextInput
            style={styles.fullSizeTextInput}
            autoCompleteType="email"
            label="Enter email"
            mode="outlined"
            onChangeText={(inputTxt) => setLoginEmail(inputTxt)}
            dense
          />
          <TextInput
            style={styles.fullSizeTextInput}
            autoCompleteType="password"
            label="Enter Password"
            mode="outlined"
            secureTextEntry
            onChangeText={(inputTxt) => setLoginPass(inputTxt)}
            dense
          />

          <Button
            style={styles.button}
            mode="contained"
            onPress={() => reqLogin()}
          >
            Log In
          </Button>
          <Button
            style={{alignItems: 'center', margin: 12}}
            onPress={() => navigation.navigate('SignUp')}
          >
            Click here to register
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

export default App;
