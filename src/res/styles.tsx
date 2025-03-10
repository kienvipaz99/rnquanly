import {StyleSheet} from 'react-native';
import {colors} from './colors';
import sizes from './sizes';

export const StyleApp = StyleSheet.create({
  view: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    marginTop: sizes.height * 0.12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  viewfogotlogin: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
