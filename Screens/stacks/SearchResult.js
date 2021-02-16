import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, TextInput, Searchbar, Modal, Text} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import Slider from '@react-native-community/slider';
import {getLocationData as apiUtils} from '../../Components/apiUtils';
import {styles} from '../../Components/AppStyle';
import LocationDisplay from '../../Components/LocationDetailCard';
import colours from '../../Components/ColourPallet';

const App = () => {
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

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const getLocationData = async () => {
    const response = await apiUtils({
      searchValue: searchBarValue,
      overallRating,
      priceRating,
      qualityRating,
      cleanlinessRating,
      searchIn,
      resultLimit,
      resultOffset,
    });
    const sortByStars = await response.slice(0);
    sortByStars.sort((a, b) => {
      return b.avg_overall_rating - a.avg_overall_rating;
    });
    setLocationsData(sortByStars);
  };
  const handleModalClick = () => {
    getLocationData();
    hideModal();
  };

  const containerStyle = {backgroundColor: 'white', padding: 20};
  useEffect(() => {
    getLocationData();
  }, [searchBarValue]);

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
      </View>
      <FlatList
        data={locationsData}
        renderItem={({item}) => <LocationDisplay itemDetails={item} />}
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
