import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import Slider from '@react-native-community/slider';
import {getToken} from '../../Components/SessionToken';

function objToQueryString(obj) {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]),
    );
  }
  return keyValuePairs.join('&');
}
const App = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [sessionToken, setSessionToken] = useState(
    '5a2735125235da317fddd629bfd55894',
  );
  const [searchValue, setSearchValue] = useState('Mary');
  const [overallRating, setOverallRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [searchLocation, setSearchLocation] = useState('');
  const [searchLimit, setSearchLimit] = useState('');
  const [searchOffset, setSearchOffset] = useState('');

  const getLocationData = () => {
    // getToken().then((response) => setSessionToken(response));
    const searchParamters = {
      // q: searchValue,
      overall_rating: overallRating,
      price_rating: priceRating,
      quality_rating: qualityRating,
      clenliness_rating: cleanlinessRating,
      // search_in: searchLocation,
      limit: searchLimit,
      offset: searchOffset,
    };
    const queryString = JSON.stringify(objToQueryString(searchParamters));

    return fetch(
      `http://10.0.2.2:3333/api/1.0.0/find?q=${searchValue}&search_in${searchLocation}&${queryString}`,
      {
        method: 'GET',
        headers: {'x-authorization': sessionToken},
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setLocationData(responseJson);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  };

  useEffect(() => {
    getLocationData();
  }, []);

  const LocationDisplay = (props) => {
    const {locationName, stars, town} = props;
    return (
      <View>
        <Text>Name: {locationName}</Text>
        <Text>stars: {stars} </Text>
        <Text>Location: {town}</Text>
        <Text>Distance: </Text>
        <Text>____________________________</Text>
      </View>
    );
  };
  const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
  return (
    <View>
      <TextInput
        value={searchValue}
        onChangeText={(text) => setSearchValue(text)}
      />
      <Button title="search options" onPress={() => setModalVisible(true)} />
      <Button title="search" onPress={() => getLocationData()} />
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>
          <View>
            <TextInput
              placeholder="Enter Location"
              value={searchLocation}
              onChangeText={(text) => setSearchLocation(text)}
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

            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Text>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <FlatList
        data={locationData}
        // eslint-disable-next-line prettier/prettier
        renderItem={({item}) => (
          <LocationDisplay
            locationName={item.location_name}
            stars={item.avg_overall_rating}
            town={item.location_town}
          />
        )}
        keyExtractor={(item) => item.location_id.toString()}
      />
    </View>
  );
};

export default App;
