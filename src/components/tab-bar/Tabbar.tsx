import * as shape from 'd3-shape';
import React, {useMemo} from 'react';
import {Animated, StyleSheet, Text, TextStyle, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

import sizes from '../../res/sizes';
import {useTabbarStore} from '../../zustand/useTabbarStore';
import StaticTabbar from './StaticTabbar';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const height = sizes.height * 0.08;
const tabWidth = sizes.width / 5;
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
    [sizes.width + 8, 0],
    [sizes.width + 10, 18],
    [sizes.width + 25, height - 19],
    [sizes.width + tabWidth - 25, height - 19],
    [sizes.width + tabWidth - 10, 18],
    [sizes.width + tabWidth - 8, 0],
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

export interface TabsType {
  name: string;
  title?: string;
  activeIcon: React.ReactElement;
  inactiveIcon: React.ReactElement;
}

interface Props {
  tabs: Array<TabsType>;
  tabBarContainerBackground?: string;
  containerWidth?: number;
  activeTabBackground?: string;
  labelStyle?: TextStyle;
  onTabChange?: (tab: TabsType) => void;
  defaultActiveTabIndex?: number;
  transitionSpeed?: number;
}

const Tabbar: React.FC<Props> = ({
  tabs,
  tabBarContainerBackground,
  containerWidth,
  activeTabBackground,
  labelStyle,
  onTabChange,
  defaultActiveTabIndex,
  transitionSpeed,
}) => {
  const {translateX} = useTabbarStore();
  const d = useMemo(() => getPath(), []);
  let CustomWidth = containerWidth ? containerWidth : sizes.width;
  const interpolatedTranslateX = translateX.interpolate({
    inputRange: [0, CustomWidth],
    outputRange: [-CustomWidth, 0],
  });

  if (tabs.length > 0) {
    return (
      <>
        <AnimatedSvg
          width={sizes.width * 2}
          height={height}
          style={[
            styles.tabbarStyle,
            {transform: [{translateX: interpolatedTranslateX}]},
          ]}>
          <Path fill={tabBarContainerBackground} d={d} />
        </AnimatedSvg>

        <View style={styles.view}>
          <StaticTabbar
            tabs={tabs}
            value={translateX}
            onTabChange={onTabChange}
            activeTabBackground={activeTabBackground}
            labelStyle={labelStyle}
            defaultActiveTabIndex={defaultActiveTabIndex}
            transitionSpeed={transitionSpeed}
          />
        </View>
      </>
    );
  } else {
    return (
      <View style={styles.emptyContainer}>
        <Text>Please add tab data</Text>
      </View>
    );
  }
};
export default Tabbar;
const styles = StyleSheet.create({
  container: {
    width: sizes.width,
  },
  emptyContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  tabbarStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 9,
  },
  view: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: height,
  },
});
