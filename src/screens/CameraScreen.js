import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Button} from 'react-native-paper';
const CameraScreen = ({navigation}) => {
  const cameraRef = useRef(null);
  const [camType, setCamType] = useState(RNCamera.Constants.Type.front);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);

  const takePicture = async () => {
    console.log(1);
    if (cameraRef) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      //   console.log(data.uri);
      navigation.navigate('step-one', {uri: data.uri});
    }
  };

  // const flipCamera = () => {
  //   if (camType === RNCamera.Constants.Type.back) {
  //     setCamType(RNCamera.Constants.Type.front);
  //   } else {
  //     setCamType(RNCamera.Constants.Type.back);
  //   }
  // };
  // const toggleFlash = () => {
  //   if (flash === RNCamera.Constants.FlashMode.off) {
  //     setFlash(RNCamera.Constants.FlashMode.on);
  //     console.log(1);
  //   } else {
  //     setFlash(RNCamera.Constants.FlashMode.off);
  //   }
  // };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={camType}
        flashMode={flash}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        // captureAudio={false}
        // androidRecordAudioPermissionOptions={{
        //   title: 'Permission to use audio recording',
        //   message: 'We need your permission to use your audio',
        //   buttonPositive: 'Ok',
        //   buttonNegative: 'Cancel',
        // }}
        // onGoogleVisionBarcodesDetected={({ barcodes }) => {
        //   console.log(barcodes);
        // }}
      >
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          {/* <TouchableOpacity
            onPress={() => toggleFlash()}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> flash </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.capture}>
            <Button color="white" style={styles.startBtn}>
              capture
            </Button>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => flipCamera()} style={styles.capture}>
            <Text style={{fontSize: 14}}> type </Text>
          </TouchableOpacity> */}
        </View>
      </RNCamera>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    backgroundColor: '#84AAFF',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 3,
    alignSelf: 'center',
    margin: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});
