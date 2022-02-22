import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {RootStackNavigationProp} from './types';
import {clearToken} from '../api/client';
import {useUserState} from '../contexts/UserContext';
import MenuItem from '../components/MenuItem';
import authStorage from '../storages/authStorage';

function UserMenuScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const [user, setUser] = useUserState();

  const onLogin = () => navigation.navigate('Login');
  const onRegister = () => navigation.navigate('Register');
  const onLogout = () => {
    setUser(null);
    clearToken();
    authStorage.clear();
  };

  return (
    <View>
      {user ? (
        <MenuItem onPress={onLogout} name={'로그아웃'} />
      ) : (
        <>
          <MenuItem onPress={onLogin} name={'로그인'} />
          <MenuItem onPress={onRegister} name={'회원가입'} />
        </>
      )}
    </View>
  );
}
export default UserMenuScreen;
