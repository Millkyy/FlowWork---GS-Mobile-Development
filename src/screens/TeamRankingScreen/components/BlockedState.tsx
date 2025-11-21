import React from "react";
import {
  BlockedWrap,
  BlockedText,
  BlockedButton,
  BlockedButtonText,
} from "../styles";

export const BlockedState: React.FC<{ onGoSimulation: () => void }> = ({
  onGoSimulation,
}) => (
  <BlockedWrap>
    <BlockedText>
      Você precisa concluir o quiz de perfil antes de acessar as recomendações.
    </BlockedText>
    <BlockedButton onPress={onGoSimulation} accessibilityRole="button">
      <BlockedButtonText>SIMULAÇÃO</BlockedButtonText>
    </BlockedButton>
  </BlockedWrap>
);
