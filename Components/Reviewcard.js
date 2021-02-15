import React, {useState, useEffect} from 'react';
import {useIsFocused} from '@react-navigation/native';

import {View} from 'react-native';
import {
  Surface,
  Button,
  Paragraph,
  Card,
  Title,
  IconButton,
} from 'react-native-paper';

import RatingIndicator from './CommentCardIndicators';
import colours from './ColourPallet';
import {
  getReviewPhoto,
  getLikedReviewID,
  likeReview,
  unLikeReview,
  getReviewData,
  getLocationData_new,
} from './apiUtils';

const App = (props) => {
  const {cardDetails} = props;
  const [revImage, setImage] = useState();
  const [likes, setLikes] = useState();
  const [isLiked, setLiked] = useState(false);

  const review = {
    reviewID: cardDetails.review_id,
    locationID: cardDetails.review_location_id,
    userId: cardDetails.review_user_id,
    overallRating: cardDetails.review_overallrating,
    priceRating: cardDetails.review_pricerating,
    qualityRating: cardDetails.review_qualityrating,
    cleanlinessRating: cardDetails.review_clenlinessrating,
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
    if (response === 'Unsuccessful') setImage(response);
    else {
      const image = await response.text();
      setImage(image);
      // const imgUrl = await URL.createObjectURL(image);
      // // setImage(image);
      console.log(`DOES NOT WORK ${image}`);
    }
  }

  async function checkUserLiked() {
    const likedList = await getLikedReviewID();
    console.log(likedList);
    setLiked(likedList.some((item) => item.likedReviewID === review.reviewID));
  }

  async function setAllCardData() {
    await getReviewImage();
    await checkUserLiked();
    setLikes(review.likes);
  }

  useEffect(() => {
    setAllCardData();
    getReviewData({locatoinID: review.locationID});
  }, []);

  return (
    <Card
      elevation={12}
      style={{margin: 6, backgroundColor: colours.onBackground}}
    >
      <Card.Content>
        <Title>
          User ID : {review.userId} AND Review ID: {review.reviewID}
        </Title>
        <Paragraph style={{fontSize: 18}}>{review.reviewBody}</Paragraph>
      </Card.Content>

      {revImage !== 'Unsuccessful' ? (
        <Card.Cover source={revImage} />
      ) : (
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      )}
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
  );
};

export default App;
