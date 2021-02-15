import AsyncStorage from '@react-native-async-storage/async-storage';
import {} from 'react-native';

const setToken = async (value) => {
  try {
    await AsyncStorage.setItem('@user_token', value);
    console.log('Session Token stored');
  } catch (e) {
    // save Errors
    console.log(e);
  }
};
const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // error
    console.log(e);
  }
  return 'No Token Found';
};

const setUserID = async (value) => {
  try {
    await AsyncStorage.setItem('@user_id', value);
    console.log('User ID stored');
  } catch (e) {
    // save Errors
    console.log(e);
  }
};

const getUserID = async () => {
  try {
    const value = await AsyncStorage.getItem('@user_id');
    if (value !== null) {
      console.log('Get User ID Successful');
      return value;
    }
  } catch (e) {
    // error
    console.log(e);
  }
  return 'No User ID Fount';
};

export {setToken, getToken, setUserID, getUserID};
