import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#566EA4',
  },
  middle: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 150,
    marginHorizontal: 70,
  },
});

const App = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter email" />
      <Button
        title="Submit"
        onPress={() => navigation.navigate('SearchResult')}
      />
    </View>
  );
};

export default App;
