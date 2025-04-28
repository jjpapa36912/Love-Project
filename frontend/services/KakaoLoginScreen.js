// KakaoLoginScreen.js
import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import * as AuthSession from 'expo-auth-session';
// import * as navigation from "expo-router/build/global-state/routing";

const KakaoLoginScreen = () => {
  const kakaoLogin = async () => {
    const redirectUri = 'https://auth.expo.io/@jjpapa36912/frontend'//AuthSession.makeRedirectUri({ useProxy: true });
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

      // 여기서 code를 백엔드 서버로 보내거나, 토큰 요청하면 돼
    } else {
      console.log('인증 실패:', result);
    }
  };
  return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={kakaoLogin}>
          <Image
              source={require("@/assets/images/icon.png")}
              style={styles.icon}
          />
          <Text style={styles.buttonText}>카카오로 로그인</Text>
        </TouchableOpacity>
      </View>
  );
};

export default KakaoLoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // 배경색 흰색
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7E600', // 카카오톡 색
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    width: 25,
    height: 25,
  },
});