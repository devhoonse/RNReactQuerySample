import React from 'react';
import {StyleSheet, Pressable, Text, Platform} from 'react-native';

export interface MenuItemProps {
  onPress(): void;
  name: string;
}

const styles = StyleSheet.create({
  block: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  pressed: {
    backgroundColor: '#eee',
  },
});
function MenuItem({name, onPress}: MenuItemProps) {
  return (
    <Pressable
      style={({pressed}) => [
        styles.block,
        Platform.OS === 'ios' && pressed && styles.pressed,
      ]}
      android_ripple={{color: '#eee'}}
      onPress={onPress}>
      <Text>{name}</Text>
    </Pressable>
  );
}
export default MenuItem;
