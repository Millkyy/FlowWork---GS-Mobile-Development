import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: #f5ecdd;
  padding: 24px 16px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: #3b2f26;
  margin-bottom: 12px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
`;

export const Card = styled.View`
  background-color: #f0e3cf;
  border-radius: 14px;
  padding: 12px 14px;
  margin-bottom: 10px;
  border-width: 1px;
  border-color: #ddc7a4;
`;

export const CardTitle = styled.Text`
  color: #3b2f26;
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 2px;
`;

export const CardSubtitle = styled.Text`
  color: #6b5b4b;
  font-size: 13px;
`;

export const Form = styled.View`
  margin-top: 16px;
  background-color: #f8f1e5;
  border-radius: 18px;
  padding: 14px 16px 18px;
  border-width: 1px;
  border-color: #e2d2b5;
`;

export const FormTitle = styled.Text`
  color: #3b2f26;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const Input = styled.TextInput`
  flex: 1;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 10px 12px;
  color: #3b2f26;
  border-width: 1px;
  border-color: #ddc7a4;
`;

export const PrimaryBtn = styled.TouchableOpacity`
  flex: 1;
  background-color: #f97316;
  border-radius: 10px;
  padding: 10px 14px;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const SecondaryBtn = styled.TouchableOpacity`
  flex: 1;
  background-color: #e2d8c8;
  border-radius: 10px;
  padding: 10px 14px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const DeleteBtn = styled.TouchableOpacity`
  margin-top: 8px;
  align-self: flex-start;
  padding: 6px 10px;
  border-radius: 999px;
  border-width: 1px;
  border-color: #fca5a5;
  background-color: #fef2f2;
`;

export const BtnText = styled.Text`
  color: #ffffff;
  font-weight: 700;
`;

export const BtnTextLight = styled.Text`
  color: #3b2f26;
  font-weight: 600;
`;

/* Seletor de equipe */

export const TeamLabel = styled.Text`
  color: #6b5b4b;
  margin-bottom: 4px;
  font-size: 12px;
`;

export const TeamSelectButton = styled.TouchableOpacity`
  background-color: #ffffff;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ddc7a4;
  padding: 10px 12px;
`;

export const TeamSelectText = styled.Text<{ placeholder?: boolean }>`
  color: ${({ placeholder }) => (placeholder ? '#a58c6c' : '#3b2f26')};
`;

export const TeamDropdown = styled.View`
  margin-top: 4px;
  border-radius: 10px;
  border-width: 1px;
  border-color: #ddc7a4;
  overflow: hidden;
  background-color: #f8f1e5;
`;

export const TeamDropdownItem = styled.TouchableOpacity`
  padding: 10px 12px;
  border-bottom-width: 1px;
  border-bottom-color: #e5d3b7;
`;

export const TeamDropdownItemText = styled.Text`
  color: #3b2f26;
`;

export const ErrorBox = styled.View`
  padding: 12px;
  border-width: 1px;
  border-color: #fecaca;
  background-color: #fee2e2;
  margin-bottom: 8px;
  border-radius: 12px;
`;

export const ErrorText = styled.Text`
  color: #b91c1c;
`;
