import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Thư viện icon (có thể thay bằng thư viện khác)

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View style={styles.view}>
      <Text>Trang chủ</Text>
    </View>
  );
}

function CalendarScreen() {
  return (
    <View style={styles.view}>
      <Text>Lịch</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={styles.view}>
      <Text>Hồ sơ</Text>
    </View>
  );
}

function NotificationScreen() {
  return (
    <View style={styles.view}>
      <Text>Thông báo</Text>
    </View>
  );
}

function MenuScreen() {
  return (
    <View style={styles.view}>
      <Text>Menu</Text>
    </View>
  );
}
const getTabBarIcon = (
  routeName: string,
  focused: boolean,
  color: string,
  size: number,
) => {
  let iconName = 'home-outline'; // Giá trị mặc định

  if (routeName === 'Trang chủ') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (routeName === 'Lịch') {
    iconName = focused ? 'calendar' : 'calendar-outline';
  } else if (routeName === 'Hồ sơ') {
    iconName = focused ? 'person' : 'person-outline';
  } else if (routeName === 'Thông báo') {
    iconName = focused ? 'notifications' : 'notifications-outline';
  } else if (routeName === 'Menu') {
    iconName = focused ? 'menu' : 'menu-outline';
  }

  return <Ionicons name={iconName} size={size} color={color} />;
};
export default function ButtomTab() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#e0e0e0',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Lịch" component={CalendarScreen} />
      <Tab.Screen name="Hồ sơ" component={ProfileScreen} />
      <Tab.Screen name="Thông báo" component={NotificationScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
}
const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
