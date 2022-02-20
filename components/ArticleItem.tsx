import React from 'react';
import {StyleSheet, Pressable, Text, View, Platform} from 'react-native';

export interface ArticleItemProps {
  id: number;
  title: string;
  publishedAt: string;
  username: string;
}

const styles = StyleSheet.create({
  block: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'white',
  },
  pressed: {
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 16,
  },
  smallText: {
    fontSize: 10,
    color: '#546e7a',
  },
});
function ArticleItem({id, title, publishedAt, username}: ArticleItemProps) {
  const onPress = () => {
    // TODO : 눌렀을 때 게시글 열기
  };

  const formattedDate = new Date(publishedAt).toLocaleString();

  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && styles.pressed,
      ]}
      android_ripple={{
        color: '#eee',
      }}
      onPress={onPress}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.footer}>
        <Text style={styles.smallText}>{username}</Text>
        <Text style={styles.smallText}>{formattedDate}</Text>
      </View>
    </Pressable>
  );
}
export default ArticleItem;
