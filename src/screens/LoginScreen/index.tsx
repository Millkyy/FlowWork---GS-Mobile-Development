import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useLogin } from './hooks/useLogin';
import { Screen, Card, Title, ErrorText, LinkText } from './styles';
import { Logo } from './components/Logo';
import { TextField } from './components/TextField'
import { PrimaryButton } from './components/PrimaryButton';

type LoginProp = StackNavigationProp<RootStackParamList, 'Login'>;
type Props = { navigation: LoginProp };

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const {
    email, setEmail,
    password, setPassword,
    errorMessage, submitting,
    handleLogin, goSignup,
  } = useLogin(navigation);

  return (
    <Screen>
      <Card>
        <Logo />
        <Title>FlowWork</Title>

        <TextField
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          accessibilityLabel="Campo de e-mail"
        />

        <TextField
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Campo de senha"
        />

        {!!errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <PrimaryButton title={submitting ? 'Entrando…' : 'Entrar'} onPress={handleLogin} disabled={submitting} />

        <TouchableOpacity onPress={goSignup} accessibilityRole="button">
          <LinkText>Criar conta</LinkText>
        </TouchableOpacity>
      </Card>
    </Screen>
  );
};

export default LoginScreen;
