import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useRouter } from 'expo-router';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleLoginScreen({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const router = useRouter(); // ✅ navigation 대신 router 사용
  // 웹에서는 useProxy: true로 설정하여 프록시를 사용합니다.
  const redirectUri = makeRedirectUri({
    useProxy: true,
  });

  const [request, response, promptAsync] = Google.useAuthRequest(
    {
      clientId: '314078962985-2jhcvlliuo8h2412la694doaa8b9ghba.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8081/',
      scopes: ['profile', 'email'],
      responseType: 'token',
    },
    { useProxy: true }
  );

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      getUserInfo(authentication.accessToken);
    }
  }, [response]);

  useEffect(() => {
    if (userInfo) {
      router.replace({
            pathname: '/MainScreen',
            params: {
              name: userInfo.name,
              email: userInfo.email,
            },
          });
    }
  }, [userInfo]);

  const getUserInfo = async (token) => {
    try {
      const userInfoResponse = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const user = await userInfoResponse.json();
      setUserInfo(user);
    } catch (error) {
      Alert.alert('오류', '사용자 정보를 가져오지 못했습니다.');
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Google 로그인</Text>

      <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png',
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      {userInfo && (
        <View style={styles.userBox}>
          <Text style={styles.welcome}>환영합니다, {userInfo.name}님!</Text>
          <Text style={styles.email}>{userInfo.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4B2', // 따뜻한 노란색
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    color: 'brown',
    fontWeight: 'bold'
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: '#FFD54F',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16
  },
  userBox: {
    marginTop: 30,
    alignItems: 'center'
  },
  welcome: {
    fontSize: 18,
    color: 'brown',
    fontWeight: 'bold',
    marginBottom: 5
  },
  email: {
    fontSize: 14,
    color: 'gray'
  }
});
