import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header';
import TextInPut from '../../components/text-input/TextInPut';
import {colors} from '../../res/colors';
import {fonts} from '../../res/fonts';
import sizes from '../../res/sizes';
import {StyleApp} from '../../res/styles';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  return (
    <View style={styles.container}>
      <Header />
      <View style={StyleApp.container}>
        <View style={styles.content}>
          <Text style={styles.txtLogin}>Đăng nhập</Text>
          <TextInPut
            nameInput="Mã nhân viên/Email"
            placeholder="Mã nhân viên/Email"
            value={userName}
            autoComplete="username"
            onChangeValue={setUserName}
          />
          <TextInPut
            nameInput="Mật khẩu"
            placeholder="Mật khẩu"
            value={passWord}
            onChangeValue={setPassWord}
            autoComplete="password"
            secureTextEntry
          />
          <View style={StyleApp.viewfogotlogin}>
            <Text>Quên mật khẩu</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  txtLogin: {
    marginTop: sizes.height * 0.1,
    fontFamily: fonts.regular,
    fontSize: sizes.height * 0.03,
    color: colors.colortext,
    marginBottom: 20,
  },
  content: {
    flex: 1,
    width: sizes.width * 0.85,
    alignSelf: 'center',
  },
});
