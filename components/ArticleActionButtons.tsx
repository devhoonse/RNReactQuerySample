import React, {useState} from 'react';
import {StyleSheet, Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useMutation, useQueryClient, InfiniteData} from 'react-query';

import {RootStackNavigationProp} from '../screens/types';
import {Article} from '../api/types';
import {deleteArticle} from '../api/articles';
import AskDialog from './AskDialog';

export interface ArticleActionButtonsProps {
  articleId: number;
}

const styles = StyleSheet.create({
  block: {
    marginTop: -16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  separator: {
    width: 8,
  },
  buttonText: {
    color: '#2196f3',
    fontSize: 14,
  },
  pressed: {
    opacity: 0.75,
  },
});
function ArticleActionButtons({articleId}: ArticleActionButtonsProps) {
  const navigation = useNavigation<RootStackNavigationProp>();
  const queryClient = useQueryClient();
  const [askRemove, setAskRemove] = useState(false);

  const onPressModify = () => {
    navigation.navigate('Write', {articleId});
  };
  const onPressRemove = () => {
    setAskRemove(true);
  };
  const onCancelRemove = () => {
    setAskRemove(false);
  };
  const onConfirmRemove = () => {
    setAskRemove(false);
    remove(articleId);
  };

  const {mutate: remove} = useMutation(deleteArticle, {
    onSuccess: () => {
      navigation.goBack();
      queryClient.setQueryData<InfiniteData<Article[]>>('articles', data => {
        if (!data) {
          return {pageParams: [], pages: []};
        }
        return {
          pageParams: data!.pageParams,
          pages: data!.pages.map(page =>
            page.find(a => a.id === articleId)
              ? page.filter(a => a.id !== articleId)
              : page,
          ),
        };
      });
    },
  });

  return (
    <>
      <View style={styles.block}>
        <Pressable
          style={({pressed}) => pressed && styles.pressed}
          onPress={onPressModify}>
          <Text style={styles.buttonText}>수정</Text>
        </Pressable>
        <View style={styles.separator} />
        <Pressable
          style={({pressed}) => pressed && styles.pressed}
          onPress={onPressRemove}>
          <Text style={styles.buttonText}>삭제</Text>
        </Pressable>
      </View>
      <AskDialog
        isDestructive
        visible={askRemove}
        title={'게시글 삭제'}
        message={'게시글을 삭제하시겠습니까?'}
        confirmText={'삭제'}
        cancelText={'취소'}
        onClose={onCancelRemove}
        onConfirm={onConfirmRemove}
      />
    </>
  );
}
export default ArticleActionButtons;
