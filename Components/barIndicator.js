import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

const App = (props) => {
  const {rating, fullSize, label} = props;

  const styles = StyleSheet.create({
    lineBarBackground: {
      backgroundColor: '#b0b0b0',
      height: 5,
      width: fullSize,
      borderBottomEndRadius: 10,
      borderTopEndRadius: 10,
      marginVertical: 12,
    },
    lineBar: {
      backgroundColor: 'black',
      height: 5,
      width: (fullSize / 5) * rating,
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
      <Text>{label}</Text>
      <View style={styles.lineBarBackground}>
        <View style={styles.lineBar} />
      </View>
    </View>
  );
};

export default App;
