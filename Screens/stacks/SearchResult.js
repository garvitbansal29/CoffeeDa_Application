import React from 'react';
import {Button, Text, View} from 'react-native';
import {} from 'react-native-gesture-handler';

const App = ({navigation}) => {
  return (
    <View>
      <Button
        title="Location 1"
        onPress={() => navigation.navigate('LocationReviews')}
      />
      <Button title="Location 2" />
      <Button title="Location 3" />
      <Button title="Location 4" />
      <Button title="Location 5" />
    </View>
  );
};

export default App;
