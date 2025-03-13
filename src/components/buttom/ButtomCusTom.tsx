import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import sizes from '../../res/sizes';
import {PropsButomCustom} from '../../types/type-buttom-custom';

export default function ButtomCusTom(props: PropsButomCustom) {
  return (
    <TouchableOpacity style={styles.btn} {...props}>
      <Text style={styles.txt}>{props.txtButton}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  txt: {
    fontFamily: fonts.regular,
    color: colors.white,
    fontSize: sizes.width * 0.04,
  },
  btn: {
    height: sizes.height * 0.06,
    width: sizes.width * 0.85,
    borderRadius: 30,
    backgroundColor: colors.colorBtnDis,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
