import React, {useState} from 'react';
import {StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/core';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {RootStackParamList} from './types';
import {Comment} from '../api/types';
import {getArticle} from '../api/articles';
import {deleteComment, getComments, modifyComment} from '../api/comments';
import {useUserState} from '../contexts/UserContext';
import ArticleView from '../components/ArticleView';
import CommentItem from '../components/CommentItem';
import CommentInput from '../components/CommentInput';
import CommentModal from '../components/CommentModal';
import AskDialog from '../components/AskDialog';

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
  const [currentUser] = useUserState();
  const queryClient = useQueryClient();
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null,
  );
  const [askRemoveComment, setAskRemoveComment] = useState(false);
  const [modifying, setModifying] = useState(false);
  const {params} = useRoute<ArticleScreenRouteProp>();
  const {id} = params;

  const {mutate: remove} = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments ? comments.filter(c => c.id !== selectedCommentId) : [],
      );
    },
  });
  const {mutate: modify} = useMutation(modifyComment, {
    onSuccess: comment => {
      queryClient.setQueryData<Comment[]>(['comments', id], comments =>
        comments
          ? comments.map(c => (c.id === selectedCommentId ? comment : c))
          : [],
      );
    },
  });

  const articleQuery = useQuery(['article', id], () => getArticle(id));
  const commentsQuery = useQuery(['comments', id], () => getComments(id));
  const selectedComment = commentsQuery.data?.find(
    comment => comment.id === selectedCommentId,
  );

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
  const isMyArticle = currentUser?.id === user.id;

  const onRemove = (commentId: number) => {
    setSelectedCommentId(commentId);
    setAskRemoveComment(true);
  };
  const onCancelRemove = () => {
    setAskRemoveComment(false);
  };
  const onConfirmRemove = () => {
    setAskRemoveComment(false);
    remove({
      articleId: id,
      id: selectedCommentId!,
    });
  };
  const onModify = (commentId: number) => {
    setSelectedCommentId(commentId);
    setModifying(true);
  };
  const onCancelModify = () => {
    setModifying(false);
  };
  const onSubmitModify = (message: string) => {
    setModifying(false);
    modify({
      id: selectedCommentId!,
      articleId: id,
      message,
    });
  };

  return (
    <>
      <FlatList
        style={styles.flatList}
        contentContainerStyle={[
          styles.flatListContent,
          {paddingBottom: bottom},
        ]}
        data={commentsQuery.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CommentItem
            id={item.id}
            message={item.message}
            username={item.user.username}
            publishedAt={item.published_at}
            isMyComment={item.user.id === currentUser?.id}
            onRemove={onRemove}
            onModify={onModify}
          />
        )}
        ListHeaderComponent={
          <>
            <ArticleView
              title={title}
              body={body}
              publishedAt={published_at}
              username={user.username}
              id={id}
              isMyArticle={isMyArticle}
            />
            <CommentInput articleId={id} />
          </>
        }
      />
      <AskDialog
        isDestructive
        visible={askRemoveComment}
        title={'댓글 삭제'}
        message={'댓글을 삭제하시겠습니까?'}
        confirmText={'삭제'}
        cancelText={'아뇨'}
        onClose={onCancelRemove}
        onConfirm={onConfirmRemove}
      />
      <CommentModal
        visible={modifying}
        initialMessage={selectedComment?.message}
        onClose={onCancelModify}
        onSubmit={onSubmitModify}
      />
    </>
  );
}
export default ArticleScreen;
