import React from 'react';
import {useQuery} from 'react-query';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {getArticles} from '../api/articles';
import Articles from '../components/Articles';

const styles = StyleSheet.create({
  spinner: {},
});
function ArticlesScreen() {
  const {data} = useQuery('articles', getArticles);

  if (!data) {
    return <ActivityIndicator size={'large'} style={styles.spinner} />;
  }
  return <Articles articles={data} />;
}
export default ArticlesScreen;
