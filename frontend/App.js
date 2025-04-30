//import React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import LoginMenuScreen from './services/LoginMenuScreen'; // 로그인 메뉴 화면
//import GoogleLoginScreen from './services/GoogleLoginScreen'; // 구글 로그인 화면
//import KakaoLoginScreen from './services/KakaoLoginScreen'; // 카카오 로그인 화면
//import AppleLoginScreen from './services/AppleLoginScreen'; // 애플 로그인 화면
//import NaverLoginScreen from './services/AppleLoginScreen'; // 네이버 로그인 화면
//import MainScreen from './screen/MainScreen'; // 메인 화면
//
//const Stack = createStackNavigator();
//
//const linking = {
//  prefixes: ['http://localhost:8081'],
//  config: {
//    screens: {
//      LoginMenu: 'login/LoginMenu',
//      GoogleLogin: 'login/GoogleLogin',
//      KakaoLogin: 'login/KakaoLogin',
//      AppleLogin: 'login/AppleLogin',
//      NaverLogin: 'login/NaverLogin',
//      Main: 'main',
//    },
//  },
//};
//
//
//export default function App() {
//  return (
//      <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
//        <Stack.Navigator initialRouteName="Main">
//          <Stack.Screen name="LoginMenu" component={LoginMenuScreen} />
//          <Stack.Screen name="GoogleLogin" component={GoogleLoginScreen} />
//          <Stack.Screen name="KakaoLogin" component={KakaoLoginScreen} />
//          <Stack.Screen name="AppleLogin" component={AppleLoginScreen} />
//          <Stack.Screen name="NaverLogin" component={NaverLoginScreen} />
//          <Stack.Screen name="Main" component={MainScreen} />
//        </Stack.Navigator>
//      </NavigationContainer>
//  );
//}
