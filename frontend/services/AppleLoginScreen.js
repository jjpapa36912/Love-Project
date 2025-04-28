import React, { useState } from 'react';
import { Button, View, Text } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';

export default function AppleLoginScreen() {
  const [userInfo, setUserInfo] = useState(null);

  const handleAppleLogin = async () => {
    try {
      const credentials = await AppleAuthentication.signInAsync();
      console.log(credentials);
      setUserInfo(credentials);
    } catch (error) {
      console.log('Apple login error: ', error);
    }
  };

  return (
      <View>
        <Text>Login with Apple</Text>
        <Button title="Sign in with Apple" onPress={handleAppleLogin} />
        {userInfo && (
            <View>
              <Text>Name: {userInfo.fullName.givenName}</Text>
              <Text>Email: {userInfo.email}</Text>
            </View>
        )}
      </View>
  );
}
