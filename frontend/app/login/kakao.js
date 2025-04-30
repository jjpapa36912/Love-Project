import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const KakaoLoginScreen = () => {
  const kakaoLogin = async () => {
    const redirectUri = 'https://auth.expo.io/@jjpapa36912/frontend';
    const CLIENT_ID = '83a2cc54ffb51e42b6393b13619bf559'; // 카카오 네이티브 앱 키

    const authRequest = new AuthSession.AuthRequest({
      clientId: CLIENT_ID,
      scopes: [],
      redirectUri,
      responseType: AuthSession.ResponseType.Code,
    });

    const authUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&response_type=code`;
    console.log(authUrl);

    const result = await authRequest.promptAsync({ authorizationEndpoint: authUrl });

    if (result.type === 'success') {
      console.log('인증 성공, code:', result.params.code);
    } else {
      console.log('인증 실패:', result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kakao 로그인</Text>

      <TouchableOpacity style={styles.loginButton} onPress={kakaoLogin}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/KakaoTalk_logo.svg' }}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Sign in with Kakao</Text>
      </TouchableOpacity>
    </View>
  );
}
export default KakaoLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4B2',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    color: 'brown',
    fontWeight: 'bold',
  },
  loginButton: {
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
    elevation: 3,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  userBox: {
    marginTop: 30,
    alignItems: 'center',
  },
  welcome: {
    fontSize: 18,
    color: 'brown',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});