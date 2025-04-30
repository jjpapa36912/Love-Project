import React, { useState } from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as WebBrowser from 'expo-web-browser';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function AppleLoginScreen() {
  const [userInfo, setUserInfo] = useState(null);

  const handleAppleLogin = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      console.log(credentials);
      setUserInfo(credentials);
    } catch (error) {
      console.log('Apple login error: ', error);
    }
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Apple 로그인</Text>

        <TouchableOpacity style={styles.loginButton} onPress={handleAppleLogin}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' }}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign in with Apple</Text>
        </TouchableOpacity>

        {userInfo && (
          <View style={styles.userBox}>
            <Text style={styles.welcome}>환영합니다, {userInfo.fullName?.givenName}님!</Text>
            <Text style={styles.email}>{userInfo.email}</Text>
          </View>
        )}
      </View>
    );
  }

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
