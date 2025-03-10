import {Dimensions, Platform} from 'react-native';

const sizes = new (class {
  IS_NEW_WAY = true;
  width =
    Dimensions.get('window').width < Dimensions.get('window').height
      ? Dimensions.get('window').width
      : Dimensions.get('window').height;
  os = Platform.OS;
  height = Dimensions.get('window').height;
})();

export default sizes;
