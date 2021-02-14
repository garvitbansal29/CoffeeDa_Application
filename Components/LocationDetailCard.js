import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Button, IconButton} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

import colors from './ColourPallet';
import {
  getFavouriteLocationID,
  updateFavourite,
  deleteFavourite,
} from './apiUtils';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const LocationDisplay = (props) => {
  const navigation = useNavigation();
  const {itemDetails} = props;

  const location = {
    cafeID: itemDetails.location_id,
    cafeName: itemDetails.location_name,
    town: itemDetails.location_town,
    image: itemDetails.photo_path,
    latitude: itemDetails.latitude,
    longitute: itemDetails.longitute,
    starRating: itemDetails.avg_overall_rating,
  };
  const [isFavourite, setIsFavourite] = useState(false);

  const checkIsFavourite = async () => {
    const favouritesList = await getFavouriteLocationID({userID: 9});
    setIsFavourite(
      favouritesList.some((item) => item.favLocationID === location.cafeID),
    );
  };

  const updateIsFavourite = async () => {
    if (!isFavourite) {
      const response = await updateFavourite({locationID: location.cafeID});
      setIsFavourite(response);
    } else {
      const response = await deleteFavourite({locationID: location.cafeID});
      if (response === true) {
        setIsFavourite(false);
      }
    }
  };

  useEffect(() => {
    checkIsFavourite();
  }, [isFavourite]);
  return (
    // <Surface style={styles.surface}>
    <Card
      onPress={() => navigation.navigate('LocationReviews', {props})}
      elevation={10}
      style={{margin: 10}}
    >
      <View style={{flexDirection: 'row'}}>
        <Card.Title
          title={location.cafeName}
          subtitle={location.town}
          style={{flex: 2}}
        />
        <Rating
          type="custom"
          imageSize={25}
          ratingColor={colors.accent}
          ratingBackgroundColor={colors.primary}
          tintColor={colors.surface}
          readonly
          startingValue={location.starRating}
          style={{flex: 1, margin: 12}}
        />
      </View>

      <Card.Cover source={{uri: location.image}} />
      <Card.Actions style={{justifyContent: 'flex-end'}}>
        <IconButton
          // icon="camera"
          icon={isFavourite ? 'heart' : 'heart-outline'}
          color="#eb2d4f"
          size={30}
          onPress={() => updateIsFavourite()}
        />
      </Card.Actions>
    </Card>
    // </Surface>
  );
};

export default LocationDisplay;
