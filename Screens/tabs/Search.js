import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Searchbar, Button} from 'react-native-paper';
import {} from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import {backgroundStyles} from '../../Components/AppStyle';

const App = ({navigation}) => {
  const [spinner, setSpinner] = useState(true);
  const [searchValue, setSearchValue] = useState('sdafsf');
  const handleSearch = () => {
    navigation.navigate('SearchResult', {searchValue});
  };

  useEffect(() => {
    setSpinner(false);
  }, []);

  return (
    <View style={backgroundStyles.container}>
      <Spinner
        visible={spinner}
        textContent="Loading..."
        textStyle={{color: '#FFF'}}
      />
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
