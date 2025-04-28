import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';

export default function GoogleLoginScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);

  // 훅을 컴포넌트 내에서 호출
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '314078962985-2jhcvlliuo8h2412la694doaa8b9ghba.apps.googleusercontent.com',
    redirectUri: 'https://auth.expo.io/@jjpapa36912/frontend',
    scopes: ['profile', 'email'],
    responseType: 'token',
  },{ useProxy: true });

  useEffect(() => {
    console.log('00000000');
    console.log('00000000', response);

    if (response?.type === 'success') {
      console.log('111111');
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      console.log('22222222:>>>>>>');
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await userInfoResponse.json();
      setUserInfo(user);
      console.log('success:>>>>>>');

      navigation.navigate('Main');

    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };

  return (
      <View>
        <Text>Login with Google</Text>
        <Button title="Sign in with Google" onPress={() => promptAsync()} />
        {userInfo && (
            <View>
              <Text>Name: {userInfo.name}</Text>
              <Text>Email: {userInfo.email}</Text>
            </View>
        )}
      </View>
  );
}

//
// export const handleGoogleLogin = async () => {
//     const [request, response, promptAsync] = Google.useAuthRequest({
//       expoClientId: '314078962985-2jhcvlliuo8h2412la694doaa8b9ghba.apps.googleusercontent.com',
//       iosClientId: '314078962985-2jhcvlliuo8h2412la694doaa8b9ghba.apps.googleusercontent.com',
//       androidClientId: '314078962985-2jhcvlliuo8h2412la694doaa8b9ghba.apps.googleusercontent.com',
//       webClientId: '314078962985-2jhcvlliuo8h2412la694doaa8b9ghba.apps.googleusercontent.com',
//       redirectUri: 'https://auth.expo.io/@jjpapa36912/frontend',
//       scopes: ['profile', 'email'],
//     });
//
//     useEffect(() => {
//       if (response?.type === 'success') {
//         const {authentication} = response;
//         getUserInfo(authentication.accessToken);
//       }
//     }, [response]);
//
//     const getUserInfo = async (token) => {
//       try {
//         const userInfoResponse = await fetch(
//             'https://www.googleapis.com/oauth2/v3/userinfo', {
//               headers: {Authorization: `Bearer ${token}`},
//             });
//         const user = await userInfoResponse.json();
//         console.log(user);
//       } catch (error) {
//         console.log('Error fetching user info:', error);
//       }
//     };
//   }
