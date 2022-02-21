import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export interface ArticleViewProps {
  title: string;
  body: string;
  publishedAt: string;
  username: string;
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 24,
    paddingBottom: 64,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  username: {
    fontSize: 12,
    marginTop: 16,
    fontWeight: 'bold',
  },
  date: {
    marginTop: 4,
    fontSize: 12,
    color: '#546e7a',
  },
  separator: {
    marginTop: 24,
    marginBottom: 24,
    height: 1,
    backgroundColor: '#eee',
  },
});
function ArticleView({title, body, publishedAt, username}: ArticleViewProps) {
  const formattedDate = new Date(publishedAt).toLocaleString();

  return (
    <View style={styles.block}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
      <View style={styles.separator} />
      <Text>{body}</Text>
    </View>
  );
}
export default ArticleView;
