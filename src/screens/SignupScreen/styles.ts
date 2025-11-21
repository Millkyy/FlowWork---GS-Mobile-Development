import styled from 'styled-components/native';

export const Screen = styled.View`
  flex: 1;
  background-color: #f5ecdd;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.View`
  width: 85%;
  height: 70%;
  background-color: #f0e3cf;
  border-radius: 10px;
  padding: 24px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #ddc7a4;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #f1835d;
  margin-bottom: 24px;
  font-weight: 600;
`;

export const ErrorText = styled.Text`
  color: red;
  margin-bottom: 16px;
  text-align: center;
`;

export const LinkText = styled.Text`
  color: #f1835d;
  font-size: 16px;
`;
