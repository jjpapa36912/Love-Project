import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { useAuthRequest } from 'expo-auth-session';

export default function KakaoLoginScreen() {
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = useAuthRequest({
    clientId: 'YOUR_KAKAO_APP_KEY', // 카카오 앱 키
    redirectUri: 'exp://172.30.1.42:8081', // Expo에서 사용하는 리디렉션 URI
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  const getUserInfo = async (token) => {
    try {
      const userInfoResponse = await fetch('https://kapi.kakao.com/v2/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await userInfoResponse.json();
      setUserInfo(user);
      console.log(user);
    } catch (error) {
      console.log('Error fetching user info:', error);
    }
  };

  return (
      <View>
        <Text>Login with Kakao</Text>
        <Button title="Sign in with Kakao" onPress={() => promptAsync()} />
        {userInfo && (
            <View>
              <Text>{`Hello, ${userInfo.properties.nickname}`}</Text>
              <Text>{`Email: ${userInfo.kakao_account.email}`}</Text>
            </View>
        )}
      </View>
  );
}
