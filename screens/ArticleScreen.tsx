import React from 'react';
import {StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/core';
import {useQuery} from 'react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootStackParamList} from './types';
import {getArticle} from '../api/articles';
import {getComments} from '../api/comments';
import ArticleView from '../components/ArticleView';
import CommentItem from '../components/CommentItem';

type ArticleScreenRouteProp = RouteProp<RootStackParamList, 'Article'>;

const styles = StyleSheet.create({
  block: {},
  spinner: {
    flex: 1,
  },
  flatList: {
    backgroundColor: 'white',
    flex: 1,
  },
  flatListContent: {
    paddingHorizontal: 12,
  },
});
function ArticleScreen() {
  const {bottom} = useSafeAreaInsets();
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));

  if (!articleQuery.data || !commentsQuery.data) {
    return (
      <ActivityIndicator
        style={styles.spinner}
        size={'large'}
        color={'black'}
      />
    );
  }

  const {title, body, published_at, user} = articleQuery.data;

  return (
    <FlatList
      style={styles.flatList}
      contentContainerStyle={[styles.flatListContent, {paddingBottom: bottom}]}
      data={commentsQuery.data}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <CommentItem
          id={item.id}
          message={item.message}
          username={item.user.username}
          publishedAt={item.published_at}
        />
      )}
      ListHeaderComponent={
        <ArticleView
          title={title}
          body={body}
          publishedAt={published_at}
          username={user.username}
        />
      }
    />
  );
}
export default ArticleScreen;
