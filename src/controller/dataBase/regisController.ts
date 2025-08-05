import redis from './regis';

type CacheValue = string | object | number | null;

interface setCacheParams {
  key: string;
  value: CacheValue;
  ttlSeconds?: number; // Tempo em segundos para expirar, padrão é 3600s (1 hora)
}

interface cacheKeyParams {
  key: string;
}

class RedisController {
  /**
   * Define um valor no cache com TTL em segundos.
   * @param key chave do cache
   * @param value valor a salvar (string ou objeto)
   * @param ttlSeconds tempo para expirar em segundos (default 3600s = 1h)
   */
  async setCache({ key, value, ttlSeconds = 3600 }: setCacheParams): Promise<'OK' | null> {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    return await redis.set(key, data, 'EX', ttlSeconds);
  }

  /**
   * Obtém um valor do cache pelo key.
   * @param key chave do cache
   * @returns valor desserializado (objeto/string) ou null se não existir
   */
  async getCache<T = any>({ key }: cacheKeyParams): Promise<T | null> {
    const data = await redis.get(key);
    if (!data) return null;

    try {
      return JSON.parse(data) as T;
    } catch {
      return data as unknown as T;
    }
  }


  /**
   * Remove uma chave do cache
   * @param key chave do cache a ser removida
   * @returns número de chaves removidas
   */
  async delCache({ key }: cacheKeyParams): Promise<number> {
    return await redis.del(key);
  }

  /**
   * Verifica se uma chave existe no cache
   * @param key chave do cache a ser verificada
   * @returns true se existir, false caso contrário
   */
  async hasCache({ key }: cacheKeyParams): Promise<boolean> {
    const exists = await redis.exists(key);
    return exists === 1;
  }

}

export default new RedisController();
