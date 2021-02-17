import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Card, Button, IconButton} from 'react-native-paper';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import {getDistance} from 'geolib';

import RatingIndicator from './MainBarIndicator';
import colors from './ColourPallet';
import {
  getFavouriteLocationID,
  updateFavourite,
  deleteFavourite,
} from './apiUtils';

const LocationDisplay = (props) => {
  const navigation = useNavigation();
  const {itemDetails, currLongitude, currLatitude} = props;
  const [distance, setDistance] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);

  const location = {
    cafeID: itemDetails.location_id,
    cafeName: itemDetails.location_name,
    town: itemDetails.location_town,
    image: itemDetails.photo_path,
    latitude: itemDetails.latitude,
    longitute: itemDetails.longitude,
    starRating: itemDetails.avg_overall_rating,
    priceRating: itemDetails.avg_price_rating,
    qualityRating: itemDetails.avg_quality_rating,
    cleanlinessRating: itemDetails.avg_clenliness_rating,
  };

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

  function metersToMiles(meters) {
    return meters / 1609.3440057765;
  }

  const calculateDistance = async () => {
    const dist = getDistance(
      {latitude: currLatitude, longitude: currLongitude},
      {latitude: location.latitude, longitude: location.longitute},
    );
    const distInMiles = metersToMiles(dist);
    const milesRound = distInMiles.toFixed(1);
    setDistance(milesRound);
  };

  useEffect(() => {
    calculateDistance();
  });
  useEffect(() => {
    checkIsFavourite();
  }, [isFavourite]);

  return (
    <Card
      onPress={() =>
        navigation.navigate('LocationReviews', {
          locationID: location.cafeID,
        })
      }
      elevation={10}
      style={{margin: 10}}
    >
      <View style={{flexDirection: 'row'}}>
        <Card.Title
          title={location.cafeName}
          subtitle={`${location.town} (${distance} mi)`}
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

      <Card.Cover style={{marginBottom: 12}} source={{uri: location.image}} />
      <Card.Content>
        <View>
          <RatingIndicator
            rating={location.starRating}
            label="Overall Rating"
          />
          <RatingIndicator rating={location.priceRating} label="Price Rating" />
          <RatingIndicator
            rating={location.qualityRating}
            label="Quality Rating"
          />
          <RatingIndicator
            rating={location.cleanlinessRating}
            label="Cleanliness Rating"
          />
        </View>
      </Card.Content>
      <Card.Actions style={{justifyContent: 'flex-end'}}>
        <IconButton
          icon={isFavourite ? 'heart' : 'heart-outline'}
          color="#eb2d4f"
          size={30}
          onPress={() => updateIsFavourite()}
        />
      </Card.Actions>
    </Card>
  );
};

export default LocationDisplay;
