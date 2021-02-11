import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import {Searchbar, Button} from 'react-native-paper';
import {} from 'react-native-gesture-handler';
import {getToken} from '../../Components/SessionToken';

import {styles, backgroundStyles} from '../../Components/AppStyle';

const App = ({navigation}) => {
  const [searchValue, setSearchValue] = useState('sdafsf');
  const handleSearch = () => {
    navigation.navigate('SearchResult', {searchValue});
  };
  return (
    <View style={backgroundStyles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={(value) => setSearchValue(value)}
        // value={searchQuery}
      />

      <Button onPress={() => handleSearch()} mode="contained">
        Submit
      </Button>
    </View>
  );
};

export default App;
