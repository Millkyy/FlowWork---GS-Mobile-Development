import React from 'react';
import styled from 'styled-components/native';

const Btn = styled.TouchableOpacity`
  background-color: #f97316;
  padding: 14px 40px;
  border-radius: 999px;
`;

const Txt = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;

export const LogoutButton: React.FC<{ onPress: () => void }> = ({
  onPress,
}) => (
  <Btn onPress={onPress} accessibilityRole="button">
    <Txt>Sair</Txt>
  </Btn>
);
