import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {Button} from 'react-native-paper';

const CameraComponent = ({initialProps}) => {
  const [camState, setCamState] = useState();
  const [
    {cameraRef, type, ratio, autoFocus, autoFocusPoint},
    {takePicture},
  ] = useCamera(initialProps);

  const handlePicture = async () => {
    const response = await takePicture();
    setCamState(response);
  };

  return (
    <View style={{flex: 1}}>
      <RNCamera
        ref={cameraRef}
        autoFocusPointOfInterest={autoFocusPoint.normalized}
        type={type}
        ratio={ratio}
        style={{flex: 1}}
        autoFocus={autoFocus}
        captureAudio={false}
      />
      <TouchableOpacity
        onPress={() => handlePicture()}
        style={{width: '100%', height: 45}}
      >
        <Text>{type}</Text>
      </TouchableOpacity>

      <Button onPress={() => console.log('pressed')}>LOL</Button>
    </View>
  );
};

export default CameraComponent;
