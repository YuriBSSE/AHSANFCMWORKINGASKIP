import React, {useEffect, useState} from 'react';
import AppNav from './AppNav';
import {View, Text, ActivityIndicator} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNav from './AuthNav';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
const Stack = createNativeStackNavigator();
const MainNavigation = () => {
  
  useEffect(() => {
    SplashScreen.hide();
  });
  const token = useSelector(state => state?.auth?.credential?.token);
  // console.log(token,"navigation")

  useEffect(()=>{
    checkToken()
  },[])
  const checkToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
       console.log("fcmToken",fcmToken);
    } 
   }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {token ? (
          <Stack.Screen name="AppNav" component={AppNav} />
        ) : (
          <Stack.Screen name="AuthNav" component={AuthNav} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
