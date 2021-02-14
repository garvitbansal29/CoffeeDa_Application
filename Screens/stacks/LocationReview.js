import React, {useState} from 'react';
import {Image, View, FlatList, ScrollView} from 'react-native';
import {Text, Title, Button, Modal, Portal, Provider} from 'react-native-paper';
import {Rating} from 'react-native-ratings';

import {styles, backgroundStyles} from '../../Components/AppStyle';
import colours from '../../Components/ColourPallet';
import RatingIndicator from '../../Components/barIndicator';
import ReviewCard from '../../Components/Reviewcard';
import AddReviewForm from '../../Components/AddReviewForm';

const containerStyle = {backgroundColor: 'white', padding: 20};

const App = ({navigation, route}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);
  const {itemDetails} = route.params.props;

  const locationDetails = {
    cafeID: itemDetails.location_id,
    cafeName: itemDetails.location_name,
    town: itemDetails.location_town,
    image: itemDetails.photo_path,
    latitude: itemDetails.latitude,
    longitute: itemDetails.longitute,
    starRating: itemDetails.avg_overall_rating,
    priceRating: itemDetails.avg_price_rating,
    qualityRating: itemDetails.avg_quality_rating,
    cleanlinessRating: itemDetails.avg_clenliness_rating,
    // locationReviews: itemDetails.location_reviews,
  };
  const locationReviews = itemDetails.location_reviews;

  return (
    <View style={backgroundStyles.container}>
      <Image
        style={backgroundStyles.imgHeaderContainer}
        source={{uri: locationDetails.image}}
      />
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          borderBottomColor: 'white',
          borderBottomWidth: 3,
          justifyContent: 'center',
        }}
      >
        <Title style={styles.titleText}>{locationDetails.cafeName}</Title>
        <Rating
          imageSize={30}
          startingValue={locationDetails.starRating}
          type="custom"
          ratingBackgroundColor="white"
          readonly
          ratingColor={colours.secondary}
          tintColor={colours.primary}
          showRating
          ratingTextColor="black"
          style={{
            flex: 1,
            marginTop: 12,
          }}
        />
      </View>
      {/* display all the different ratings */}
      <View>
        <RatingIndicator
          fullSize={250}
          rating={locationDetails.starRating}
          label="Overall Rating"
        />
        <RatingIndicator
          fullSize={250}
          rating={locationDetails.priceRating}
          label="Price Rating"
        />
        <RatingIndicator
          fullSize={250}
          rating={locationDetails.qualityRating}
          label="Quality Rating"
        />
        <RatingIndicator
          fullSize={250}
          rating={locationDetails.cleanlinessRating}
          label="Cleanliness Rating"
        />
      </View>

      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <Title style={{flex: 1}}>Review</Title>

          <Button
            style={{flex: 1}}
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
            renderItem={({item}) => <ReviewCard cardDetails={item} />}
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
            locationID={locationDetails.cafeID}
            locationName={locationDetails.cafeName}
          />
        </Modal>
      </Portal>
    </View>
  );
};

export default App;
