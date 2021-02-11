import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Surface, Card, Button} from 'react-native-paper';
import {Rating} from 'react-native-ratings';

const LocationDisplay = (props) => {
  const styles = StyleSheet.create({
    surface: {
      flex: 0,
      padding: 8,
      justifyContent: 'center',
      elevation: 12,
      margin: 6,
    },
  });

  const {itemDetails} = props;
  const item = {
    cafeID: itemDetails.location_id,
    cafeName: itemDetails.location_name,
    town: itemDetails.location_town,
    image: itemDetails.photo_path,
    latitude: itemDetails.latitude,
    longitute: itemDetails.longitute,
    starRating: itemDetails.avg_overall_rating,
  };

  return (
    <Surface style={styles.surface}>
      <Card>
        <View style={{flexDirection: 'row'}}>
          <Card.Title
            title={item.cafeName}
            subtitle={item.town}
            style={{flex: 2}}
          />
          <Rating
            imageSize={23}
            readonly
            startingValue={item.starRating}
            style={{flex: 1, marginTop: 10}}
          />
        </View>

        <Card.Cover source={{uri: item.image}} />
        <Card.Actions style={{justifyContent: 'flex-end'}}>
          <Button>Ok</Button>
        </Card.Actions>
      </Card>
    </Surface>
  );
};

export default LocationDisplay;
