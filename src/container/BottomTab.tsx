import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  useFocusEffect,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, BackHandler, Image, StyleSheet, View} from 'react-native';
import Tabbar, {TabsType} from '../components/tab-bar/Tabbar';
import {colors} from '../res/colors';
import images from '../res/images';
import sizes from '../res/sizes';
import Category from '../screens/category/Category';
import HomeScreen from '../screens/home/HomeScreen';
import Notification from '../screens/notification/Notification';
import PhoneBook from '../screens/phonebook/PhoneBook';
import Work from '../screens/work/Work';
import {useTabbarStore} from '../zustand/useTabbarStore';
const Tab = createBottomTabNavigator();
interface IconProps {
  name: string;
  tincolor?: string;
}
const iconPaths: Record<string, any> = {
  Home: images.home,
  PhoneBook: images.phonebook,
  Notification: images.notifications,
  Work: images.worker,
  Category: images.grid,
};
const Images: React.FC<IconProps> = React.memo(
  ({name, tincolor = colors.white}) => {
    return (
      <Image
        source={iconPaths[name]}
        style={[styles.img, {tintColor: tincolor}]}
        resizeMode="contain"
      />
    );
  },
);

const tabData = [
  {name: 'Home', title: 'Trang chủ'},
  {name: 'PhoneBook', title: 'Danh bạ'},
  {name: 'Notification', title: 'Thông báo'},
  {name: 'Work', title: 'Công việc'},
  {name: 'Category', title: 'Danh mục'},
].map(item => ({
  name: item.name,
  title: item.title,
  activeIcon: <Images name={item.name} tincolor={colors.white} />,
  inactiveIcon: <Images name={item.name} tincolor={colors.colortext} />,
}));

export default function BottomTab() {
  const navigation = useNavigation<any>();
  const [tabs, setTabs] = useState(tabData);
  const getCurrentRouteName = (state: any): string => {
    const route = state?.routes[state?.index];
    if (route?.state) {
      return getCurrentRouteName(route?.state);
    }

    return route?.name;
  };
  const changeBottomTab = useTabbarStore(state => state.changeBottomTab);
  const setChangeBottomTab = useTabbarStore(state => state.setChangeBottomTab);
  const currentRoute =
    useNavigationState(state => getCurrentRouteName(state)) ?? 'Home';
  const isShowBottomTab =
    tabs.some(tab => tab.name === currentRoute) ||
    ['Home', 'Phonebook'].includes(currentRoute);
  const animation = useRef(new Animated.Value(isShowBottomTab ? 1 : 0)).current;
  const tabbarOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });
  const onTabChange = useCallback(
    (item: TabsType) => {
      const index = tabs.findIndex(value => value.name === item.name);
      if ((changeBottomTab?.index ?? 0) === index) {
        return;
      }
      setChangeBottomTab(index, colors.browse);

      setTabs(
        tabs.map(tab => ({
          ...tab,
          activeIcon: <Images name={tab.name} tincolor="red" />,
        })),
      );
      navigation.navigate(item.name);
    },
    [tabs, changeBottomTab?.index, setChangeBottomTab, navigation],
  );
  useEffect(() => {
    Animated.timing(animation, {
      toValue: isShowBottomTab ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [animation, isShowBottomTab]);

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const renderTabBar = () => (
    <>
      isShowBottomTab && (
      <Animated.View style={[styles.tabbarContainer, {opacity: tabbarOpacity}]}>
        <Tabbar
          tabs={tabs}
          tabBarContainerBackground={colors.colorBottomTab}
          labelStyle={styles.label}
          onTabChange={onTabChange}
          defaultActiveTabIndex={changeBottomTab.index ?? 0}
          transitionSpeed={150}
        />
      </Animated.View>
      );
    </>
  );
  return (
    <View style={styles.view}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
        tabBar={renderTabBar}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="PhoneBook" component={PhoneBook} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Work" component={Work} />
        <Tab.Screen name="Category" component={Category} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1},
  img: {width: sizes.width * 0.04, height: sizes.width * 0.04},
  tabbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    color: '#4d4d4d',
    fontWeight: '600',
    fontSize: 11,
    position: 'absolute',
    bottom: 0,
  },
});
