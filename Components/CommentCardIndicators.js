import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';
import Colours from './ColourPallet';

const App = (props) => {
  const {rating, label} = props;

  const styles = StyleSheet.create({
    lineBarBackground: {
      backgroundColor: Colours.background,
      height: 5,
      width: 150,
      borderBottomEndRadius: 10,
      borderTopEndRadius: 10,
      marginVertical: 12,
    },
    lineBar: {
      backgroundColor: Colours.primary,
      height: 5,
      width: (150 / 5) * rating,
      borderBottomEndRadius: 10,
      borderTopEndRadius: 10,
    },
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 6,
      }}
    >
      <Subheading style={{color: 'black', fontSize: 15}}>{label}</Subheading>
      <View style={styles.lineBarBackground}>
        <View style={styles.lineBar} />
      </View>
    </View>
  );
};

export default App;
