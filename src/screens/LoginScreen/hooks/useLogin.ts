import { useState, useCallback } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { authService } from '../services/authService';

type LoginNav = StackNavigationProp<RootStackParamList, 'Login'>;

export const useLogin = (navigation: LoginNav) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const validate = useCallback(() => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Preencha e-mail e senha.');
      return false;
    }

    const okEmail = /\S+@\S+\.\S+/.test(email);
    if (!okEmail) {
      setErrorMessage('Informe um e-mail válido.');
      return false;
    }
    return true;
  }, [email, password]);

  const handleLogin = useCallback(async () => {
    if (!validate()) return;
    setSubmitting(true);
    const res = await authService.signIn(email.trim(), password);
    setSubmitting(false);

    if (res.ok) {
      setErrorMessage('');
      navigation.replace('Home');
    } else {
      setErrorMessage(res.error || 'Erro ao efetuar login.');
    }
  }, [email, password, navigation, validate]);

  const goSignup = useCallback(() => navigation.navigate('Signup'), [navigation]);

  return {
    email, setEmail,
    password, setPassword,
    errorMessage,
    submitting,
    handleLogin,
    goSignup,
  };
};
