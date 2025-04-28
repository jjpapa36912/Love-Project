import { View, Button } from 'react-native';

export default function LoginMenuScreen({ navigation }) {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="구글 로그인" onPress={() => navigation.navigate('GoogleLogin')} />
        <Button title="카카오 로그인" onPress={() => navigation.navigate('KakaoLogin')} />
        <Button title="애플 로그인" onPress={() => navigation.navigate('AppleLogin')} />
        <Button title="네이버 로그인" onPress={() => navigation.navigate('NaverLogin')} />
      </View>
  );
}
