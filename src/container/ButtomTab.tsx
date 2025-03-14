import {StyleSheet, View} from 'react-native';
import Tabbar from '../components/tab-bar/Tabbar';

export default function ButtomTab() {
  return (
    <View style={styles.view}>
      <Tabbar />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {bottom: 0, flex: 1, position: 'absolute'},
});
