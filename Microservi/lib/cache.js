// Simple in-memory cache for storing rankings
class Cache {
  constructor() {
    this.store = new Map();
    this.ttl = 3600000; // 1 hour in milliseconds
  }

  set(key, value) {
    const expiresAt = Date.now() + this.ttl;
    this.store.set(key, { value, expiresAt });
  }

  get(key) {
    const item = this.store.get(key);
    if (!item) return null;
    if (Date.now() > item.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return item.value;
  }

  generateKey(requirements) {
    return JSON.stringify(requirements).replace(/\s/g, '');
  }

  clear() {
    this.store.clear();
  }
}

export const cache = new Cache();
