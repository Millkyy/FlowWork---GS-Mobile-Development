import React from "react";
import { ActivityIndicator } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { useProfileScreen } from "./hooks/useProfileScreen";
import { Container } from "./styles";
import { AvatarHeader } from "./components/AvatarHeader";
import { LogoutButton } from "./components/LogoutButton";

type Nav = StackNavigationProp<RootStackParamList, 'Profile'>;
type Props = { navigation: Nav };

const ProfileScreen: React.FC<Props> = ({ navigation }) => {
  const { profile, loading, handleLogout } = useProfileScreen();

  if (loading) return <ActivityIndicator style={{ flex: 1 }} />;

  const onLogout = async () => {
    await handleLogout();
    navigation.replace("Login");
  };

  return (
    <Container>
      <AvatarHeader
        name={profile?.name || "Usuário"}
        email={profile?.email}
        avatarUrl={profile?.avatarUrl}
      />
      <LogoutButton onPress={onLogout} />
    </Container>
  );
};

export default ProfileScreen;
