import "server-only";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { usuarios } from "@/lib/db/schema";
import { limitar } from "@/lib/rate-limit";

const OITO_HORAS_EM_SEGUNDOS = 8 * 60 * 60;
const UMA_HORA_EM_SEGUNDOS = 60 * 60;

function obterIp(request: Request | undefined): string {
  const encaminhado = request?.headers.get("x-forwarded-for");
  if (encaminhado) return encaminhado.split(",")[0].trim();
  return request?.headers.get("x-real-ip") ?? "0.0.0.0";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    // Validade de 8h, com renovação por atividade: cada requisição
    // autenticada há mais de 1h reemite o JWT com nova expiração, então
    // uma sessão em uso constante nunca esbarra nas 8h. Inatividade total
    // por 8h expira de verdade.
    maxAge: OITO_HORAS_EM_SEGUNDOS,
    updateAge: UMA_HORA_EM_SEGUNDOS,
  },
  pages: {
    signIn: "/admin/login",
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        senha: {},
      },
      async authorize(credentials, request) {
        const email = String(credentials?.email ?? "")
          .trim()
          .toLowerCase();
        const senha = String(credentials?.senha ?? "");
        if (!email || !senha) return null;

        const ip = obterIp(request);

        // Rate limit por e-mail E por IP — as duas condições da spec,
        // qualquer uma estourando já barra a tentativa.
        const [dentroLimiteEmail, dentroLimiteIp] = await Promise.all([
          limitar(`login-email:${email}`, 5, 15 * 60),
          limitar(`login-ip:${ip}`, 5, 15 * 60),
        ]);
        if (!dentroLimiteEmail || !dentroLimiteIp) return null;

        const [usuario] = await db
          .select()
          .from(usuarios)
          .where(eq(usuarios.email, email))
          .limit(1);

        // Mesma resposta (null) para e-mail inexistente, usuário inativo ou
        // senha errada — o chamador nunca sabe qual foi, de propósito.
        if (!usuario || !usuario.ativo) return null;

        const senhaValida = await verify(usuario.senhaHash, senha);
        if (!senhaValida) return null;

        await db
          .update(usuarios)
          .set({ ultimoLogin: new Date() })
          .where(eq(usuarios.id, usuario.id));

        return { id: usuario.id, email: usuario.email, name: usuario.nome };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
});
