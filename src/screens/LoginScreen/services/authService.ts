import AsyncStorage from '@react-native-async-storage/async-storage';

const CREDENTIALS_KEY = 'userCredentials';
const TOKEN_KEY = 'userToken';

export type StoredCredentials = { email: string; password: string };

const normalizeEmail = (e: string) => e.trim().toLowerCase();

export const authService = {
  async debugDump() {
    const raw = await AsyncStorage.getItem(CREDENTIALS_KEY);
    console.log('[authService] dump', raw);
    return raw;
  },

  async clearAll() {
    await AsyncStorage.multiRemove([CREDENTIALS_KEY, TOKEN_KEY]);
  },

  async register(creds: StoredCredentials) {
    const payload: StoredCredentials = {
      email: normalizeEmail(creds.email),
      password: creds.password,
    };
    await AsyncStorage.setItem(CREDENTIALS_KEY, JSON.stringify(payload));
  },

  async getStoredCredentials(): Promise<StoredCredentials | null> {
    try {
      const json = await AsyncStorage.getItem(CREDENTIALS_KEY);
      if (!json) return null;
      const parsed: unknown = JSON.parse(json);
      if (
        typeof parsed === 'object' &&
        parsed !== null &&
        'email' in parsed &&
        'password' in parsed
      ) {
        return parsed as StoredCredentials;
      }
      await AsyncStorage.removeItem(CREDENTIALS_KEY);
      return null;
    } catch (e) {
      console.error('getStoredCredentials error', e);
      return null;
    }
  },

  async signIn(email: string, password: string): Promise<{ ok: boolean; error?: string }> {
    const creds = await this.getStoredCredentials();
    if (!creds) return { ok: false, error: 'Nenhum cadastro encontrado. Faça seu registro primeiro.' };
    const ok =
      normalizeEmail(email) === normalizeEmail(creds.email) &&
      password === creds.password;
    if (!ok) return { ok: false, error: 'E-mail ou senha incorretos' };

    await AsyncStorage.setItem(TOKEN_KEY, 'dummy-token');
    return { ok: true };
  },

  async isSignedIn(): Promise<boolean> {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return !!token;
  },

  async signOut() {
    await AsyncStorage.removeItem(TOKEN_KEY);
  },
};
