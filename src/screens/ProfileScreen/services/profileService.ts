import AsyncStorage from '@react-native-async-storage/async-storage';

const PROFILE_KEY = 'userProfile';
const TOKEN_KEY = 'userToken';
const CREDENTIALS_KEY = 'userCredentials';

export type UserProfile = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export const profileService = {
  async load(): Promise<UserProfile | null> {
    const json = await AsyncStorage.getItem(PROFILE_KEY);
    if (json) {
      try {
        return JSON.parse(json) as UserProfile;
      } catch {
        await AsyncStorage.removeItem(PROFILE_KEY);
      }
    }
    
    const creds = await AsyncStorage.getItem(CREDENTIALS_KEY);
    if (creds) {
      try {
        const { email } = JSON.parse(creds) as { email: string };
        return { name: 'Usuário', email };
      } catch { /* ignore */ }
    }
    return null;
  },

  async save(profile: UserProfile): Promise<void> {
    await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  },

  async signOut(): Promise<void> {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(PROFILE_KEY);
  },
};
