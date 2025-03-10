import React from 'react';
import {Image, ImageBackground, StatusBar, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import images from '../res/images';
import sizes from '../res/sizes';

const Header = () => {
  return (
    <ImageBackground style={styles.view} source={images.header}>
      <StatusBar backgroundColor="transparent" barStyle={'light-content'} />
      <SafeAreaView>
        <Image source={images.vts} style={styles.img} />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default Header;

const styles = StyleSheet.create({
  view: {
    height: sizes.height * 0.15,
    width: sizes.width,
    position: 'absolute',
    alignItems: 'center',
    flex: 1,
  },
  img: {
    height: sizes.height * 0.052,
    width: sizes.width * 0.36,
  },
});
