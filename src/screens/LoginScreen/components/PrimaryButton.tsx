import React from 'react';
import styled from 'styled-components/native';

type BtnProps = { $disabled?: boolean };

const Btn = styled.TouchableOpacity<BtnProps>`
  width: 100%;
  background-color: #f1835d;
  border-radius: 6px;
  padding: 14px 0;
  align-items: center;
  margin-bottom: 12px;
  max-width: 400px;

  opacity: ${({ $disabled }: BtnProps) => ($disabled ? 0.6 : 1)};
`;

const Txt = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 700;
`;

export const PrimaryButton: React.FC<{
  title: string;
  onPress: () => void;
  disabled?: boolean;
}> = ({ title, onPress, disabled }) => (
  <Btn onPress={onPress} disabled={!!disabled} $disabled={disabled} accessibilityRole="button">
    <Txt>{title}</Txt>
  </Btn>
);
