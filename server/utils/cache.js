import NodeCache from 'node-cache';

class CacheService {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: parseInt(process.env.CACHE_TTL) || 3600, // 1 hour default
      checkperiod: 600, // Check for expired keys every 10 minutes
      useClones: false
    });
  }

  set(key, value, ttl) {
    return this.cache.set(key, value, ttl);
  }

  get(key) {
    return this.cache.get(key);
  }

  del(key) {
    return this.cache.del(key);
  }

  flush() {
    return this.cache.flushAll();
  }

  has(key) {
    return this.cache.has(key);
  }

  getStats() {
    return this.cache.getStats();
  }

  // Generate cache key for song queries
  generateSongKey(query) {
    return `song:${query.toLowerCase().trim()}`;
  }

  // Generate cache key for recommendation queries
  generateRecommendKey(query, options = {}) {
    const optionsStr = Object.keys(options)
      .sort()
      .map(key => `${key}:${options[key]}`)
      .join('|');
    return `recommend:${query.toLowerCase().trim()}|${optionsStr}`;
  }
}

export const cache = new CacheService();
