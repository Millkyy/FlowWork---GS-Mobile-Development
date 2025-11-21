import { useCallback, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/AppNavigator';
import { authService } from '../../LoginScreen/services/authService';
import { profileService } from '../../ProfileScreen/services/profileService';

type Nav = StackNavigationProp<RootStackParamList, 'Signup'>;

export const useSignup = (navigation: Nav) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = useCallback(() => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Preencha todos os campos');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage('Informe um e-mail válido.');
      return false;
    }
    if (password.length < 4) {
      setErrorMessage('A senha deve ter pelo menos 4 caracteres.');
      return false;
    }
    return true;
  }, [name, email, password]);

  const handleSignup = useCallback(async () => {
    setErrorMessage('');
    if (!validate()) return;

    setSubmitting(true);
    try {
      await authService.register({ email, password });
      await profileService.save({ name: name.trim(), email: email.trim() });

      navigation.replace('Login');
    } catch (e) {
      console.error('signup error', e);
      setErrorMessage('Não foi possível concluir o cadastro.');
    } finally {
      setSubmitting(false);
    }
  }, [name, email, password, navigation, validate]);

  const goLogin = useCallback(() => navigation.replace('Login'), [navigation]);

  return {
    name, setName,
    email, setEmail,
    password, setPassword,
    submitting,
    errorMessage,
    handleSignup,
    goLogin,
  };
};
