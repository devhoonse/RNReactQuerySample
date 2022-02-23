import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {useMutation, useQueryClient, InfiniteData} from 'react-query';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {RootStackNavigationProp, RootStackParamList} from './types';
import {Article} from '../api/types';
import {writeArticle, modifyArticle} from '../api/articles';

type WriteScreenRouteProp = RouteProp<RootStackParamList, 'Write'>;

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
  const {params} = useRoute<WriteScreenRouteProp>();
  const queryClient = useQueryClient();
  const {top} = useSafeAreaInsets();

  const cachedArticle = useMemo(
    () =>
      params.articleId
        ? queryClient.getQueryData<Article>(['article', params.articleId])
        : null,
    [queryClient, params.articleId],
  );

  const [title, setTitle] = useState(cachedArticle?.title ?? '');
  const [body, setBody] = useState(cachedArticle?.body ?? '');
  const {mutate: write} = useMutation(writeArticle, {
    onSuccess: article => {
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        if (!data) {
          return {
            pageParams: [undefined],
            pages: [[article]],
          };
        }
        const [firstPage, ...rest] = data.pages;
        return {
          ...data,
          pages: [[article, ...firstPage], ...rest],
        };
        // (articles ?? []).concat(article),
      });
      // 아래는 api 재요청 방식
      // queryClient.invalidateQueries('articles');
      navigation.goBack();
    },
  });
  const {mutate: modify} = useMutation(modifyArticle, {
    onSuccess: article => {
      queryClient.setQueryData<InfiniteData<Article[]>>('article', data => {
        if (!data) {
          return {pageParams: [], pages: []};
        }
        return {
          pageParams: data!.pageParams,
          pages: data!.pages.map(page =>
            page.find(a => a.id === params.articleId)
              ? page.map(a => (a.id === params.articleId ? article : a))
              : page,
          ),
        };
      });
      queryClient.setQueryData(['article', params.articleId], article);
      navigation.goBack();
    },
  });

  const onSubmit = useCallback(() => {
    if (params.articleId) {
      modify({id: params.articleId, title, body});
    } else {
      write({title, body});
    }
  }, [write, modify, title, body, params.articleId]);

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
