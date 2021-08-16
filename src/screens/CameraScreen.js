import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {RNCamera, FaceDetector} from 'react-native-camera';
import {Button} from 'react-native-paper';
import {useIsFocused} from '@react-navigation/core';
const CameraScreen = ({navigation}) => {
  const cameraRef = useRef(null);
  const isFocused = useIsFocused();

  const [camType, setCamType] = useState(RNCamera.Constants.Type.front);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [isFaceDetected, setIsFaceDetected] = useState(true);
  const [FaceDetect, setFaceDetect] = useState(null);

  useEffect(() => {
    setIsFaceDetected(true);
    setFaceDetect(null);
  }, [isFocused]);

  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.6, base64: true, mirrorImage: true};
      const data = await cameraRef.current.takePictureAsync(options);
      //   console.log(data.uri);
      navigation.navigate('step-one', {uri: data.uri, face: FaceDetect});
    }
    setIsFaceDetected(false);
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
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.fast}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={face => {
          // console.log(22);
          // console.log(face);

          if (isFaceDetected && face.faces.length !== 0) {
            setFaceDetect(JSON.stringify(face.faces[0]));
            // console.log(FaceDetect);
            // console.log(2);
            // console.log('right:', face.faces[0]?.rightEyePosition);
            // console.log('left:', face.faces[0]?.leftEyePosition);
          } else {
            setFaceDetect(null);
          }
        }}
        onFaceDetectionError={() => console.log(error)}
        // captureAudio={false}
        // androidRecordAudioPermissionOptions={{
        //   title: 'Permission to use audio recording',
        //   message: 'We need your permission to use your audio',
        //   buttonPositive: 'Ok',
        //   buttonNegative: 'Cancel',
        // }}
        onGoogleVisionBarcodesDetected={({barcodes}) => {
          console.log(barcodes);
        }}>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          {/* <TouchableOpacity
            onPress={() => toggleFlash()}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> flash </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            onPress={() => takePicture()}
            style={styles.capture}>
            <Text style={styles.startBtn}>capture</Text>
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
  startBtn: {
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
  },
});
