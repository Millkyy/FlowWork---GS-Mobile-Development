import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #f5ecdd;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const AvatarWrap = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #fed7aa;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const Avatar = styled.Image`
  width: 112px;
  height: 112px;
  border-radius: 56px;
`;

export const Name = styled.Text`
  font-size: 24px;
  color: #3b2f26;
  font-weight: 600;
  margin-bottom: 4px;
  text-align: center;
`;

export const Email = styled.Text`
  font-size: 16px;
  color: #6b5b4b;
  margin-bottom: 32px;
  text-align: center;
`;
