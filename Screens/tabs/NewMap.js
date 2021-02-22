import React, {useState, useEffect} from 'react';
import {Alert, View, PermissionsAndroid, Image} from 'react-native';
import {Text, Button, FAB} from 'react-native-paper';
import Geolocation from 'react-native-geolocation-service';
import MapView, {Marker} from 'react-native-maps';
import {orderByDistance, getCenter} from 'geolib';
import Spinner from 'react-native-loading-spinner-overlay';

import GetLocationPermission from '../../Components/PermissionManager';
import Global from '../../Components/Global';
import {getLocationData} from '../../Components/apiUtils';

const App = (props) => {
  const {navigation} = props;
  const [spinner, setSpinner] = useState(false);
  const [currLongitude, setLongitute] = useState(0);
  const [currLatitude, setLatitude] = useState(0);
  const [locationsData, setLocationsData] = useState([]);

  const [centerCoords, setCenterCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getCenterCoords = async (prop) => {
    const coords = getCenter(prop.locations);
    setCenterCoords(coords);
  };

  const getAllClosestsCafe = async () => {
    setSpinner(true);
    if (!Global.locationPermission) {
      console.log('asking for permission now');
      Global.locationPermission = await GetLocationPermission();
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        setLatitude(position.coords.latitude);
        setLongitute(position.coords.longitude);

        const {coords} = position;
        const allLocationData = await getLocationData({searchValue: ''});

        const sortedByDist = orderByDistance(
          {
            coords,
          },
          allLocationData,
        ).slice(0, 3);

        getCenterCoords({locations: sortedByDist});
        setLocationsData(sortedByDist);
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
    setSpinner(false);
  };

  const displaySeachResults = async () => {
    if (!Global.locationPermission) {
      console.log('asking for permission now');
      Global.locationPermission = await GetLocationPermission();
    }

    Geolocation.getCurrentPosition(
      async (position) => {
        setLatitude(position.coords.latitude);
        setLongitute(position.coords.longitude);

        getCenterCoords({locations: locationsData});
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
    setSpinner(false);
  };

  useEffect(() => {
    navigation.addListener('focus', () => {
      console.log(`TESTTESTTEST>>>> ${JSON.stringify(props)}`);
      if (props.params) {
        setLocationsData(props.params.locationsData);
        displaySeachResults();
        navigation.setParams({locationsData: null});
      } else {
        getAllClosestsCafe();
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />

      <MapView
        style={{flex: 1}}
        region={{
          latitude: centerCoords.latitude,
          longitude: centerCoords.longitude,
          latitudeDelta: 0.45,
          longitudeDelta: 0.5,
        }}
      >
        <Marker
          title="CURRENT POSTIONS"
          coordinate={{latitude: currLatitude, longitude: currLongitude}}
        />

        {locationsData.map((location) => (
          <Marker
            key={location.location_id}
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={location.location_name}
          >
            <Image
              source={require('../../cafe_marker.png')}
              style={{height: 45, width: 45}}
              resizeMode="center"
            />
          </Marker>
        ))}
      </MapView>
      <FAB
        style={{margin: 16, right: 0, bottom: 0, position: 'absolute'}}
        small
        label="Get Nearest Cafes"
        onPress={() => getAllClosestsCafe()}
      />
    </View>
  );
};

export default App;
