import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export interface CommentItemProps {
  id: number;
  message: string;
  username: string;
  publishedAt: string;
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: '#546e7a',
    fontSize: 10,
    marginTop: 4,
  },
  message: {
    marginTop: 4,
  },
});
function CommentItem({message, username, publishedAt}: CommentItemProps) {
  const formattedDate = new Date(publishedAt).toDateString();

  return (
    <View style={styles.block}>
      <View style={styles.head}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}
export default CommentItem;
