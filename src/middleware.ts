import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { usuarios } from "@/lib/db/schema";

const ROTA_LOGIN = "/admin/login";

export default auth(async (request) => {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== ROTA_LOGIN) {
    const usuarioId = request.auth?.user?.id;
    let ativo = false;

    if (usuarioId) {
      const [usuario] = await db
        .select({ ativo: usuarios.ativo })
        .from(usuarios)
        .where(eq(usuarios.id, usuarioId))
        .limit(1);
      ativo = Boolean(usuario?.ativo);
    }

    if (!ativo) {
      const loginUrl = new URL(ROTA_LOGIN, request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
});

export const config = {
  matcher: ["/p/:path*", "/admin/:path*"],
  runtime: "nodejs",
};
