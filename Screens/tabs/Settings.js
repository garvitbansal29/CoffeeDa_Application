import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {Button, TextInput, Title} from 'react-native-paper';
import {} from 'react-native-gesture-handler';

import {getUserDetails, updateUserDetails} from '../../Components/apiUtils';

const App = () => {
  const [isDisabled, setIsDisabled] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function getUserInfo() {
    const userInfo = await getUserDetails({userID: 9});
    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
    setEmail(userInfo.email);
  }

  const updateUserInfo = async () => {
    const response = await updateUserDetails({
      firstName,
      lastName,
      email,
      password,
      userID: 9,
    });
    if (response) {
      Alert.alert('Update Successful');
      setIsDisabled(true);
      await getUserInfo();
    } else {
      Alert.alert('Update Unsuccessful');
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <View>
      <Title style={{alignSelf: 'center', color: 'black'}}> Account</Title>

      <Button
        mode="outlined"
        style={{alignSelf: 'flex-end', height: 40, width: 100}}
        onPress={() => setIsDisabled(!isDisabled)}
      >
        Edit
      </Button>
      <TextInput
        disabled={isDisabled}
        style={{margin: 0, padding: 0}}
        mode="outlined"
        value={firstName}
        placeholder="First Name"
        onChangeText={(text) => setFirstName(text)}
        left={<TextInput.Icon name="account" onPress={() => {}} />}
      />
      <TextInput
        disabled={isDisabled}
        style={{margin: 0, padding: 0}}
        mode="outlined"
        value={lastName}
        placeholder="Second Name"
        onChangeText={(text) => setLastName(text)}
        left={<TextInput.Icon name="account" onPress={() => {}} />}
      />
      <TextInput
        disabled={isDisabled}
        style={{margin: 0, padding: 0}}
        mode="outlined"
        value={email}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        left={<TextInput.Icon name="email" onPress={() => {}} />}
      />
      <Button disabled={isDisabled} onPress={() => updateUserInfo()}>
        Submit
      </Button>
    </View>
  );
};

export default App;
