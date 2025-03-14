import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../res/colors';
import sizes from '../../res/sizes';
interface Tab {
  name: string;
  nameicon: ImageSourcePropType;
}

interface StaticTabbarProps {
  tabs: Tab[];
  value: Animated.Value;
}
export default function StaticTabbar({tabs, value}: StaticTabbarProps) {
  const values = useRef(
    tabs.map((_, index) => new Animated.Value(index === 0 ? 1 : 0)),
  ).current;
  const onPress = useCallback(
    (index: number) => {
      const tabWidth = sizes.width / tabs.length;
      Animated.sequence([
        Animated.parallel(
          values.map(v =>
            Animated.timing(v, {
              toValue: 0,
              duration: 100,
              useNativeDriver: true,
            }),
          ),
        ),
        Animated.parallel([
          Animated.spring(value, {
            toValue: tabWidth * index,
            useNativeDriver: true,
          }),
          Animated.spring(values[index], {
            toValue: 1,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    },
    [tabs.length, value, values],
  );
  const [selectTab, setSelectTab] = useState('Trang chủ');
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

        return (
          <React.Fragment key={key}>
            <TouchableWithoutFeedback
              onPress={() => {
                onPress(key);
                setSelectTab(tab.name);
              }}>
              <Animated.View style={[styles.tab, {opacity}]}>
                <Image source={tab.nameicon} style={styles.img} />
              </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                position: 'absolute',
                top: -sizes.height * 0.06,
                left: tabWidth * key,
                width: tabWidth,
                height: sizes.height * 0.1,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: opacity1,
                transform: [{translateY}],
              }}>
              <LinearGradient
                style={styles.activeIcon}
                colors={['#FF030A', '#AC125B']}>
                <Image
                  source={tab.nameicon}
                  tintColor={
                    selectTab === tab.name ? colors.white : colors.colortext
                  }
                  style={styles.img}
                />
              </LinearGradient>
            </Animated.View>
          </React.Fragment>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
  },
  bnt: {
    height: sizes.height * 0.08,
    width: sizes.width / 5,
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: sizes.height * 0.08,
  },
  activeIcon: {
    backgroundColor: 'red',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: sizes.width * 0.04,
    height: sizes.width * 0.04,
  },
});
