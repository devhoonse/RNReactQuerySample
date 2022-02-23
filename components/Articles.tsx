import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';

import {Article} from '../api/types';
import ArticleItem from './ArticleItem';
import WriteButton from './WriteButton';

export interface ArticlesProps {
  articles: Article[];
  showWriteButton?: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage(): void;
  isRefreshing: boolean;
  refresh(): void;
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#cfd8dc',
  },
  spinner: {
    backgroundColor: 'white',
    paddingTop: 32,
    paddingBottom: 32,
  },
});
function Articles({
  articles,
  showWriteButton,
  isFetchingNextPage,
  fetchNextPage,
  refresh,
  isRefreshing,
}: ArticlesProps) {
  // TODO : renderItem 구현 예정

  return (
    <FlatList
      style={styles.list}
      data={articles}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => (
        <ArticleItem
          id={item.id}
          title={item.title}
          publishedAt={item.published_at}
          username={item.user.username}
        />
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={() => (showWriteButton ? <WriteButton /> : null)}
      ListFooterComponent={() => (
        <>
          {articles.length > 0 ? <View style={styles.separator} /> : null}
          {isFetchingNextPage && (
            <ActivityIndicator
              style={styles.spinner}
              size={'small'}
              color={'black'}
            />
          )}
        </>
      )}
      onEndReachedThreshold={0.5}
      onEndReached={fetchNextPage}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={refresh} />
      }
    />
  );
}
export default Articles;
