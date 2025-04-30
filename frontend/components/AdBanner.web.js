import React from 'react';
import { View, Text } from 'react-native';

const AdBanner = () => {
  return (
    <View style={{ padding: 20, alignItems: 'center' }}>
      <Text style={{ color: 'gray' }}>웹에서는 광고가 표시되지 않습니다.</Text>
    </View>
  );
};

export default AdBanner;
//// components/AdBanner.js
//import React from 'react';
//import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
//
//const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy';
//
//const AdBanner = () => {
//  return <BannerAd unitId={adUnitId} size={BannerAdSize.ADAPTIVE_BANNER} />;
//};
//
//export default AdBanner;