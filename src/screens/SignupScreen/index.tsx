import React from "react";
import { TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useSignup } from "./hooks/useSignup";
import { Screen, Card, Title, ErrorText, LinkText } from "./styles";

import { TextField } from "../LoginScreen/components/TextField";
import { PrimaryButton } from "../LoginScreen/components/PrimaryButton";

type Nav = StackNavigationProp<RootStackParamList, "Signup">;
type Props = { navigation: Nav };

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    submitting,
    handleSignup,
    goLogin,
  } = useSignup(navigation);

  return (
    <Screen>
      <Card>
        <Title>Criar Conta</Title>

        <TextField
          placeholder="Nome Completo"
          placeholderTextColor="#aaa"
          value={name}
          onChangeText={setName}
          accessibilityLabel="Nome completo"
        />
        <TextField
          placeholder="E-mail"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          accessibilityLabel="E-mail"
        />
        <TextField
          placeholder="Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          accessibilityLabel="Senha"
        />

        {!!errorMessage && <ErrorText>{errorMessage}</ErrorText>}

        <PrimaryButton
          title={submitting ? "Cadastrando…" : "Cadastrar"}
          onPress={handleSignup}
          disabled={submitting}
        />

        <TouchableOpacity onPress={goLogin} accessibilityRole="button">
          <LinkText>Já tenho conta</LinkText>
        </TouchableOpacity>
      </Card>
    </Screen>
  );
};

export default SignupScreen;
