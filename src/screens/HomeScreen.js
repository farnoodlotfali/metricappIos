import {useNavigation} from '@react-navigation/core';
import React from 'react';
import React1 from '../../assets/SelfieIllustration.jpg';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {Button} from 'react-native-paper';
const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/SelfieIllustration.jpg')}
        style={styles.image}
      />
      <Text style={styles.start}>Let's Start!</Text>
      <TouchableOpacity onPress={() => navigation.navigate('tutorial')}>
        <Button color="white" style={styles.startBtn}>
          start
        </Button>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

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
  start: {
    fontSize: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
});
