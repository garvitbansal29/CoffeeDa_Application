import React from 'react';
import {Button, Text, View} from 'react-native';
import {} from 'react-native-gesture-handler';

const App = ({navigation}) => {
  return (
    <View>
      <Text>this is a review</Text>
      <Button
        title="enter Review"
        onPress={() => navigation.navigate('EnterReviewScreen')}
      />
    </View>
  );
};

export default App;
