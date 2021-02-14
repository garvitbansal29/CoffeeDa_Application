import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

import {
  Button,
  Provider,
  TextInput,
  Searchbar,
  Modal,
  Text,
} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import {getToken, setToken} from '../../Components/SessionToken';
import {getLocationData as apiUtils} from '../../Components/apiUtils';
import {styles} from '../../Components/AppStyle';
import LocationDisplay from '../../Components/LocationDetailCard';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const [locationsData, setLocationsData] = useState([]);
  const [sessionToken, setSessionToken] = useState(
    '6187b76c034c32fd9e4c66c2edc4613b',
  );

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

  const getLocationData = () => {
    apiUtils({
      searchValue: searchBarValue,
      overallRating,
      priceRating,
      qualityRating,
      cleanlinessRating,
      searchIn,
      resultLimit,
      resultOffset,
      sessionToken,
    })
      .then((response) => {
        const byStarts = response.responseJson.slice(0);
        byStarts.sort(function (a, b) {
          return b.avg_overall_rating - a.avg_overall_rating;
        });
        setLocationsData(byStarts);
      })

      .catch((error) => {
        console.log(`${error} `);
      });
  };
  const handleModalClick = () => {
    getLocationData();
    hideModal();
  };

  const containerStyle = {backgroundColor: 'white', padding: 20};
  useEffect(() => {
    getLocationData();
  }, []);

  return (
    <Provider>
      <Searchbar
        placeholder="Search"
        onChangeText={(value) => setSearchBarValue(value)}
        value={searchBarValue}
      />
      <View style={{flexDirection: 'row'}}>
        <Button
          style={{flex: 1}}
          mode="outlined"
          onPress={() => showModal()}
          icon="tune"
        />
        <Button
          style={{flex: 1}}
          mode="outlined"
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
    </Provider>
  );
};

export default App;
