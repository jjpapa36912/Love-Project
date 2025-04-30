import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLocalSearchParams } from 'expo-router';

import AdBanner from '../components/AdBanner';
import { useRewardedAd } from '../hooks/useRewardedAd';

const MainScreen = () => {
  const router = useRouter();
  const { name, email } = useLocalSearchParams();

  const user = name && email ? { name, email } : null;
  const { tryRewardedAd } = useRewardedAd(); //  보상형 광고 로직 사용

  const handleLogin = () => {
    router.push({
      pathname: '/login',
      params: {
        onLoginSuccess: (userInfo) => {
          setUser(userInfo); // `setUser`은 실제 구현 필요
        }
      }
    });
  };

  const handleLogout = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      {/* 상단 사용자 정보 및 로그인/로그아웃 버튼 */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="brown" />
        </TouchableOpacity>
        <Text style={styles.userInfo}>
          {user ? `${user.name}님 환영합니다` : ''}
        </Text>
        <View style={styles.authButtons}>
          {!user && (
            <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
              <Text style={styles.authText}>Log in</Text>
            </TouchableOpacity>
          )}
          {user && (
            <TouchableOpacity style={styles.authButton} onPress={handleLogout}>
              <Text style={styles.authText}>Log out</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 로그인된 경우에만 사용자 프로필 표시 */}
      {user && (
        <View style={styles.userBox}>
          <Ionicons name="person-circle" size={50} color="brown" />
          <Text style={styles.username}>{user.name}</Text>
        </View>
      )}

      {/* ✅ [수정됨]: 텍스트 광고 제거 후 실제 광고 배너로 대체 */}
      <ScrollView contentContainerStyle={styles.adContainer} style={{ flex: 1 }}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={styles.adBox}>
            <AdBanner />
          </View>
        ))}
      </ScrollView>

      {/* ✅ [추가됨]: 보상형 광고 버튼 */}
      {user && (
        <TouchableOpacity
          style={styles.rewardBtn}
          onPress={() => tryRewardedAd(user.email)}
        >
          <Text style={{ color: 'white', fontWeight: 'bold' }}>광고 보고 코인 받기</Text>
        </TouchableOpacity>
      )}

      {/* 하단 감사 문구 */}
      <Text style={styles.thankYou}>Thank you!</Text>

      {/* 메뉴바 */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Ionicons name="home" size={24} color="brown" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/tabs')}>
          <Ionicons name="ellipse" size={24} color="brown" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Ionicons name="settings" size={24} color="brown" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEB85',
    padding: 10,
    paddingTop: 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  userInfo: {
    fontSize: 18,
    color: 'brown',
    fontWeight: 'bold'
  },
  authButtons: {
    flexDirection: 'row'
  },
  authButton: {
    marginLeft: 5,
    backgroundColor: '#FFE57F',
    padding: 5,
    borderRadius: 5
  },
  authText: {
    color: 'brown',
    fontWeight: 'bold'
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15
  },
  username: {
    marginLeft: 10,
    fontSize: 18,
    color: 'brown'
  },
  adContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  adBox: {
    width: '48%',
    backgroundColor: '#FFF8D1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    borderColor: '#FFD54F',
    borderWidth: 1
  },
  rewardBtn: { // ✅ [추가됨]
    backgroundColor: 'brown',
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  thankYou: {
    textAlign: 'center',
    fontSize: 16,
    color: 'brown',
    marginVertical: 10
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#FFD54F',
    backgroundColor: '#FFE082'
  }
});

export default MainScreen;


