import React from "react";
import { Progress } from "../styles";

export const ProgressText: React.FC<{ current: number; total: number }> = ({
  current,
  total,
}) => (
  <Progress>
    Pergunta {current} de {total}
  </Progress>
);
