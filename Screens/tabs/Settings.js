import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {Button, TextInput, Title} from 'react-native-paper';
import {} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  getUserDetails,
  updateUserDetails,
  requestLogout,
} from '../../Components/apiUtils';
import Colours from '../../Components/ColourPallet';

const App = ({navigation}) => {
  const [spinner, setSpinner] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleLogout = async () => {
    const response = await requestLogout();
    if (response) {
      navigation.navigate('SignIn');
    }
  };

  async function showUserDetails() {
    setSpinner(true);
    const userInfo = await getUserDetails({userID: 9});
    setFirstName(userInfo.first_name);
    setLastName(userInfo.last_name);
    setEmail(userInfo.email);
    setSpinner(false);
  }

  const updateUserInfo = async () => {
    const response = await updateUserDetails({
      firstName,
      lastName,
      email,
      userID: 9,
    });
    if (response) {
      setIsDisabled(true);
      await showUserDetails();
      Alert.alert('Update Successful');
    } else {
      Alert.alert('Update Unsuccessful');
    }
  };

  useEffect(() => {
    showUserDetails();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: Colours.background}}>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />
      <Title style={{alignSelf: 'center', color: 'black'}}> Account</Title>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <Button
          mode="contained"
          style={{height: 40, width: 100, margin: 6}}
          onPress={() => handleLogout()}
        >
          lOGOUT
        </Button>
        <Button
          mode="outlined"
          style={{height: 40, width: 100, margin: 6}}
          onPress={() => setIsDisabled(!isDisabled)}
        >
          Edit
        </Button>
      </View>
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
