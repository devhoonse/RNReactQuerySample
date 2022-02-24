import React, {useState} from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';

import {writeComment} from '../api/comments';
import CommentModal from './CommentModal';
import {Comment} from '../api/types';

export interface CommentInputProps {
  articleId: number;
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#cdcdcd',
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 16,
  },
  text: {
    fontSize: 12,
    color: '#898989',
  },
});
function CommentInput({articleId}: CommentInputProps) {
  const queryClient = useQueryClient();
  const {mutate} = useMutation(writeComment, {
    onSuccess: comment => {
      queryClient.setQueryData<Comment[]>(['comments', articleId], comments =>
        (comments || []).concat(comment),
      );
    },
  });
  const [writingComment, setWritingComment] = useState(false);

  const onPress = () => {
    setWritingComment(true);
  };
  const onClose = () => {
    setWritingComment(false);
  };
  const onSubmit = (message: string) => {
    setWritingComment(false);
    mutate({
      articleId,
      message,
    });
  };

  return (
    <>
      <Pressable style={styles.block} onPress={onPress}>
        <Text style={styles.text}>댓글을 입력하세요</Text>
      </Pressable>
      <CommentModal
        visible={writingComment}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </>
  );
}
export default CommentInput;
