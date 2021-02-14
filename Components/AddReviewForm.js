import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import {} from 'react-native-gesture-handler';
import {Text, Title, TextInput, Button} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {addReview} from './apiUtils';
import {setToken} from './SessionToken';

const App = (props) => {
  const {locationID, locationName} = props;

  const [overallRating, setOverallRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [reviewBody, setReviewBody] = useState('');

  const submitReview = async () => {
    const requestSuccessful = await addReview({
      overallRating,
      priceRating,
      qualityRating,
      cleanlinessRating,
      reviewBody,
      locationID,
      locationName,
    });

    if (requestSuccessful) {
      Alert.alert('Review Added Successfully ');
      setOverallRating(0);
      setPriceRating(0);
      setQualityRating(0);
      setCleanlinessRating(0);
      setReviewBody('');
    }
  };

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Title>Write a Review for {locationName}! </Title>
        <Rating
          startingValue={overallRating}
          style={{paddingVertical: 10}}
          onFinishRating={(rating) => setOverallRating(rating)}
        />
      </View>
      <TextInput
        mode="outlined"
        label="Review"
        placeholder="Review"
        value={reviewBody}
        onChangeText={(text) => setReviewBody(text)}
        multiline
        numberOfLines={5}
      />
      <View style={{alignItems: 'flex-start'}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 10, marginRight: 24}}>Price Rating:</Text>
          <Rating
            startingValue={priceRating}
            style={{paddingVertical: 10}}
            onFinishRating={(rating) => setPriceRating(rating)}
            imageSize={20}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 10, marginRight: 24}}>Qulity Rating:</Text>
          <Rating
            startingValue={qualityRating}
            style={{paddingVertical: 10}}
            // fractions={1}
            onFinishRating={(rating) => setQualityRating(rating)}
            imageSize={20}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 10, marginRight: 24}}>
            Cleanliness Rating:
          </Text>
          <Rating
            startingValue={cleanlinessRating}
            style={{paddingVertical: 10}}
            // fractions={1}
            onFinishRating={(rating) => setCleanlinessRating(rating)}
            imageSize={20}
          />
        </View>
      </View>
      <Button onPress={() => submitReview()}>SUBMIT</Button>
    </View>
  );
};

export default App;
