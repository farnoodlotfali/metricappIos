import {useNavigation, useRoute} from '@react-navigation/core';
import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Platform,
  ScrollView,
} from 'react-native';
import {Button} from 'react-native-paper';
import CameraRoll from '@react-native-community/cameraroll';
import axios from 'axios';
const StepOneScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  // console.log(route.params.face);
  const hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    // console.log(hasPermission);
    if (hasPermission) {
      return true;
    }

    try {
      const status = await PermissionsAndroid.request(permission);
      return status === 'granted';
    } catch (error) {}
  };

  const savePicture = async () => {
    try {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }

      await CameraRoll.save(route?.params?.uri, {type: 'photo'});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            textTransform: 'uppercase',
          }}>
          STEP ONE
        </Text>
      </View>
      <View style={styles.imageView}>
        {route?.params?.uri ? (
          <Image style={styles.image} source={{uri: route.params.uri}} />
        ) : (
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 0.1,
            }}>
            <Text
              style={{textAlign: 'center', fontSize: 16, fontWeight: '600'}}>
              First you must take picture
            </Text>
          </View>
        )}
        {route.params.face ? (
          <ScrollView>
            <Text>face: {route.params.face}</Text>
          </ScrollView>
        ) : (
          <Text>no face detected</Text>
        )}
        <TouchableOpacity>
          <Button
            mode="outlined"
            color="white"
            icon="camera"
            onPress={() =>
              route?.params?.uri ? savePicture() : navigation.navigate('camera')
            }
            style={styles.submitBtn}>
            {route?.params?.uri ? ' Submit' : 'Take a Selfie'}
          </Button>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default StepOneScreen;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    top: 0,
    backgroundColor: 'lightgray',
    right: 0,
    left: 0,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {flex: 1, alignItems: 'center', justifyContent: 'space-evenly'},
  image: {
    height: 300,
    width: 250,
    borderRadius: 10,
  },
  submitBtn: {
    backgroundColor: '#84AAFF',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 3,
  },
});
