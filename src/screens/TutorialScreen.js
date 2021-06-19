import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/core';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
const TutorialScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  //   navigation.f;
  const [images, setImages] = useState([
    {
      id: 1,
      uri: require('../../assets/steps.jpg'),
      desc: ' Sit at roughly arms length from your mobile (about 80cm)',
    },
    {
      id: 2,
      uri: require('../../assets/steps.jpg'),
      desc: 'Hold your card under your nose: left and right sides should be visible',
    },
    {
      id: 3,
      uri: require('../../assets/steps.jpg'),
      desc: 'you must be facing the camera centered with the mobile screen',
    },
    {
      id: 4,
      uri: require('../../assets/steps.jpg'),
      desc: 'Your eyes should be at the same height as the mobile (place the mobile on something if needed)',
    },
    {
      id: 5,
      uri: require('../../assets/steps.jpg'),
      desc: 'If you wear glasses, remove the',
    },
  ]);
  //   console.log(navigation.isFocused);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    setCurrent(0);
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <Image source={images?.[current]?.uri} style={styles.image} />
      <View style={styles.descView}>
        <Text style={styles.desc}> {images[current].desc}</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          current != 4 ? setCurrent(current + 1) : navigation.navigate('camera')
        }>
        <Button color="white" style={styles.startBtn}>
          {current != 4 ? (
            <AwesomeIcon name="arrow-right" size={20} color="white" />
          ) : (
            'Start'
          )}
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default TutorialScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'column',
  },
  startBtn: {
    backgroundColor: '#84AAFF',
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 3,
  },
  desc: {
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  descView: {
    marginHorizontal: 10,
  },
});
