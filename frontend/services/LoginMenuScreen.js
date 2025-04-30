import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>로그인 방식 선택</Text>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('GoogleLogin')}
      >
        <Text style={styles.loginText}>구글 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('KakaoLogin')}
      >
        <Text style={styles.loginText}>카카오 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('AppleLogin')}
      >
        <Text style={styles.loginText}>애플 로그인</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('NaverLogin')}
      >
        <Text style={styles.loginText}>네이버 로그인</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEB85', // 따뜻한 노란색 배경
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 40,
    fontWeight: 'bold',
    color: 'brown',
  },
  loginButton: {
    backgroundColor: '#FFF8D1',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#FFD54F',
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: 'brown',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
