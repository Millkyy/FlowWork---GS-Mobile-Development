import React from "react";
import { OptionBtn, OptionText } from "../styles";

export const OptionButton: React.FC<{ label: string; onPress: () => void }> = ({
  label,
  onPress,
}) => (
  <OptionBtn onPress={onPress} accessibilityRole="button">
    <OptionText>{label}</OptionText>
  </OptionBtn>
);
