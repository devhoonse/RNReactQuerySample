import React, {useMemo} from 'react';
import {useInfiniteQuery} from 'react-query';
import {StyleSheet, ActivityIndicator} from 'react-native';

import {Article} from '../api/types';
import {getArticles} from '../api/articles';
import {useUserState} from '../contexts/UserContext';
import Articles from '../components/Articles';

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
  },
});
function ArticlesScreen() {
  const [user] = useUserState();
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    isFetchingPreviousPage,
  } = useInfiniteQuery(
    'articles',
    ({pageParam}) => getArticles({...pageParam}),
    {
      getNextPageParam: lastPage =>
        lastPage.length === 10
          ? {cursor: lastPage[lastPage.length - 1].id}
          : undefined,
      getPreviousPageParam: (_, allPages) => {
        const validPage = allPages.find(page => page.length > 0);
        if (!validPage) {
          return undefined;
        }
        return {
          prevCursor: validPage[0].id,
        };
      },
    },
  );
  // const {data} = useQuery('articles', getArticles);

  const items = useMemo(() => {
    if (!data) {
      return null;
    }
    return ([] as Article[]).concat(...data.pages);
  }, [data]);

  if (!items) {
    return <ActivityIndicator size={'large'} style={styles.spinner} />;
  }
  return (
    <Articles
      articles={items}
      showWriteButton={!!user}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
      refresh={fetchPreviousPage}
      isRefreshing={isFetchingPreviousPage}
    />
  );
}
export default ArticlesScreen;
