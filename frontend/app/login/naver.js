import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

const NaverLoginScreen = () => {
  const redirectUri = 'https://auth.expo.io/@jjpapa36912/frontend'; // 실제 URI로 변경 필요
  const CLIENT_ID = 'loHCwroBGxHcKCmHERN2'; // 네이버 클라이언트 ID
  const STATE = 'RANDOM_STATE_STRING'; // 상태 문자열

  const discovery = {
    authorizationEndpoint: 'https://nid.naver.com/oauth2.0/authorize',
    tokenEndpoint: 'https://nid.naver.com/oauth2.0/token',
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      responseType: 'code',
      scopes: ['name', 'email'],
      state: STATE,
    },
    discovery
  );

  const handleLogin = async () => {
    if (request) {
      const result = await promptAsync();
      console.log('result:', result);

      if (result.type === 'success') {
        const { code } = result.params;
        console.log('인증 성공, code:', code);
        // 서버로 code 전송 후 토큰 교환
      } else {
        console.log('인증 실패:', result);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Naver 로그인</Text>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Naver_Logotype.svg' }}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Sign in with Naver</Text>
      </TouchableOpacity>
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

export default NaverLoginScreen;





// import React from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import * as AuthSession from 'expo-auth-session';
//
// const NaverLoginScreen = () => {
//   const naverLogin = async () => {
//     const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
//     const CLIENT_ID = 'loHCwroBGxHcKCmHERN2';
//     const CLIENT_SECRET = 'Sv1_xuZpwx'; // 시크릿 추가
//     const STATE = 'RANDOM_STATE_STRING'; // 임의의 문자열
//
//     const authRequest = new AuthSession.AuthRequest({
//       clientId: CLIENT_ID,
//       responseType: AuthSession.ResponseType.Code,
//       scopes: ['name', 'email'],
//       redirectUri,
//     });
//     console.log('redirectUri 결과:', redirectUri);
//
//     const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${STATE}`;
//     console.log('authUrl 결과:', authUrl);
//
//     const result = await authRequest.promptAsync({ authorizationEndpoint: authUrl });
//
//     if (result.type === 'success') {
//       const { code } = result.params;
//       console.log('인증 성공, code:', code);
//
//       // ✅ 여기에 Access Token 요청 추가
//       try {
//         const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: `grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${STATE}`,
//         });
//
//         const tokenResult = await tokenResponse.json();
//         console.log('Access Token 결과:', tokenResult);
//
//         if (tokenResult.access_token) {
//           console.log('Access Token:', tokenResult.access_token);
//           // 여기서부터 사용자 정보 요청 가능
//         } else {
//           console.error('Access Token 요청 실패', tokenResult);
//         }
//       } catch (error) {
//         console.error('토큰 요청 중 오류 발생:', error);
//       }
//     } else {
//       console.log('인증 실패 또는 취소:', result);
//     }
//   };
//
//   return (
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.button} onPress={naverLogin}>
//           <Image
//               // source={require('@/assets/images/naver_icon.png')}
//               style={styles.icon}
//           />
//           <Text style={styles.buttonText}>네이버로 로그인</Text>
//         </TouchableOpacity>
//       </View>
//   );
// };
//
// export default NaverLoginScreen;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1EC800',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   icon: {
//     width: 25,
//     height: 25,
//   },
// });
//////////////////////////////////////////////////
// import React, { useEffect } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import * as AuthSession from 'expo-auth-session';
//
// const NaverLoginScreen = () => {
//   const CLIENT_ID = 'loHCwroBGxHcKCmHERN2';
//   const CLIENT_SECRET = 'OpRc8iZcyH';
//   const STATE = 'RANDOM_STATE_STRING';
//   const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
//
//   const discovery = {
//     authorizationEndpoint: 'https://nid.naver.com/oauth2.0/authorize',
//     tokenEndpoint: 'https://nid.naver.com/oauth2.0/token',
//   };
//
//   const [request, response, promptAsync] = AuthSession.useAuthRequest(
//       {
//         clientId: CLIENT_ID,
//         redirectUri,
//         responseType: 'code',
//         scopes: [],
//         state: STATE,
//       },
//       discovery
//   );
//
//   useEffect( () => {
//     if (response?.type === 'success') {
//       const { code } = response.params;
//       console.log('네이버 로그인 성공! code:', code);
//       // 여기서 code를 서버로 보내 access_token 받으면 됨
//       // 여기서 토큰 요청
//       const tokenResponse = await fetch('https://nid.naver.com/oauth2.0/token', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: `grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&state=${STATE}`,
//       });
//
//       const tokenResult = await tokenResponse.json();
//       console.log('토큰 응답:', tokenResult);
//
//       if (tokenResult.access_token) {
//         console.log('Access Token:', tokenResult.access_token);
//         // 이제 이걸로 사용자 정보 요청할 수 있음
//       } else {
//         console.error('토큰 요청 실패', tokenResult);
//       }
//     } else if (response?.type === 'error') {
//       console.log('로그인 에러:', response.error);
//     }
//   }, [response]);
//
//   const handleLogin = () => {
//     promptAsync();
//   };
//
//   return (
//       <View style={styles.container}>
//         <TouchableOpacity style={styles.button} onPress={handleLogin}>
//           <Image
//               // source={require('@/assets/images/naver_icon.png')}
//               style={styles.icon}
//           />
//           <Text style={styles.buttonText}>네이버로 로그인</Text>
//         </TouchableOpacity>
//       </View>
//   );
// };
//
// export default NaverLoginScreen;
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#1EC800',
//     paddingVertical: 12,
//     paddingHorizontal: 20,
//     borderRadius: 8,
//   },
//   buttonText: {
//     color: 'black',
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   icon: {
//     width: 25,
//     height: 25,
//   },
// });


// // AppleLoginScreen.js
// import React from 'react';
// import { View, Button, StyleSheet } from 'react-native';
// import * as AuthSession from 'expo-auth-session';
//
// export default function NaverLoginScreen() {
//   const CLIENT_ID = 'loHCwroBGxHcKCmHERN2'; // 네이버 Developer 콘솔에서 발급받은 Client ID
//   const CLIENT_SECRET = 'OpRc8iZcyH'; // 네이버 Developer 콘솔에서 발급받은 Client Secret
//   const STATE = Math.random().toString(36).substring(2, 15); // 보안용 랜덤 문자열
//   const REDIRECT_URI = AuthSession.makeRedirectUri({ useProxy: true }); // Expo에서 자동 처리해주는 redirect
//
//   const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}`;
//   console.log('Redirect URI:', REDIRECT_URI);
//   const handleNaverLogin = async () => {
//     try {
//       const result = await AuthSession.requestAsync({
//         authUrl: naverAuthUrl,
//         returnUrl: REDIRECT_URI,
//       });
//
//       if (result.type === 'success') {
//         console.log('네이버 로그인 성공! Authorization Code:', result.params.code);
//         console.log('State:', result.params.state);
//
//         // ✅ 받은 코드로 access token 요청
//         const tokenResult = await fetch(`https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${result.params.code}&state=${STATE}`, {
//           method: 'GET',
//         });
//
//         const tokenResponse = await tokenResult.json();
//         console.log('Access Token 응답:', tokenResponse);
//
//         if (tokenResponse.access_token) {
//           // ✅ access_token으로 사용자 정보 요청
//           const profileResult = await fetch('https://openapi.naver.com/v1/nid/me', {
//             method: 'GET',
//             headers: {
//               Authorization: `Bearer ${tokenResponse.access_token}`,
//             },
//           });
//
//           const profileResponse = await profileResult.json();
//           console.log('네이버 사용자 프로필:', profileResponse);
//         }
//       } else {
//         console.log('네이버 로그인 실패 또는 취소', result);
//       }
//     } catch (error) {
//       console.error('네이버 로그인 에러:', error);
//     }
//   };
//
//   return (
//       <View style={styles.container}>
//         <Button title="네이버로 로그인" onPress={handleNaverLogin} color="#1EC800" />
//       </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });


// import React, { useState } from 'react';
// import { Button, View, Text } from 'react-native';
// import NaverLogin from '@react-native-seoul/naver-login';
//
// export default function NaverLoginScreen() {
//   const [userInfo, setUserInfo] = useState(null);
//
//   const handleNaverLogin = async () => {
//     try {
//       const result = await NaverLogin.login();
//       console.log(result);
//       const profile = await getProfile();
//       setUserInfo(profile);
//     } catch (error) {
//       console.log('Naver login error: ', error);
//     }
//   };
//
//   return (
//       <View>
//         <Text>Login with Naver</Text>
//         <Button title="Sign in with Naver" onPress={handleNaverLogin} />
//         {userInfo && (
//             <View>
//               <Text>Name: {userInfo.name}</Text>
//               <Text>Email: {userInfo.email}</Text>
//             </View>
//         )}
//       </View>
//   );
// }
