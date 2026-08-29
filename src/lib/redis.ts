import "server-only";
import Redis from "ioredis";

declare global {
  var __dominiaRedisClient: Redis | undefined;
}

/**
 * Mesma precaução do pool do Postgres: reaproveita a conexão entre
 * recarregamentos do módulo no hot reload do `next dev`.
 *
 * `lazyConnect: true` evita que o ioredis tente conectar assim que o módulo
 * é importado — o Next.js importa rotas de API durante a análise do build
 * (`next build`), sem Redis disponível ali, o que gerava erro de conexão
 * não tratado mesmo o build tendo sucesso. Com lazyConnect, a conexão só
 * acontece no primeiro comando de verdade (ex.: o `.ping()` do health check).
 */
const redis =
  global.__dominiaRedisClient ??
  new Redis(process.env.REDIS_URL ?? "redis://localhost:6379", {
    lazyConnect: true,
  });

if (process.env.NODE_ENV !== "production") {
  global.__dominiaRedisClient = redis;
}

export default redis;
