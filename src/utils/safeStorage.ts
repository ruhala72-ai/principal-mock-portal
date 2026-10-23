/**
 * Safe local storage wrapper with memory fallback.
 * Prevents DOMException SecurityError in sandboxed iframes.
 */
class MemoryStorage {
  private store: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.store[key] ?? null;
  }

  setItem(key: string, value: string): void {
    this.store[key] = String(value);
  }

  removeItem(key: string): void {
    delete this.store[key];
  }

  clear(): void {
    this.store = {};
  }
}

const memoryFallback = new MemoryStorage();

function getStorage(): Storage | MemoryStorage {
  try {
    if (typeof window !== 'undefined' && 'localStorage' in window && window.localStorage) {
      // Test if actually accessible (in sandboxed iframes access may be denied)
      const testKey = '__storage_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return window.localStorage;
    }
  } catch (e) {
    // Access denied in sandboxed iframe or third-party cookies disabled
  }
  return memoryFallback;
}

export const safeStorage = {
  getItem(key: string): string | null {
    try {
      return getStorage().getItem(key);
    } catch {
      return memoryFallback.getItem(key);
    }
  },
  setItem(key: string, value: string): void {
    try {
      getStorage().setItem(key, value);
    } catch {
      memoryFallback.setItem(key, value);
    }
  },
  removeItem(key: string): void {
    try {
      getStorage().removeItem(key);
    } catch {
      memoryFallback.removeItem(key);
    }
  }
};
