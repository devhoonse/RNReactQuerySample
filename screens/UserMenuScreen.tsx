import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {RootStackNavigationProp} from './types';
import MenuItem from '../components/MenuItem';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();

  const onLogin = () => navigation.navigate('Login');
  const onRegister = () => navigation.navigate('Register');

  return (
    <View>
      <MenuItem onPress={onLogin} name={'로그인'} />
      <MenuItem onPress={onRegister} name={'회원가입'} />
    </View>
  );
}
export default UserMenuScreen;
