import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: #f5ecdd;
  padding: 24px 16px;
`;

export const Content = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  color: #3b2f26;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const Card = styled.View`
  background-color: #f8f1e5;
  border-radius: 16px;
  padding: 12px 12px;
  margin-bottom: 12px;
  border-width: 1px;
  border-color: #e2d2b5;
`;

export const CardHeaderRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CardHeaderLeft = styled.View``;

export const CardHeaderTitle = styled.Text`
  color: #3b2f26;
  font-size: 16px;
  font-weight: 600;
`;

export const CardHeaderSubtitle = styled.Text`
  color: #f97316;
  font-size: 13px;
`;

export const CardHeaderToggle = styled.Text`
  color: #f97316;
  font-size: 16px;
  margin-left: 8px;
`;

export const CardDesc = styled.Text`
  color: #6b5b4b;
  font-size: 13px;
  margin-top: 4px;
`;

export const CardTitle = styled.Text`
  color: #3b2f26;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

export const BlockedButton = styled.TouchableOpacity`
  background-color: #f97316;
  border-radius: 999px;
  padding: 12px 32px;
  margin-top: 8px;
`;

export const BlockedButtonText = styled.Text`
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
