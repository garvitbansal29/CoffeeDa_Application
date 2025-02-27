import React, {useState, useEffect} from 'react';
import {Alert, View} from 'react-native';
import {
  Text,
  Modal,
  Title,
  TextInput,
  Button,
  IconButton,
  Portal,
  Dialog,
  Paragraph,
} from 'react-native-paper';
import {Rating} from 'react-native-ratings';

import Colours from './ColourPallet';
import {updateReview, deleteReview, deleteReviewPhoto} from './apiUtils';
import filter from './filter';

const App = ({hideModal, visibility, review, locationName}) => {
  const containerStyle = {backgroundColor: Colours.background, padding: 20};
  const [reviewBody, setReviewBody] = useState(review.reviewBody);
  const [overallRating, setOverallRating] = useState(review.overallRating);
  const [priceRating, setPriceRating] = useState(review.priceRating);
  const [qualityRating, setQualityRating] = useState(review.qualityRating);
  const [cleanlinessRating, setCleanlinessRating] = useState(
    review.cleanlinessRating,
  );
  const [deleteAlertVisible, setDeleteAlertVisible] = useState(false);

  const showDialog = () => setDeleteAlertVisible(true);

  const hideDialog = () => setDeleteAlertVisible(false);

  const updateExistingReview = async () => {
    const response = await updateReview({
      reviewBody,
      overallRating,
      priceRating,
      qualityRating,
      cleanlinessRating,
      locationID: review.locationID,
      reviewID: review.reviewID,
    });
    if (response) {
      Alert.alert('Review Updated Successfully');
      hideModal();
    } else {
      Alert.alert('Unable to Update Review');
    }
  };

  const deletePhoto = async () => {
    const response = await deleteReviewPhoto({
      locationID: review.locationID,
      reviewID: review.reviewID,
    });
    return response;
  };

  const deleteUserReview = async () => {
    hideDialog();

    if (deletePhoto()) {
      const response = await deleteReview({
        locationID: review.locationID,
        reviewID: review.reviewID,
      });
      if (response) {
        Alert.alert('Review Deleted Successfully');
        hideModal();
      } else {
        Alert.alert('Error: Review was not deleted');
      }
    } else {
      Alert.alert('Error: Review photo was not deleted');
    }
  };

  useEffect(() => {
    setReviewBody((input) => filter.clean(input));
  }, [reviewBody]);

  const DeleteReviewAlert = () => {
    return (
      <View>
        <Portal>
          <Dialog visible={deleteAlertVisible} onDismiss={() => hideDialog()}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>
                Are you sure you would like to delete this review?
              </Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => hideDialog()}>Cancel</Button>
              <Button onPress={() => deleteUserReview()}>Yes</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  };

  return (
    <Modal
      visible={visibility}
      dismissable
      onDismiss={hideModal}
      contentContainerStyle={containerStyle}
    >
      <DeleteReviewAlert />
      <View style={{alignItems: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <Title>Update your Review for {locationName}! </Title>
          <IconButton
            icon="delete"
            color={Colours.primary}
            size={20}
            // onPress={() => deleteUserReview()}
            onPress={() => showDialog()}
          />
        </View>
        <Rating
          type="custom"
          ratingBackgroundColor={Colours.accent}
          ratingColor={Colours.onBackground}
          tintColor={Colours.background}
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
            type="custom"
            ratingBackgroundColor={Colours.accent}
            ratingColor={Colours.onBackground}
            tintColor={Colours.background}
            startingValue={priceRating}
            style={{paddingVertical: 10}}
            onFinishRating={(rating) => setPriceRating(rating)}
            imageSize={25}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 10, marginRight: 24}}>Quality Rating:</Text>
          <Rating
            type="custom"
            ratingBackgroundColor={Colours.accent}
            ratingColor={Colours.onBackground}
            tintColor={Colours.background}
            startingValue={qualityRating}
            style={{paddingVertical: 10}}
            onFinishRating={(rating) => setQualityRating(rating)}
            imageSize={25}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{marginTop: 10, marginRight: 24}}>
            Cleanliness Rating:
          </Text>
          <Rating
            type="custom"
            ratingBackgroundColor={Colours.accent}
            ratingColor={Colours.onBackground}
            tintColor={Colours.background}
            startingValue={cleanlinessRating}
            style={{paddingVertical: 10}}
            onFinishRating={(rating) => setCleanlinessRating(rating)}
            imageSize={25}
          />
        </View>
      </View>
      <Button onPress={() => updateExistingReview()}>SUBMIT</Button>
    </Modal>
  );
};

export default App;
