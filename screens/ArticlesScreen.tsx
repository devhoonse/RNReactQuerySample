import React from 'react';
import {useQuery} from 'react-query';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {getArticles} from '../api/articles';
import {useUserState} from '../contexts/UserContext';
import Articles from '../components/Articles';

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});
function ArticlesScreen() {
  const {data} = useQuery('articles', getArticles);
  const [user] = useUserState();

  if (!data) {
    return <ActivityIndicator size={'large'} style={styles.spinner} />;
  }
  return <Articles articles={data} showWriteButton={!!user} />;
}
export default ArticlesScreen;
