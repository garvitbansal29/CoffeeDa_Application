import React from 'react';
import {View, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {getToken} from '../../Components/SessionToken';

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
  const handleSearch = () => {
    navigation.navigate('SearchResult');
    // console.log(`user token: ${getToken()}`);
  };
  return (
    <View style={styles.container}>
      <TextInput placeholder="Enter email" />
      <Button title="Submit" onPress={() => handleSearch()} />
    </View>
  );
};

export default App;
