import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Stack 임포트
import { login } from "@react-native-seoul/kakao-login";


import GoogleLoginScreen from '../services/GoogleLoginScreen';
import KakaoLoginScreen  from '../services/KakaoLoginScreen';
import AppleLoginScreen, { handleAppleLogin } from '../services/AppleLoginScreen';
import NaverLoginScreen, { handleNaverLogin } from '../services/NaverLoginScreen';
import LoginMenuScreen from "../services/LoginMenuScreen";

WebBrowser.maybeCompleteAuthSession();
const Stack = createStackNavigator();



export default function App() {
  return (
      // <NavigationContainer>

      <Stack.Navigator initialRouteName="LoginMenu">
        <Stack.Screen name="LoginMenu" component={LoginMenuScreen} />

        <Stack.Screen name="GoogleLogin" component={GoogleLoginScreen} />
          <Stack.Screen name="AppleLogin" component={AppleLoginScreen} />
          <Stack.Screen name="KakaoLogin" component={KakaoLoginScreen} />
          <Stack.Screen name="NaverLogin" component={NaverLoginScreen} />
        </Stack.Navigator>
       //</NavigationContainer>
  );
}
