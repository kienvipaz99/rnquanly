import React, {useCallback, useEffect, useRef} from 'react';
import {
  Animated,
  Dimensions,
  I18nManager,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import sizes from '../../res/sizes';
import {useTabbarStore} from '../../zustand/useTabbarStore';
import {TabsType} from './TabBar';
let {width} = Dimensions.get('window');
var prevIndex = -1;

interface Props {
  value: Animated.AnimatedValue;
  tabs: Array<TabsType>;
  onTabChange?: (tab: TabsType) => void;
  labelStyle?: TextStyle;
  activeTabBackground?: string;
  Hvalue?: number;
  containerWidth?: number;
  defaultActiveTabIndex?: number;
  transitionSpeed?: number;
}

const StaticTabbar: React.FC<Props> = ({
  value,
  tabs,
  onTabChange,
  labelStyle,
  activeTabBackground,
  containerWidth,
  defaultActiveTabIndex,
  transitionSpeed,
}) => {
  const transitionDuration = transitionSpeed || 0;
  const activeTabIndex = defaultActiveTabIndex
    ? defaultActiveTabIndex > tabs.length
      ? 0
      : defaultActiveTabIndex
    : 0;

  const values = useRef(
    tabs.map(
      (tab, index) => new Animated.Value(index === activeTabIndex ? 1 : 0),
    ),
  ).current;

  const bounceValues = useRef(tabs.map(() => new Animated.Value(0))).current;

  const changeBottomTab = useTabbarStore(state => state.changeBottomTab);

  const range = (start: number, end: number) => {
    var len = end - start;
    var a = new Array(len);
    for (let i = 0; i < len; i++) {
      a[i] = start + i;
    }
    return a;
  };

  let customWidth = containerWidth ? containerWidth : width;

  const onPress = useCallback(
    (index: number, noAnimation: boolean = false) => {
      if (prevIndex !== index) {
        const tabWidth = customWidth / tabs.length;
        let rangeNumber = range(0, tabs.length).reverse();

        bounceValues.forEach((bv, idx) => {
          if (idx !== index) {
            bv.setValue(0);
          }
        });

        Animated.sequence([
          Animated.parallel(
            values.map((v: Animated.AnimatedValue | Animated.AnimatedValueXY) =>
              Animated.timing(v, {
                toValue: 0,
                useNativeDriver: true,
                duration: noAnimation ? 0 : 50,
              }),
            ),
          ),
          Animated.timing(value, {
            toValue: I18nManager.isRTL
              ? customWidth + tabWidth * rangeNumber[index]
              : tabWidth * index,
            useNativeDriver: true,
            duration: noAnimation ? 0 : transitionDuration,
          }),
          Animated.timing(values[index], {
            toValue: 1,
            useNativeDriver: true,
            duration: 0,
          }),
          Animated.loop(
            Animated.sequence([
              Animated.timing(bounceValues[index], {
                toValue: 1,
                useNativeDriver: true,
                duration: 150,
              }),
              Animated.timing(bounceValues[index], {
                toValue: 0,
                useNativeDriver: true,
                duration: 150,
              }),
            ]),
            {iterations: 1},
          ),
        ]).start();
        prevIndex = index;
      }
    },
    [customWidth, tabs.length, bounceValues, values, value, transitionDuration],
  );

  useEffect(() => {
    if (changeBottomTab) {
      onPress(changeBottomTab?.index, false);
    }
  }, [changeBottomTab, onPress]);

  useEffect(() => {
    if (changeBottomTab) {
      onPress(changeBottomTab?.index, false);
    }
  }, [changeBottomTab, onPress]);

  let mergeLabelStyle = {...styles.labelStyle, ...labelStyle};
  let newActiveIcon = [
    styles.activeIcon,
    {backgroundColor: activeTabBackground ? activeTabBackground : '#fff'},
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, key) => {
        const tabWidth = sizes.width / tabs.length;
        const cursor = tabWidth * key;
        const opacity = value.interpolate({
          inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });
        const translateY = values[key].interpolate({
          inputRange: [0, 1],
          outputRange: [64, 0],
          extrapolate: 'clamp',
        });
        const opacity1 = values[key].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        console.log(tabs);

        return (
          <React.Fragment key={key}>
            <TouchableWithoutFeedback
              onPress={() => {
                onPress(key);
                onTabChange && onTabChange(tab);
              }}>
              <Animated.View style={[styles.tab, {opacity: opacity}]}>
                {tab.inactiveIcon ? (
                  tab.inactiveIcon
                ) : (
                  <Text>⚠️ Missing Icon</Text>
                )}
                <Text style={mergeLabelStyle}>{'123'} </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View
              style={[
                {
                  transform: [{translateY}],
                  opacity: opacity1,
                  left: tabWidth * key,
                  width: tabWidth,
                },
                styles.view1,
              ]}>
              <LinearGradient
                style={[newActiveIcon, styles.view]}
                colors={['#FF030A', '#AC125B']}>
                {tab.activeIcon}
              </LinearGradient>
            </Animated.View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    height: sizes.height * 0.08,
    flex: 1,
  },
  view1: {
    position: 'absolute',
    top: sizes.height * 0.01,

    height: sizes.height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    width: sizes.width * 0.13,
    height: sizes.width * 0.13,
    borderRadius: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 11,
    fontWeight: '600',
    // marginTop: 3,
    color: '#000',
  },
  view: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 0,
    zIndex: 1,
  },
});

export default StaticTabbar;
