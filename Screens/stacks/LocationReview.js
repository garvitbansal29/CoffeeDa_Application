import React, {useState, useEffect} from 'react';
import {Image, View, FlatList} from 'react-native';
import {Title, Button} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';
import {useIsFocused} from '@react-navigation/native';

import {backgroundStyles} from '../../Components/AppStyle';
import colours from '../../Components/ColourPallet';
import ReviewCard from '../../Components/Reviewcard';
import {
  getLikedReviewID,
  getSingleLocationData,
  getUserReviewID,
} from '../../Components/apiUtils';

const App = ({route, navigation}) => {
  const [spinner, setSpinner] = useState(false);

  const [cafe, setCafe] = useState({});
  const [userReviewIDs, setUserReviewIDs] = useState([]);
  const [userLikedRevID, setUserLikedRevID] = useState([]);
  const [locationReviews, setLocRevs] = useState([]);

  const {locationID, locationName} = route.params;

  const isFocused = useIsFocused();

  const getLocationData = async () => {
    setSpinner(true);
    setUserReviewIDs(await getUserReviewID());
    setUserLikedRevID(await getLikedReviewID());
    setCafe(await getSingleLocationData({locationID}));
    setSpinner(false);
  };

  useEffect(() => {
    if (isFocused) {
      getLocationData();
    }
  }, [isFocused]);

  useEffect(() => {
    setLocRevs(cafe.location_reviews);
  }, [cafe]);

  return (
    <View style={backgroundStyles.container}>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />
      <Image
        style={backgroundStyles.imgHeaderContainer}
        source={{uri: cafe.photo_path}}
      />
      <View
        style={{
          padding: 6,
          flexDirection: 'row',
          backgroundColor: colours.primary,
          justifyContent: 'space-around',
        }}
      >
        <Title
          style={{
            flex: 1,
            alignSelf: 'center',
            color: 'white',
            fontSize: 25,
          }}
        >
          {cafe.location_name}
        </Title>
        <Rating
          imageSize={20}
          startingValue={cafe.avg_overall_rating}
          type="custom"
          ratingBackgroundColor={colours.accent}
          readonly
          ratingColor={colours.onBackground}
          tintColor={colours.primary}
          showRating
          ratingTextColor="white"
          style={{
            flex: 1,
          }}
        />
      </View>

      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Button
            style={{flex: 1, margin: 6, height: 35}}
            mode="contained"
            onPress={() => {
              navigation.navigate('AddReviewScreen', {
                locationName,
                locationID,
              });
            }}
          >
            Add Review
          </Button>
        </View>
        <View>
          <FlatList
            data={locationReviews}
            renderItem={({item}) => (
              <ReviewCard
                cardDetails={item}
                locationID={locationID}
                userReviewIDs={userReviewIDs}
                userLikedReviewID={userLikedRevID}
                locationName={locationName}
                getLocationData={getLocationData}
              />
            )}
            keyExtractor={(item) => item.review_id.toString()}
            contentContainerStyle={{
              paddingBottom: 35,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default App;
