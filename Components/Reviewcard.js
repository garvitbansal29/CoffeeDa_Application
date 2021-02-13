import React, {useState} from 'react';

import {Text, View} from 'react-native';
import {Surface, Button} from 'react-native-paper';

import RatingIndicator from './barIndicator';
import colours from './ColourPallet';

const App = (props) => {
  const {cardDetails} = props;

  const review = {
    id: cardDetails.review_id,
    userId: cardDetails.review_user_id,
    overallRating: cardDetails.review_overallrating,
    priceRating: cardDetails.review_pricerating,
    qualityRating: cardDetails.review_qualityrating,
    cleanlinessRating: cardDetails.review_clenlinessrating,
    reviewBody: cardDetails.review_body,
    likes: cardDetails.likes,
  };

  return (
    <Surface
      style={{backgroundColor: colours.primary, elevation: 6, margin: 6}}
    >
      <Text>{review.reviewBody}</Text>
      <View style={{marginHorizontal: 65}}>
        <RatingIndicator
          fullSize={100}
          rating={review.overallRating}
          label="Overall Rating"
          textColorr="black"
        />
        <RatingIndicator
          fullSize={100}
          rating={review.priceRating}
          label="Price Rating"
        />
        <RatingIndicator
          fullSize={100}
          rating={review.qualityRating}
          label="Quality Rating"
        />
        <RatingIndicator
          fullSize={100}
          rating={review.cleanlinessRating}
          label="Cleanliness Rating"
        />
      </View>
    </Surface>
  );
};

export default App;
