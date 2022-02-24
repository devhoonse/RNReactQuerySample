import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Modal,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface CommentFormProps {
  visible: boolean;
  onClose(): void;
  onSubmit(message: string): void;
  initialMessage?: string;
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    flex: 1,
  },
  dismissArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  whiteBox: {
    backgroundColor: 'white',
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  input: {
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
    fontSize: 12,
    borderColor: '#ababab',
    borderWidth: 1,
    borderRadius: 4,
  },
});
function CommentModal({
  visible,
  onClose,
  onSubmit,
  initialMessage,
}: CommentFormProps) {
  const {bottom} = useSafeAreaInsets();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(initialMessage ?? '');
  }, [initialMessage]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType={'fade'}
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        keyboardVerticalOffset={Platform.select({ios: -bottom})}
        behavior={Platform.select({ios: 'padding'})}>
        <View style={styles.block}>
          <Pressable style={styles.dismissArea} onTouchStart={onClose} />
          <View style={[styles.whiteBox, {paddingBottom: 24 + bottom}]}>
            <TextInput
              style={styles.input}
              autoFocus
              returnKeyType={'send'}
              value={message}
              placeholder={'댓글을 입력하세요'}
              onChangeText={setMessage}
              onSubmitEditing={() => {
                onSubmit(message);
                setMessage('');
              }}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
export default CommentModal;
