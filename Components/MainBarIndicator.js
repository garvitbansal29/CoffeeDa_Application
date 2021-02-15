import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';
import Colours from './ColourPallet';

const App = (props) => {
  const {rating, label} = props;

  const styles = StyleSheet.create({
    lineBarBackground: {
      backgroundColor: Colours.background,
      height: 3,
      width: 200,
      borderBottomEndRadius: 10,
      borderTopEndRadius: 10,
      alignSelf: 'center',
    },
    lineBar: {
      backgroundColor: Colours.accent,
      height: 3,
      width: (200 / 5) * rating,
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
      <Subheading style={{color: 'black', fontSize: 14}}>{label}</Subheading>
      <View style={styles.lineBarBackground}>
        <View style={styles.lineBar} />
      </View>
    </View>
  );
};

export default App;
