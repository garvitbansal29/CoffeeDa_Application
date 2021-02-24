import React, {useState} from 'react';
import {Alert, View, Image, TouchableHighlight} from 'react-native';
import {} from 'react-native-gesture-handler';
import {Text, Title, TextInput, Button, IconButton} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {useIsFocused} from '@react-navigation/native';

import {
  addReview,
  addReviewImage,
  getUserReviewID,
} from '../../Components/apiUtils';
import {backgroundStyles} from '../../Components/AppStyle';

const App = ({navigation, route, initialProps}) => {
  const [image, setImage] = useState();
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint},
    {takePicture},
  ] = useCamera(initialProps);

  const {params} = route;
  const {locationName, locationID} = params;

  const [overallRating, setOverallRating] = useState(0);
  const [priceRating, setPriceRating] = useState(0);
  const [qualityRating, setQualityRating] = useState(0);
  const [cleanlinessRating, setCleanlinessRating] = useState(0);
  const [reviewBody, setReviewBody] = useState('');
  const [isImage, setIsImage] = useState(false);
  const [openCamera, setOpenCamera] = useState(false);
  const [reviewPost, setReviewPost] = useState(false);

  const handlePicture = async () => {
    const response = await takePicture();
    setImage(response);
    setIsImage(true);
    setOpenCamera(false);
  };

  const submitReviewPhoto = async (newReview) => {
    const response = await addReviewImage({
      locationID,
      reviewID: newReview.reviewID,
      img: image,
    });
    setReviewPost(response);
  };

  const submitReview = async () => {
    const requestSuccessful = await addReview({
      locationID,
      overallRating,
      priceRating,
      qualityRating,
      cleanlinessRating,
      reviewBody,
    });

    if (requestSuccessful) {
      const userReviewIDs = await getUserReviewID();
      userReviewIDs.sort((a, b) => b.reviewID - a.reviewID);
      const newReview = userReviewIDs[0];
      if (isImage) {
        submitReviewPhoto(newReview);
      }
      Alert.alert('Review was added successfully!');
      navigation.goBack();
    } else {
      Alert.alert('Review was not added successfuly');
    }
  };

  const AddReviewDisplay = () => {
    return (
      <View style={backgroundStyles.container}>
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
          onChangeText={(text) => setReviewBody(text)}
          value={reviewBody}
          autoFocus
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
              onFinishRating={(rating) => setCleanlinessRating(rating)}
              imageSize={20}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          {isImage ? (
            <Image
              style={{width: 100, height: 100}}
              source={{uri: image.uri}}
            />
          ) : (
            <IconButton
              icon="image-plus"
              size={50}
              onPress={() => setOpenCamera(true)}
            />
          )}
        </View>

        <Button onPress={() => submitReview()}>SUBMIT</Button>
      </View>
    );
  };

  const CameraDisplay = () => {
    return (
      <View style={{flex: 1}}>
        <RNCamera
          ref={cameraRef}
          autoFocusPointOfInterest={autoFocusPoint.normalized}
          type={type}
          ratio={ratio}
          style={{flex: 1}}
          autoFocus={autoFocus}
          captureAudio={false}
        />
        <TouchableHighlight
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            borderWidth: 5,
            borderColor: '#FFF',
            marginBottom: 15,
            alignSelf: 'center',
          }}
          onPress={() => handlePicture()}
          underlayColor="rgba(255, 255, 255, 0.5)"
        >
          <View />
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {openCamera ? <CameraDisplay /> : <AddReviewDisplay />}
    </View>
  );
};

export default App;
