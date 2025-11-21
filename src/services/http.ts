import { Platform } from 'react-native';

const ANDROID_LOCALHOST = '10.0.2.2';
const PORT = 62121;

export const BASE_URL =
  Platform.OS === 'android'
    ? `http://${ANDROID_LOCALHOST}:${PORT}`
    : `http://localhost:${PORT}`;

type FetchOptions = RequestInit & { retries?: number; retryDelayMs?: number };

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export async function http<T = any>(path: string, opts: FetchOptions = {}): Promise<T> {
  const { retries = 2, retryDelayMs = 600, headers, ...rest } = opts;
  let attempt = 0;
  let lastError: any;

  const url = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  while (attempt <= retries) {
    try {
      const res = await fetch(url, {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          ...(headers || {}),
        },
        ...rest,
      });

      if (res.status === 204) {
        // @ts-ignore
        return undefined as T;
      }

      if (!res.ok) {
        if ([502, 503, 504].includes(res.status) && attempt < retries) {
          attempt++;
          await sleep(retryDelayMs * attempt);
          continue;
        }
        const text = await res.text();
        throw new Error(`HTTP ${res.status} - ${text || res.statusText}`);
      }

      const ct = res.headers.get('content-type') || '';
      if (ct.includes('application/json')) {
        return (await res.json()) as T;
      }
      // @ts-ignore
      return (await res.text()) as T;
    } catch (err: any) {
      lastError = err;
      const msg = (err?.message || '').toLowerCase();
      const isNetwork = msg.includes('network') || msg.includes('failed') || msg.includes('abort');
      if (isNetwork && attempt < retries) {
        attempt++;
        await sleep(retryDelayMs * attempt);
        continue;
      }
      break;
    }
  }
  throw lastError;
}

export const api = {
  get:  <T>(p: string) => http<T>(p, { method: 'GET' }),
  post: <T>(p: string, body?: any) => http<T>(p, { method: 'POST', body: JSON.stringify(body ?? {}) }),
  put:  <T>(p: string, body?: any) => http<T>(p, { method: 'PUT',  body: JSON.stringify(body ?? {}) }),
  del:  <T>(p: string) => http<T>(p, { method: 'DELETE' }),
};
