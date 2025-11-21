import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: #f5ecdd;
  padding: 24px 16px;
`;

export const QuestionText = styled.Text`
  font-size: 26px;
  font-weight: 700;
  color: #3b2f26;
  margin-bottom: 4px;
`;


export const Progress = styled.Text`
  margin-top: 4px;
  color: #f97316;
  font-size: 14px;
`;


export const SummarySection = styled.View`
  margin-top: 28px;
`;

export const SummaryTitle = styled.Text`
  color: #3b2f26;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const SummaryItem = styled.Text`
  color: #c2410c;
  font-size: 14px;
  margin-bottom: 4px;
`;


export const MissionsSection = styled.View`
  margin-top: 24px;
`;

export const MissionsTitle = styled.Text`
  color: #3b2f26;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const MissionItem = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: #f0e3cf;
  border-radius: 14px;
  border-width: 1px;
  border-color: #ddc7a4;
  padding: 12px 14px;
  margin-bottom: 8px;
`;

export const MissionCheckbox = styled.View<{ completed?: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border-width: 2px;
  border-color: ${({ completed }) =>
    completed ? '#22c55e' : '#3b2f26'};
  background-color: ${({ completed }) =>
    completed ? '#22c55e' : 'transparent'};
  align-items: center;
  justify-content: center;
  margin-right: 12px;
`;

export const MissionCheckboxMark = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

export const MissionText = styled.Text`
  color: #3b2f26;
  font-size: 14px;
  flex: 1;
`;
