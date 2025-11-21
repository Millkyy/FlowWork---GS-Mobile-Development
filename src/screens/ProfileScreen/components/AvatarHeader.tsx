import React from "react";
import { AvatarWrap, Avatar, Name, Email } from "../styles";

const avatarFallback = require("../../../assets/perfil.png");

export const AvatarHeader: React.FC<{
  name?: string;
  email?: string;
  avatarUrl?: string;
}> = ({ name, email, avatarUrl }) => (
  <>
    <AvatarWrap>
      <Avatar
        source={avatarUrl ? { uri: avatarUrl } : avatarFallback}
        resizeMode="cover"
      />
    </AvatarWrap>
    {!!name && <Name>{name}</Name>}
    {!!email && <Email>{email}</Email>}
  </>
);
