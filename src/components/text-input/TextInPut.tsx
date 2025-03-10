import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import sizes from '../../res/sizes';
import {PropsTextInput} from '../../types/text-input-types';

export default function TextInPut(props: PropsTextInput) {
  return (
    <View style={styles.view}>
      <Text style={styles.txt}>{props.nameInput}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.txtinput}
        value={props.value}
        onChangeText={props.onChangeValue}
        cursorColor={colors.colortext}
        secureTextEntry={props?.secureTextEntry}
        selectionHandleColor={colors.colortext}
        autoComplete="birthdate-month"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 20,
  },
  txtinput: {
    height: sizes.height * 0.06,
    width: sizes.width * 0.85,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.browse,
    color: colors.colortext,
    paddingHorizontal: 10,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
    marginTop: 10,
  },
  txt: {
    color: colors.colortext,
    fontFamily: fonts.regular,
    fontSize: sizes.width * 0.04,
  },
});
