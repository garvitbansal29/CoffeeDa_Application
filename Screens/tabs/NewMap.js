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
  const {navigation, route} = props;
  const [spinner, setSpinner] = useState(false);
  const [currLongitude, setLongitute] = useState(0);
  const [currLatitude, setLatitude] = useState(0);
  const [locationsData, setLocationsData] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);

  const [centerCoords, setCenterCoords] = useState({
    latitude: 0,
    longitude: 0,
  });

  const getCenterCoords = (prop) => {
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
        const {coords} = position;

        setLatitude(coords.latitude);
        setLongitute(coords.longitude);

        const allLocationData = await getLocationData({searchValue: ''});

        const sortedByDist = orderByDistance(coords, allLocationData).slice(
          0,
          3,
        );
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

        setLocationsData(route.params.locationData, (data) => {
          getCenterCoords({locations: data});
        });
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
      displaySeachResults();
    });
  });

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
          latitudeDelta: 0,
          longitudeDelta: 0.3,
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
