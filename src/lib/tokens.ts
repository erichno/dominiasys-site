import "server-only";
import { createHash, randomBytes } from "node:crypto";

const ALFABETO_BASE62 = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

/** Token para link oculto de pesquisa: 16 bytes aleatórios, codificados em base62. */
export function gerarToken(): string {
  const bytes = randomBytes(16);
  let numero = BigInt(`0x${bytes.toString("hex")}`);

  const zero = BigInt(0);
  if (numero === zero) return "0";

  let token = "";
  const base = BigInt(62);
  while (numero > zero) {
    token = ALFABETO_BASE62[Number(numero % base)] + token;
    numero /= base;
  }
  return token;
}

/** sha256(ip + salt). O IP nunca é armazenado em claro (ver respostas.ip_hash). */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT;
  if (!salt) {
    throw new Error("IP_HASH_SALT não configurado.");
  }
  return createHash("sha256").update(`${ip}${salt}`).digest("hex");
}