//import React, { useState } from 'react';
//import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
//import { Ionicons } from '@expo/vector-icons';
//import { useRouter } from 'expo-router';
//import { useLocalSearchParams } from 'expo-router';
//import AdBanner from '../components/AdBanner'; // 배너 광고
//import { useRewardedAd } from '../hooks/useRewardedAd';
//
//
//const MainScreen = () => {
//  const router = useRouter();
//  const { name, email } = useLocalSearchParams();
//  const { tryRewardedAd } = useRewardedAd(); // 보상형 광고 훅 사용
//
//
//  const user = name && email ? { name, email } : null;
//
//  const handleLogin = () => {
//    router.push({
//      pathname: '/login',
//      params: {
//        onLoginSuccess: (userInfo) => {
//          setUser(userInfo); // 로그인 성공 시 user 설정
//        }
//      }
//    });
//  };
//
//  const handleLogout = () => {
//    router.replace('/');
//  };
//
//  return (
//    <View style={styles.container}>
//      {/* 상단 사용자 정보 및 로그인/로그아웃 버튼 */}
//      <View style={styles.header}>
//        <TouchableOpacity>
//          <Ionicons name="menu" size={24} color="brown" />
//        </TouchableOpacity>
//        <Text style={styles.userInfo}>
//          {user ? `${user.name}님 환영합니다` : ''}
//        </Text>
//        <View style={styles.authButtons}>
//          {!user && (
//            <TouchableOpacity style={styles.authButton} onPress={handleLogin}>
//              <Text style={styles.authText}>Log in</Text>
//            </TouchableOpacity>
//          )}
//          {user && (
//            <TouchableOpacity style={styles.authButton} onPress={handleLogout}>
//              <Text style={styles.authText}>Log out</Text>
//            </TouchableOpacity>
//          )}
//        </View>
//      </View>
//
//      {/* 로그인된 경우에만 사용자 프로필 표시 */}
//      {user && (
//        <View style={styles.userBox}>
//          <Ionicons name="person-circle" size={50} color="brown" />
//          <Text style={styles.username}>{user.name}</Text>
//        </View>
//      )}
//
////      {/* 광고 배치 */}
////      <ScrollView contentContainerStyle={styles.adContainer} style={{ flex: 1 }}>
////        {ads.map((ad, index) => (
////          <View key={index} style={styles.adBox}>
////            <Text style={styles.adTitle}>AD</Text>
////            <Text style={styles.adText}>{ad.line1}</Text>
////            <Text style={styles.adFooter}>{ad.line2}</Text>
////          </View>
////        ))}
////      </ScrollView>
//        //[수정됨]: 텍스트 광고 제거 후 실제 광고 배너로 대체
//      <ScrollView contentContainerStyle={styles.adContainer} style={{ flex: 1 }}>
//        {[1, 2, 3, 4].map((_, index) => (
//          <View key={index} style={styles.adBox}>
//            <AdBanner />
//          </View>
//        ))}
//      </ScrollView>
//
//      //  보상형 광고 버튼
//      {user && (
//        <TouchableOpacity
//          style={styles.rewardBtn}
//          onPress={() => tryRewardedAd(user.email)}
//        >
//          <Text style={{ color: 'white', fontWeight: 'bold' }}>광고 보고 코인 받기</Text>
//        </TouchableOpacity>
//      )}
//
//      {/* 하단 감사 문구 */}
//      <Text style={styles.thankYou}>Thank you!</Text>
//
//      {/* 메뉴바 */}
//      <View style={styles.navBar}>
//        <TouchableOpacity onPress={() => router.push('/')}>
//          <Ionicons name="home" size={24} color="brown" />
//        </TouchableOpacity>
//        <TouchableOpacity onPress={() => router.push('/tabs')}>
//          <Ionicons name="ellipse" size={24} color="brown" />
//        </TouchableOpacity>
//        <TouchableOpacity onPress={() => router.push('/settings')}>
//          <Ionicons name="settings" size={24} color="brown" />
//        </TouchableOpacity>
//      </View>
//    </View>
//  );
//};
//
//// 광고 문구 배열
//const ads = [
//  { line1: 'Thanks to our sponsors!', line2: 'See ads like this' },
//  { line1: 'Benefit from advertising', line2: 'See ads like this' },
//  { line1: 'Your ad supports orphans', line2: 'Thank you!' },
//  { line1: 'Benefit from ads!', line2: 'Thank you!' }
//];
//
//const styles = StyleSheet.create({
//  container: {
//    flex: 1,
//    backgroundColor: '#FFEB85',
//    padding: 10,
//    paddingTop: 40
//  },
//  header: {
//    flexDirection: 'row',
//    justifyContent: 'space-between',
//    alignItems: 'center'
//  },
//  userInfo: {
//    fontSize: 18,
//    color: 'brown',
//    fontWeight: 'bold'
//  },
//  authButtons: {
//    flexDirection: 'row'
//  },
//  authButton: {
//    marginLeft: 5,
//    backgroundColor: '#FFE57F',
//    padding: 5,
//    borderRadius: 5
//  },
//  authText: {
//    color: 'brown',
//    fontWeight: 'bold'
//  },
//  userBox: {
//    flexDirection: 'row',
//    alignItems: 'center',
//    marginVertical: 15
//  },
//  rewardBtn: { // ✅ [추가됨]
//      backgroundColor: 'brown',
//      padding: 10,
//      marginVertical: 10,
//      borderRadius: 10,
//      alignItems: 'center'
//    },
//  username: {
//    marginLeft: 10,
//    fontSize: 18,
//    color: 'brown'
//  },
//  adContainer: {
//    flexDirection: 'row',
//    flexWrap: 'wrap',
//    justifyContent: 'space-between'
//  },
//  adBox: {
//    width: '48%',
//    backgroundColor: '#FFF8D1',
//    padding: 15,
//    marginVertical: 5,
//    borderRadius: 10,
//    borderColor: '#FFD54F',
//    borderWidth: 1
//  },
//  adTitle: {
//    fontSize: 18,
//    fontWeight: 'bold',
//    color: 'brown'
//  },
//  adText: {
//    marginTop: 10,
//    fontSize: 14,
//    color: 'brown'
//  },
//  adFooter: {
//    marginTop: 5,
//    fontSize: 12,
//    color: 'brown',
//    fontStyle: 'italic'
//  },
//  thankYou: {
//    textAlign: 'center',
//    fontSize: 16,
//    color: 'brown',
//    marginVertical: 10
//  },
//  navBar: {
//    flexDirection: 'row',
//    justifyContent: 'space-around',
//    paddingVertical: 10,
//    borderTopWidth: 1,
//    borderColor: '#FFD54F',
//    backgroundColor: '#FFE082'
//  }
//});
//
//export default MainScreen;
