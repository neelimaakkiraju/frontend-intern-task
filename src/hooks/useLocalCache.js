// small helper to cache in localStorage with a TTL (ms)
import { useCallback } from 'react';

export function useLocalCache() {
  const get = useCallback((key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed.expires && Date.now() > parsed.expires) {
        localStorage.removeItem(key);
        return null;
      }
      return parsed.value;
    } catch {
      return null;
    }
  }, []);

  const set = useCallback((key, value, ttlMs = 1000 * 60 * 60) => {
    const payload = {
      value,
      expires: Date.now() + ttlMs
    };
    localStorage.setItem(key, JSON.stringify(payload));
  }, []);

  return { get, set };
}
