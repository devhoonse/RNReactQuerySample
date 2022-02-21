import React, {useState} from 'react';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';

export interface AuthFormProps {
  isRegister?: boolean;
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 8,
  },
  submit: {
    marginTop: 24,
    backgroundColor: '#2196f3',
    height: 56,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitPressed: {
    opacity: 0.75,
  },
  submitText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
function AuthForm({isRegister}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.block}
      behavior={Platform.select({ios: 'padding'})}>
      <View style={styles.block}>
        <View>
          {isRegister ? (
            <>
              <TextInput
                style={styles.input}
                placeholder={'이메일'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize={'none'}
                keyboardType={'email-address'}
              />
              <TextInput
                style={styles.input}
                placeholder={'계정명'}
                value={username}
                onChangeText={setUsername}
                autoCapitalize={'none'}
              />
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder={'이메일 또는 계정명'}
              value={identifier}
              onChangeText={setIdentifier}
              autoCapitalize={'none'}
            />
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder={'비밀번호'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable
          style={({pressed}) => [
            styles.submit,
            Platform.OS === 'ios' && pressed && styles.submitPressed,
          ]}
          android_ripple={{color: '#42a5f5'}}>
          <Text style={styles.submitText}>
            {isRegister ? '회원가입' : '로그인'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
export default AuthForm;
