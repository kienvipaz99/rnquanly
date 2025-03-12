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
        <Image source={images.Vector} style={styles.img1} />
        <Image source={images.vts} style={styles.img} />
        <Image source={images.Vector1} style={styles.img2} />
        <Image source={images.Vector1} style={styles.img3} />
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
    flex: 1,
  },

  img: {
    height: (sizes.width * 0.36) / 4,
    width: sizes.width * 0.36,
    position: 'absolute',
    alignSelf: 'center',
    marginTop: (sizes.height * 0.15) / 2 - (sizes.height * 0.052) / 2,
  },
  img1: {
    height: sizes.width * 0.2,
    width: sizes.width * 0.2,
    bottom: 3,
  },
  img2: {
    height: sizes.width * 0.2,
    width: sizes.width * 0.2,
    right: 10,
    position: 'absolute',
    top: 30,
  },
  img3: {
    height: sizes.width * 0.2,
    width: sizes.width * 0.2,
    right: 0 - (sizes.width * 0.1) / 2,
    position: 'absolute',
    top: -25,
  },
});
