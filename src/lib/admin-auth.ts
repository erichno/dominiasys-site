import "server-only";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { usuarios } from "@/lib/db/schema";

export class NaoAutorizadoError extends Error {
  constructor() {
    super("Não autorizado.");
    this.name = "NaoAutorizadoError";
  }
}

/**
 * Toda server action do admin chama isto PRIMEIRO — o middleware já barra
 * a navegação, mas uma server action pode ser invocada independente da
 * página que a chamou, então cada uma reverifica sessão + usuário ativo
 * por conta própria.
 */
export async function requererAdmin(): Promise<{ usuarioId: string }> {
  const session = await auth();
  const usuarioId = session?.user?.id;
  if (!usuarioId) throw new NaoAutorizadoError();

  const [usuario] = await db
    .select({ ativo: usuarios.ativo })
    .from(usuarios)
    .where(eq(usuarios.id, usuarioId))
    .limit(1);

  if (!usuario?.ativo) throw new NaoAutorizadoError();

  return { usuarioId };
}
