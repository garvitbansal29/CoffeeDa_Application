import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import {styles, backgroundStyles} from '../../Components/AppStyle';
import Colours from '../../Components/ColourPallet';
import Spinner from 'react-native-loading-spinner-overlay';

const App = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loginEmail, setEmail] = useState('');
  const [loginPassword, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

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
        setErrorStatus(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(`Error: ${error}`);
        setErrorStatus(true);
      });
  };

  // if (isLoading) {
  //   return (
  //     <View style={{flex: 1}}>
  //       <ActivityIndicator size="small" color="#0000ff" />
  //     </View>
  //   );
  // }
  const InvalidLoginText = () => {
    return (
      <Text style={{alignSelf: 'center', color: Colours.error, marginTop: 6}}>
        Invalid: Please Enter all the fields
      </Text>
    );
  };
  return (
    <View style={backgroundStyles.containerWithAlignAndJustify}>
      <Spinner
        visible={isLoading}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />
      <View style={styles.middle}>
        <Text style={styles.titleText}>Register</Text>
        {errorStatus ? <InvalidLoginText /> : null}
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
  );
};

export default App;
