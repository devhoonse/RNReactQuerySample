import {useNavigation} from '@react-navigation/core';
import {useMutation} from 'react-query';

import {login} from '../api/auth';
import {AuthError} from '../api/types';
import {RootStackNavigationProp} from '../screens/types';
import {useUserState} from '../contexts/UserContext';
import {applyToken} from '../api/client';
import authStorage from '../storages/authStorage';
import useInform from './useInform';

export default function useLogin() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const inform = useInform();
  const [, setUser] = useUserState();

  return useMutation(login, {
    onSuccess: data => {
      setUser(data.user);
      navigation.pop();
      applyToken(data.jwt);
      authStorage.set(data);
    },
    onError: (error: AuthError) => {
      console.log(error);
      const message =
        error.response?.data?.data?.[0]?.messages?.[0].message ?? '로그인 실패';
      inform({
        title: '오류',
        message,
      });
    },
  });
}
