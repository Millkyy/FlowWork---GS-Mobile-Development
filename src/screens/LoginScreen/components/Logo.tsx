import React from "react";
import styled from "styled-components/native";


const Img = styled.Image`
  width: 40px;
  height: 40px;
`;

export const Logo: React.FC = () => (
  <Img source={require("../../../assets/logo.png")} resizeMode="contain" />
);
