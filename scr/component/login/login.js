import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';

import Input from '../input';
import MyButton from '../button';

import { theme } from '../../theme';

const LoginView  = (props) => {
  const { history, onSend, match } = props;
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');

  useEffect(() => {
    if (match) {
      if ('email' in match.params) {
        const emailss = match.params.email;
        if (email === '')
          setEmail(emailss);
      }
    }
  }, [match]);

  return (
    <View style={styles.container}>
      <Text style={styles.textCC}>Portal</Text>
      <Input autoCapitalize="none" placeholder="E-Mail" value={email} onChangeText={setEmail} />
      <Input secureTextEntry autoCapitalize="none" value={password} placeholder="Senha" onChangeText={setPass} />
      <MyButton
        title="Entrar"
        onPress={() => {
          onSend({
            password,
            email,
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container50: {
    width: '50%',
  },
  textCC: {
    color: '#fff',
    margin: 30,
    fontSize: 30,
    fontFamily: 'GlacialIndifference-Regular',
  }
});

export default LoginView;
