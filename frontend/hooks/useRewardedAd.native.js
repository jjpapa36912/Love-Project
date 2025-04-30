import { Alert } from 'react-native';
import axios from 'axios';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

export const useRewardedAd = () => {
  const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxx/yyyy';
  const rewarded = RewardedAd.createForAdRequest(adUnitId);

  const checkRewardAvailable = async (userId) => {
    const res = await axios.get(`https://your-api.com/reward/available?userId=${userId}`);
    return res.data.allowed;
  };

  const tryRewardedAd = async (userId) => {
    const allowed = await checkRewardAvailable(userId);
    if (!allowed) {
      Alert.alert("오늘의 광고 시청 한도를 초과했어요!");
      return;
    }

    rewarded.load();

    rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewarded.show();
    });

    rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, async (reward) => {
      await axios.post('https://your-api.com/reward/claim', {
        userId,
        amount: reward.amount,
      });
      Alert.alert("코인이 지급되었습니다!");
    });
  };

  return { tryRewardedAd };
};
