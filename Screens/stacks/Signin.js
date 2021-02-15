import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {setToken, setUserID} from '../../Components/AsyncData';
import {styles, backgroundStyles} from '../../Components/AppStyle';
import {requestLogin} from '../../Components/apiUtils';
import Colours from '../../Components/ColourPallet';

const App = ({navigation}) => {
  const [invalidReq, setInvalidReq] = useState(false);
  const [unsuccessfulReq, setUnsuccessfulReq] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [loginEmail, setLoginEmail] = useState('g@email.com');
  const [loginPassword, setLoginPass] = useState('password');

  const handleLogin = async () => {
    setSpinner(true);
    const response = await requestLogin({
      email: loginEmail,
      password: loginPassword,
    });

    if (response === 'invalid') {
      setInvalidReq(true);
    } else if (response === 'unsuccessful ') {
      setUnsuccessfulReq(true);
    } else {
      setInvalidReq(false);
      setToken(response.token);
      setUserID(response.id.toString());
      navigation.navigate('home');
    }

    setSpinner(false);
  };

  const InvalidLoginText = () => {
    return (
      <Text style={{alignSelf: 'center', color: Colours.error}}>
        Invalid Email or password
      </Text>
    );
  };

  const UnsuccessfullLoginText = () => {
    return (
      <Text style={{alignSelf: 'center', color: Colours.error}}>
        Unexpected Error:
      </Text>
    );
  };

  return (
    <View style={backgroundStyles.containerWithAlignAndJustify}>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />
      <View style={styles.middle}>
        <Text style={styles.titleText}>Sign In</Text>
        {invalidReq ? <InvalidLoginText /> : <View />}
        {unsuccessfulReq ? <UnsuccessfullLoginText /> : <View />}
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
  );
};

export default App;
