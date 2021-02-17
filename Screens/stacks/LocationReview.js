import React, {useState, useEffect} from 'react';
import {Image, View, FlatList} from 'react-native';
import {Title, Button, Modal, Portal} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import Spinner from 'react-native-loading-spinner-overlay';

import {backgroundStyles} from '../../Components/AppStyle';
import colours from '../../Components/ColourPallet';
import ReviewCard from '../../Components/Reviewcard';
import AddReviewForm from '../../Components/AddReviewForm';
import {
  getLikedReviewID,
  getSingleLocationData,
  getUserReviewID,
} from '../../Components/apiUtils';

const containerStyle = {backgroundColor: 'white', padding: 20};

const App = ({route}) => {
  const [spinner, setSpinner] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [cafe, setCafe] = useState({});
  const [userReviewIDs, setUserReviewIDs] = useState([]);
  const [userLikedRevID, setUserLikedRevID] = useState([]);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // const {itemDetails, locationID} = route.params;
  const {locationID} = route.params;

  const locationReviews = cafe.location_reviews;

  async function getLocationData() {
    setSpinner(true);
    setUserReviewIDs(await getUserReviewID());
    setUserLikedRevID(await getLikedReviewID());
    setCafe(await getSingleLocationData({locationID}));
    setSpinner(false);
  }

  useEffect(() => {
    getLocationData();
  }, []);

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
          imageSize={15}
          startingValue={cafe.avg_overall_rating}
          type="custom"
          ratingBackgroundColor={colours.background}
          readonly
          ratingColor={colours.accent}
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
              showModal();
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
              />
            )}
            keyExtractor={(item) => item.review_id.toString()}
            contentContainerStyle={{
              paddingBottom: 35,
            }}
          />
        </View>
      </View>
      <Portal>
        <Modal
          contentContainerStyle={containerStyle}
          transparent
          animationType="slide"
          backdropOpacity={1}
          backdropColor="white"
          visible={modalVisible}
          dismissable
          onDismiss={() => {
            hideModal();
          }}
        >
          <AddReviewForm
            locationID={cafe.location_id}
            locationName={cafe.location_name}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default App;
