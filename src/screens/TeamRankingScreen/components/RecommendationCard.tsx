import React from "react";
import { Card, CardTitle, CardDesc } from "../styles";
import { RecommendationItem } from "../models/recommendation";

export const RecommendationCard: React.FC<{ item: RecommendationItem }> = ({
  item,
}) => (
  <Card>
    <CardTitle>{item.name}</CardTitle>
    <CardDesc>{item.desc}</CardDesc>
  </Card>
);
