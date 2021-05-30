import 'react-native-gesture-handler';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Header} from 'react-native/Libraries/NewAppScreen';
import CameraScreen from './src/screens/CameraScreen';
import HomeScreen from './src/screens/HomeScreen';
import StepOneScreen from './src/screens/StepOneScreen';
import TutorialScreen from './src/screens/TutorialScreen';

const App = () => {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <NavigationContainer>
        <Drawer.Navigator drawerType="slide">
          <Drawer.Screen
            // options={Header:true}
            options={{
              headerShown: true,
              headerTitleStyle: {display: 'none'},
              headerStyle: {backgroundColor: 'lightgray'},
            }}
            drawerType
            name="Home"
            component={HomeScreen}
          />
          <Drawer.Screen
            name="tutorial"
            options={{headerShown: true, headerTitleStyle: {display: 'none'}}}
            component={TutorialScreen}
          />
          <Drawer.Screen
            name="camera"
            options={{headerShown: true, headerTitleStyle: {display: 'none'}}}
            component={CameraScreen}
          />
          <Drawer.Screen
            options={{headerShown: true, headerTitleStyle: {display: 'none'}}}
            name="step-one"
            component={StepOneScreen}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
