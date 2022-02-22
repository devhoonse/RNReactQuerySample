import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useMutation, useQueryClient} from 'react-query';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootStackNavigationProp} from './types';
import {Article} from '../api/types';
import {writeArticle} from '../api/articles';

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: 'column',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  input: {
    backgroundColor: 'white',
    fontSize: 14,
    lineHeight: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 4,
  },
  body: {
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 16,
    flex: 1,
  },
  headerRightContainer: {
    marginRight: 16,
  },
  headerRightPressed: {
    opacity: 0.75,
  },
});
function WriteScreen() {
  const navigation = useNavigation<RootStackNavigationProp>();
  const queryClient = useQueryClient();
  const {top} = useSafeAreaInsets();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const {mutate: write} = useMutation(writeArticle, {
    onSuccess: article => {
      queryClient.setQueryData<Article[]>('articles', articles =>
        (articles ?? []).concat(article),
      );
      // 아래는 api 재요청 방식
      // queryClient.invalidateQueries('articles');
      navigation.goBack();
    },
  });

  const onSubmit = useCallback(() => {
    write({title, body});
  }, [write, title, body]);

  useEffect(() => {
    navigation.setOptions({
      // headerRightContainerStyle: styles.headerRightContainer,
      headerRight: () => (
        <Pressable
          style={({pressed}) => pressed && styles.headerRightPressed}
          hitSlop={8}
          onPress={onSubmit}>
          <MaterialIcons name={'send'} color={'#2196f3'} size={24} />
        </Pressable>
      ),
    });
  }, [onSubmit, navigation]);

  return (
    <SafeAreaView style={styles.block} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.select({ios: 'padding'})}
        keyboardVerticalOffset={Platform.select({ios: top + 60})}>
        <TextInput
          style={styles.input}
          placeholder={'제목'}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.body]}
          placeholder={'내용'}
          value={body}
          onChangeText={setBody}
          textAlignVertical={'top'}
          multiline
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
export default WriteScreen;
