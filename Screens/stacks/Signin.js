import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {setToken, setUserID} from '../../Components/AsyncData';
import {styles, backgroundStyles} from '../../Components/AppStyle';
import {requestLogin} from '../../Components/apiUtils';

const App = ({navigation}) => {
  const [isLoading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [loginEmail, setLoginEmail] = useState('g@email.com');
  const [loginPassword, setLoginPass] = useState('password');

  const handleLogin = async () => {
    setSpinner(true);
    const response = await requestLogin({
      email: loginEmail,
      password: loginPassword,
    });
    setSpinner(false);

    console.log(response);
    if (response !== 'Unsuccessful') {
      setToken(response.token);
      setUserID(response.id.toString());
      navigation.navigate('home');
    }
  };

  return (
    // <ScrollView contentContainerStyle={{flexGrow: 1}}>
    <View style={backgroundStyles.containerWithAlignAndJustify}>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />
      <View style={styles.middle}>
        <Text style={styles.titleText}>Sign In</Text>
        <TextInput
          style={styles.fullSizeTextInput}
          autoCompleteType="email"
          label="Enter email"
          mode="outlined"
          value={loginEmail}
          onChangeText={(inputTxt) => setLoginEmail(inputTxt)}
          dense
        />
        <TextInput
          style={styles.fullSizeTextInput}
          autoCompleteType="password"
          label="Enter Password"
          mode="outlined"
          value={loginPassword}
          secureTextEntry
          onChangeText={(inputTxt) => setLoginPass(inputTxt)}
          dense
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleLogin()}
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
    // </ScrollView>
  );
};

export default App;
