import React, {useState, useEffect} from 'react';
import {Alert, View, PermissionsAndroid} from 'react-native';
import {Text, Button} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import GetLocationPermission from '../../Components/PermissionManager';
import Global from '../../Components/Global';
import {getSingleLocationData} from '../../Components/apiUtils';

const App = ({navigation, route}) => {
  const [currLongitude, setLongitute] = useState(0);
  const [currLatitude, setLatitude] = useState(0);
  const [locationsData, setLocationsData] = useState([]);

  const getCoordinates = async () => {
    if (!Global.locationPermission) {
      console.log('asking for permission now');
      Global.locationPermission = await GetLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitute(position.coords.longitude);
        console.log(
          'this is the current coordinates : ' + JSON.stringify(position),
        );
      },
      (error) => {
        Alert.alert(error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  const getSingleLocation = async () => {
    console.log('RESRESRAERAWERAW');
    const itemDetails = await getSingleLocationData({locationID: 2});
    navigation.push('LocationReviews', {locationID: 5});
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      getCoordinates();
      // getSingleLocation();
      if (route.params) {
        setLocationsData(route.params.locationsData);
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Button
        onPress={() =>
          console.log(
            `this is the locations data ${JSON.stringify(locationsData)}`,
          )
        }
      >
        TEST
      </Button>
      <MapView
        style={{flex: 1}}
        region={{
          latitude: currLatitude,
          longitude: currLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locationsData.map((location) => (
          <Marker
            key={location.location_id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.location_name}
          />
        ))}
      </MapView>
    </View>
  );
};

export default App;
