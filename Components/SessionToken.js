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
  }
  return 'No Token Found';
};

export {setToken, getToken};
