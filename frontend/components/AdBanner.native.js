import React from 'react';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxx/yyyy';

const AdBanner = () => {
  return <BannerAd unitId={adUnitId} size={BannerAdSize.ADAPTIVE_BANNER} />;
};

export default AdBanner;
