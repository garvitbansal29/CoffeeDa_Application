import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {
  Button,
  TextInput,
  Searchbar,
  Modal,
  Text,
  RadioButton,
  Title,
} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import Slider from '@react-native-community/slider';
import Geolocation from 'react-native-geolocation-service';
import GetLocationPermission from '../../Components/PermissionManager';

import {getLocationData as apiUtils} from '../../Components/apiUtils';
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

  const [isEndFound, setIsEndFound] = useState(false);

  // const [checked, setChecked] = React.useState('none');

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

    setIsLoading(false);
    return allLocations;
  };

  const increaseResultOffSet = () => {
    if (!isEndFound) setResultOffset((num) => num + resultLimit);
  };

  const getCafeData = async () => {
    console.log(`>>>GET CAFE DATA STARTED<<<`);
    const responseData = await getLocationData();
    if (responseData.length) {
      console.log(`>>>GET CAFE: THERE IS DATA`);
      if (resultOffset === 0) {
        console.log(`>>>GET CAFE: NEW DATA HAS BEEN SET`);
        setLocationsData(responseData);
      } else {
        console.log(
          `>>> GET CAFE: PAGINATED NEW DATA - PAGINATION: ${resultOffset}`,
        );
        setLocationsData((data) => data.concat(responseData));
      }
    } else {
      if (resultOffset === 0) {
        console.log(`>>>GET CAFE: NO DATA`);
        setLocationsData([]);
      } else {
        console.log(`>>>GET CAFE: NO More DATA`);
      }
      setIsEndFound(true);
    }

    console.log(`>>>GET CAFE: Finished<<<`);
  };

  const resetResultOffSet = () => {
    setIsEndFound(false);
    if (resultOffset === 0) {
      getCafeData();
    } else {
      setResultOffset(0);
    }
  };

  const handleModalClick = () => {
    resetResultOffSet();
    hideModal();
  };

  const containerStyle = {backgroundColor: colours.onBackground, padding: 20};

  const openInMaps = () => {
    navigation.jumpTo('Map', {
      screen: 'MapDisplay',
      initial: false,
      params: {locationsData},
    });
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

  const renderFooter = () => {
    return isLoading ? (
      <View style={{alignItems: 'center'}}>
        <ActivityIndicator size="large" color={colours.primary} />
      </View>
    ) : (
      <View />
    );
  };

  useEffect(() => {
    setIsLoading(true);
    getCurrentCoordinates();
    resetResultOffSet();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getCafeData();
  }, [resultOffset]);

  const NoDataFoundError = () => {
    return <Title>NO LOCATION FOUND</Title>;
  };

  return (
    <View style={{backgroundColor: colours.onBackground, flex: 1}}>
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
          onPress={() => resetResultOffSet()}
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

      <View style={{alignItems: 'center'}}>
        {!locationsData.length ? <NoDataFoundError /> : null}
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
        onEndReached={() => increaseResultOffSet()}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => renderFooter()}
        contentContainerStyle={{paddingBottom: 25}}
      />
      <Modal
        visible={modalVisible}
        dismissable
        onDismiss={() => {
          hideModal();
        }}
        contentContainerStyle={containerStyle}
      >
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>None</Text>
              <RadioButton
                value=""
                status={searchIn === '' ? 'checked' : 'unchecked'}
                onPress={() => setSearchIn('')}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Favourite</Text>
              <RadioButton
                value="favourite"
                status={searchIn === 'favourite' ? 'checked' : 'unchecked'}
                onPress={() => setSearchIn('favourite')}
              />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text>Reviewed</Text>
              <RadioButton
                value="reviewed"
                status={searchIn === 'reviewed' ? 'checked' : 'unchecked'}
                onPress={() => setSearchIn('reviewed')}
              />
            </View>
          </View>

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
