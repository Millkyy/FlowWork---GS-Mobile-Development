import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: #f5ecdd;
  padding: 24px 16px;
`;

export const Title = styled.Text`
  color: #3b2f26;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
`;

export const SummaryContainer = styled.View`
  margin-bottom: 16px;
`;

export const SummaryText = styled.Text`
  color: #6b5b4b;
`;

export const Form = styled.View`
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
  margin-top: 4px;
  margin-bottom: 8px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8px;
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

export const BtnText = styled.Text`
  color: #ffffff;
  font-weight: 700;
`;

export const BtnTextLight = styled.Text`
  color: #3b2f26;
  font-weight: 600;
`;


export const MoodCard = styled.View`
  margin-top: 8px;
  margin-bottom: 12px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 12px;
`;

export const MoodOptionButton = styled.TouchableOpacity<{
  selected?: boolean;
  color?: string;
}>`
  background-color: ${({ selected, color }) =>
    selected && color ? color : '#f5f5f5'};
  padding-vertical: 12px;
  padding-horizontal: 14px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const MoodOptionText = styled.Text<{ selected?: boolean }>`
  color: ${({ selected }) => (selected ? '#ffffff' : '#333333')};
  font-weight: 600;
  font-size: 14px;
`;

export const TeamLabel = styled.Text`
  color: #6b5b4b;
  margin-top: 8px;
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
