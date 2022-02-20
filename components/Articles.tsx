import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import {Article} from '../api/types';
import ArticleItem from './ArticleItem';

export interface ArticlesProps {
  articles: Article[];
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
});
function Articles({articles}: ArticlesProps) {
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
      ListFooterComponent={() =>
        articles.length > 0 ? <View style={styles.separator} /> : null
      }
    />
  );
}
export default Articles;
