import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from '../../RootNavigation';
import HomeScreen from '../screens/home/HomeScreen';
import Login from '../screens/login/Login';
import ButtomTab from './ButtomTab';
const Container = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={'ButtomTab'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ButtomTab" component={ButtomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Container;
