import "server-only";
import redis from "@/lib/redis";

/**
 * Janela deslizante via sorted set do Redis: cada chamada registra um evento
 * com o timestamp atual como score, remove eventos fora da janela e conta o
 * que sobrou. `chave` já deve incluir o identificador (rota + IP, e-mail etc).
 *
 * Retorna `true` se a chamada está dentro do limite (siga em frente) e
 * `false` se deve ser bloqueada.
 */
export async function limitar(
  chave: string,
  maximo: number,
  janelaSegundos: number,
): Promise<boolean> {
  const chaveRedis = `rate-limit:${chave}`;
  const agora = Date.now();
  const inicioJanela = agora - janelaSegundos * 1000;
  const membro = `${agora}-${Math.random().toString(36).slice(2)}`;

  const resultado = await redis
    .multi()
    .zremrangebyscore(chaveRedis, 0, inicioJanela)
    .zadd(chaveRedis, agora, membro)
    .zcard(chaveRedis)
    .expire(chaveRedis, janelaSegundos)
    .exec();

  if (!resultado) return true;

  const contagem = resultado[2]?.[1] as number;
  return contagem <= maximo;
}
