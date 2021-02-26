import {StyleSheet} from 'react-native';
import defaultColourPallet from './ColourPallet';

const styles = StyleSheet.create({
  middle: {
    flex: 0,
    backgroundColor: defaultColourPallet.background,
    // marginHorizontal: 24,
    margin: 24,
    padding: 6,
  },
  titleText: {
    marginTop: 24,
    marginLeft: 24,
    fontWeight: 'bold',
    fontSize: 25,
    // color: 'black',
  },
  fullSizeTextInput: {
    marginHorizontal: 24,
    marginTop: 12,
    height: 40,
    width: 250,
    fontSize: 16,
  },
  halfSizeTextInput: {
    marginHorizontal: 10,
    marginTop: 12,
    height: 40,
    width: 110,

    fontSize: 16,
  },
  button: {
    margin: 24,
  },
});

const backgroundStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: defaultColourPallet.onBackground,
  },
  containerWithAlignAndJustify: {
    flex: 1,
    backgroundColor: defaultColourPallet.onBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgHeaderContainer: {
    paddingTop: 125,
  },
});

export {styles, backgroundStyles};
