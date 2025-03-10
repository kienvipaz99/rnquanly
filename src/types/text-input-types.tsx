import {TextInputProps} from 'react-native';
export interface PropsTextInput extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeValue: (value: string) => void;
  nameInput: string;
  secureTextEntry?: boolean;
}
