import { Alert } from 'react-native';

export const useRewardedAd = () => {
  return {
    tryRewardedAd: () => {
      Alert.alert("웹에서는 보상형 광고를 사용할 수 없습니다.");
    },
  };
};
//// hooks/useRewardedAd.js
//import { Alert } from 'react-native';
//import axios from 'axios';
//import { RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';
//
//export const useRewardedAd = () => {
//  const rewarded = RewardedAd.createForAdRequest('ca-app-pub-xxxxxxxxxx/your-unit-id');
//
//  //시청 가능 여부 확인 함수
//  const checkRewardAvailable = async (userId) => {
//    const res = await axios.get(`https://your-api.com/reward/available?userId=${userId}`);
//    return res.data.allowed;
//  };
//
//  const tryRewardedAd = async (userId) => {
//    const allowed = await checkRewardAvailable(userId);
//    if (!allowed) {
//      Alert.alert("오늘의 광고 시청 한도를 초과했어요!");
//      return;
//    }
//
//    rewarded.load();
//
//    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
//      rewarded.show();
//    });
//
//    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async (reward) => {
//      await axios.post('https://your-api.com/reward/claim', {
//        userId,
//        amount: reward.amount,
//      });
//      Alert.alert("코인이 지급되었습니다!");
//    });
//  };
//
//  return { tryRewardedAd };
//};