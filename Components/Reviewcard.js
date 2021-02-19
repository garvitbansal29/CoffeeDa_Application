import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {View} from 'react-native';
import {
  Surface,
  Button,
  Paragraph,
  Card,
  Title,
  Modal,
  Text,
  TextInput,
  Portal,
} from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';

import RatingIndicator from './CommentCardIndicators';
import colours from './ColourPallet';
import UpdateReviewModal from './UpdateReviewModal';
import {
  getReviewPhoto,
  getLikedReviewID,
  likeReview,
  unLikeReview,
} from './apiUtils';

const App = (props) => {
  const [spinner, setSpinner] = useState(false);

  const {
    cardDetails,
    locationID,
    userReviewIDs,
    userLikedReviewID,
    getLocationData,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);
  const [revImage, setImage] = useState();
  const [isImage, setIsImage] = useState(false);
  const [likes, setLikes] = useState(cardDetails.likes);
  const [isLiked, setLiked] = useState(false);
  const [isUserReview, setIsUserReview] = useState(false);

  const showModal = () => setModalVisible(true);

  const hideModal = async () => {
    setModalVisible(false);
    getLocationData();
  };

  const review = {
    reviewID: cardDetails.review_id,
    locationID,
    overallRating: cardDetails.overall_rating,
    priceRating: cardDetails.price_rating,
    qualityRating: cardDetails.quality_rating,
    cleanlinessRating: cardDetails.clenliness_rating,
    reviewBody: cardDetails.review_body,
    likes: cardDetails.likes,
  };

  const handleLikeClick = async () => {
    if (isLiked) {
      const response = await unLikeReview({
        locationID: review.locationID,
        reviewID: review.reviewID,
      });
      if (response) {
        setLiked(false);
        setLikes((prevLikes) => prevLikes - 1);
      }
    } else {
      const response = await likeReview({
        locationID: review.locationID,
        reviewID: review.reviewID,
      });

      if (response) {
        setLiked(true);
        setLikes((prevLikes) => prevLikes + 1);
      }
    }
  };

  async function getReviewImage() {
    const response = await getReviewPhoto({
      reviewID: review.reviewID,
      locationID: review.locationID,
    });
    if (response === '') setIsImage(false);
    else {
      setIsImage(true);
      setImage(response);
    }
  }

  async function checkIfUserLiked() {
    setLiked(
      userLikedReviewID.some((item) => item.likedReviewID === review.reviewID),
    );
  }

  async function checkIfIsUserReview() {
    setIsUserReview(
      userReviewIDs.some((item) => item.reviewID === review.reviewID),
    );
  }

  async function setAllCardData() {
    setSpinner(true);
    checkIfIsUserReview();
    await getReviewImage();
    await checkIfUserLiked();
    setLikes(cardDetails.likes);

    setSpinner(false);
  }

  useEffect(() => {
    setAllCardData();
  }, []);

  return (
    <View>
      <Portal>
        <UpdateReviewModal
          visibility={modalVisible}
          hideModal={hideModal}
          review={review}
        />
      </Portal>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />
      <Card
        elevation={12}
        style={{margin: 6, backgroundColor: colours.onBackground}}
      >
        <Card.Content>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Title>Review ID: {review.reviewID}</Title>
            {isUserReview ? (
              <Button mode="contained" onPress={() => showModal()}>
                Edit
              </Button>
            ) : (
              <View />
            )}
          </View>
          <Paragraph style={{fontSize: 18}}>{review.reviewBody}</Paragraph>
        </Card.Content>

        {isImage ? <Card.Cover source={{uri: revImage}} /> : <View />}

        <Card.Content>
          <Surface
            elevation={6}
            style={{marginTop: 12, backgroundColor: colours.onBackground}}
          >
            <RatingIndicator
              rating={review.overallRating}
              label="Overall Rating"
              textColorr="black"
            />
            <RatingIndicator rating={review.priceRating} label="Price Rating" />
            <RatingIndicator
              rating={review.qualityRating}
              label="Quality Rating"
            />
            <RatingIndicator
              rating={review.cleanlinessRating}
              label="Cleanliness Rating"
            />
          </Surface>
        </Card.Content>
        <Card.Actions style={{justifyContent: 'flex-end'}}>
          <Button
            icon={isLiked ? 'thumb-up' : 'thumb-up-outline'}
            mode="text"
            onPress={() => handleLikeClick()}
          >
            {likes}
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default App;
