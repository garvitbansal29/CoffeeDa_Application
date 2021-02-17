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

const removeUserID = async () => {
  try {
    await AsyncStorage.removeItem('@user_id');
    console.log('Async User ID Removed');
    return true;
  } catch (error) {
    console.log(`Async User ID was not removed: ${error}`);
    return false;
  }
};

const removeUsertoken = async () => {
  try {
    await AsyncStorage.removeItem('@user_token');
    console.log('Async User Token Removed');
    return true;
  } catch (error) {
    console.log(`Async User Token was not removed: ${error}`);
    return false;
  }
};

export {
  setToken,
  getToken,
  setUserID,
  getUserID,
  removeUserID,
  removeUsertoken,
};
