import {StyleSheet} from 'react-native';
import defaultColourPallet from './ColourPallet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColourPallet.primary,
  },
  middle: {
    flex: 1,
    backgroundColor: defaultColourPallet.surface,
    marginVertical: 150,
    marginHorizontal: 70,
  },
  titleText: {
    marginTop: 24,
    marginLeft: 25,
    fontWeight: 'bold',
    fontSize: 25,
  },
  textInput: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  button: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  horizontalCenter: {
    marginHorizontal: 24,
  },
});
const styles2 = StyleSheet.create({});

export {styles, styles2};
