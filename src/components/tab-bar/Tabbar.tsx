import * as shape from 'd3-shape';
import React, {useMemo, useRef} from 'react';
import {Animated, SafeAreaView, StyleSheet, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import images from '../../res/images';
import sizes from '../../res/sizes';
import StaticTabbar from './StaticTabbar';
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const height = sizes.height * 0.08;
const tabs = [
  {name: 'Trang chủ', nameicon: images.home},
  {name: 'Danh bạ', nameicon: images.phonebook},
  {name: 'Danh mục', nameicon: images.grid},
  {name: 'Công việc', nameicon: images.worker},
  {name: 'Thông báo', nameicon: images.notifications},
];
const tabWidth = sizes.width / tabs.length;
const backgroundColor = '#C7C7C7';
const getPath = (): string => {
  const left = shape
    .line<[number, number]>()
    .x(d => d[0])
    .y(d => d[1])([
    [0, 0],
    [sizes.width, 0],
  ]);

  const tab = shape
    .line<[number, number]>()
    .x(d => d[0])
    .y(d => d[1])
    .curve(shape.curveBasis)([
    [sizes.width, 0],
    [sizes.width + 10, 0],
    [sizes.width + 20, 15],
    [sizes.width + 30, height / 2.5],
    [sizes.width + tabWidth - 30, height / 2.5], // Đỉnh cong khác
    [sizes.width + tabWidth - 20, 15],
    [sizes.width + tabWidth - 10, 0],
    [sizes.width + tabWidth, 0],
  ]);

  const right = shape
    .line<[number, number]>()
    .x(d => d[0])
    .y(d => d[1])([
    [sizes.width + tabWidth, 0],
    [sizes.width * 2, 0],
    [sizes.width * 2, height],
    [0, height],
    [0, 0],
  ]);

  return `${left} ${tab} ${right}`;
};

export default function Tabbar() {
  const value = useRef(new Animated.Value(0)).current;
  const d = useMemo(() => getPath(), []);
  const translateX = value.interpolate({
    inputRange: [0, sizes.width],
    outputRange: [-sizes.width, 0],
  });
  return (
    <>
      <View style={{height, width: sizes.width}}>
        <AnimatedSvg
          width={sizes.width * 2}
          height={height}
          style={{transform: [{translateX}]}}>
          <Path fill={backgroundColor} d={d} />
        </AnimatedSvg>
        <View style={StyleSheet.absoluteFill}>
          <StaticTabbar tabs={tabs} value={value} />
        </View>
      </View>
      <SafeAreaView style={styles.container} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});
