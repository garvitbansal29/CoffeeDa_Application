import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
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
  const [resultLimit, setResultLimit] = useState(3);
  const [resultOffset, setResultOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [currLongitude, setLongitute] = useState(0);
  const [currLatitude, setLatitude] = useState(0);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const getLocationData = async () => {
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

    setLocationsData((data) => data.concat(allLocations));
    setIsLoading(false);
  };

  const handleModalClick = () => {
    getLocationData();
    hideModal();
  };

  const containerStyle = {backgroundColor: 'white', padding: 20};

  const openInMaps = () => {
    navigation.navigate('MapDisplay', {locationsData});
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

  const loadMoreData = () => {
    setResultOffset((num) => num + resultLimit);
    setIsLoading(true);
  };

  const renderFooter = () => {
    return isLoading ? (
      <View style={{marginBottom: 50, alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colours.primary} />
      </View>
    ) : (
      <View />
    );
  };

  useEffect(() => {
    console.log(`Current Offset : ${resultOffset}`);
    setIsLoading(true);
    getLocationData();
  }, [resultOffset]);

  useEffect(() => {
    getCurrentCoordinates();
  }, []);

  return (
    <View style={{backgroundColor: colours.background}}>
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
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => loadMoreData()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => renderFooter()}
        contentContainerStyle={{paddingBottom: 100}}
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
