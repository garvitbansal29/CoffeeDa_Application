import Geolocation from 'react-native-geolocation-service';
import {PermissionsAndroid} from 'react-native';
import Global from './Global';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Lab04 Location Permission',
        message: 'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    }
    console.log('Location permission denied');
    return false;
  } catch (err) {
    console.warn(err);
  }
  return false;
}

export default requestLocationPermission;
