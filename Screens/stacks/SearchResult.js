import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, TextInput, Searchbar, Modal, Text} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import Slider from '@react-native-community/slider';
import Geolocation from 'react-native-geolocation-service';
import GetLocationPermission from '../../Components/PermissionManager';

import {getLocationData as apiUtils} from '../../Components/apiUtils';
import {styles} from '../../Components/AppStyle';
import LocationDisplay from '../../Components/LocationDetailCard';
import colours from '../../Components/ColourPallet';
import Global from '../../Components/Global';

const App = ({navigation}) => {
  const [spinner, setSpinner] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [locationsData, setLocationsData] = useState([]);

  const [searchBarValue, setSearchBarValue] = useState('');
  const [overallRating, setOverallRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [searchIn, setSearchIn] = useState('');
  const [resultLimit, setResultLimit] = useState('');
  const [resultOffset, setResultOffset] = useState('');

  const [currLongitude, setLongitute] = useState(0);
  const [currLatitude, setLatitude] = useState(0);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const getLocationData = async () => {
    setSpinner(true);
    const allLocations = await apiUtils({
      searchValue: searchBarValue,
      overallRating,
      priceRating,
      qualityRating,
      cleanlinessRating,
      searchIn,
      resultLimit,
      resultOffset,
    });
    // const sortByStars = await allLocations.slice(0);
    const sortByStars = allLocations.sort((a, b) => {
      return b.avg_overall_rating - a.avg_overall_rating;
    });
    setLocationsData(sortByStars);
    setSpinner(false);
  };

  const handleModalClick = () => {
    getLocationData();
    hideModal();
  };

  const containerStyle = {backgroundColor: 'white', padding: 20};

  const openInMaps = () => {
    navigation.navigate('MapResults', {locationsData});
  };

  const getCurrentCoordinates = async () => {
    if (!Global.locationPermission) {
      console.log('asking for permission now');
      Global.locationPermission = await GetLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitute(position.coords.longitude);
        console.log(
          `this is the current coordinates : ${JSON.stringify(position)}`,
        );
      },
      (error) => {
        console.log(`Error getting current coordinates: ${error}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  useEffect(() => {
    getLocationData();
  }, [searchBarValue]);

  useEffect(() => {
    getCurrentCoordinates();
  });

  return (
    <View style={{backgroundColor: colours.background}}>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />
      <Searchbar
        theme={{placeholder: 'black'}}
        placeholder="Search"
        onChangeText={(value) => setSearchBarValue(value)}
        value={searchBarValue}
      />
      <View style={{flexDirection: 'row'}}>
        <Button
          theme={{roundness: 0}}
          style={{flex: 1}}
          mode="contained"
          onPress={() => showModal()}
          icon="tune"
        />
        <Button
          theme={{roundness: 0}}
          style={{flex: 1}}
          mode="contained"
          onPress={() => getLocationData()}
        >
          Search
        </Button>
        <Button
          theme={{roundness: 0}}
          style={{flex: 1}}
          mode="contained"
          onPress={() => openInMaps()}
        >
          Open Map
        </Button>
      </View>
      <FlatList
        data={locationsData}
        renderItem={({item}) => (
          <LocationDisplay
            itemDetails={item}
            currLatitude={currLatitude}
            currLongitude={currLongitude}
          />
        )}
        keyExtractor={(item) => item.location_id.toString()}
      />
      <Modal
        visible={modalVisible}
        dismissable={false}
        contentContainerStyle={containerStyle}
      >
        <View style={{alignItems: 'center'}}>
          <TextInput
            style={styles.fullSizeTextInput}
            placeholder="Enter Location"
            value={searchIn}
            onChangeText={(text) => setSearchIn(text)}
          />
          <Text>Overall Rating: {overallRating} </Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            value={overallRating}
            step={0.5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onSlidingComplete={(value) => setOverallRating(value)}
          />
          <Text>Price Rating: {priceRating} </Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            value={priceRating}
            step={0.5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onSlidingComplete={(value) => setPriceRating(value)}
          />
          <Text>Quality Rating: {qualityRating} </Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            value={qualityRating}
            step={0.5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onSlidingComplete={(value) => setQualityRating(value)}
          />
          <Text>Cleanliness Rating: {cleanlinessRating} </Text>
          <Slider
            style={{width: 200, height: 40}}
            minimumValue={0}
            maximumValue={5}
            value={cleanlinessRating}
            step={0.5}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onSlidingComplete={(value) => setCleanlinessRating(value)}
          />

          <Button onPress={() => handleModalClick()}>search</Button>
        </View>
      </Modal>
    </View>
  );
};

export default App;
