import {NavigationContainer} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import BottomTab from './src/container/BottomTab';

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
