"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

const ERRO_LOGIN = "E-mail ou senha incorretos.";

export async function autenticar(
  _estadoAnterior: string | undefined,
  formData: FormData,
): Promise<string | undefined> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      senha: formData.get("senha"),
      redirectTo: (formData.get("callbackUrl") as string) || "/admin",
    });
  } catch (error) {
    // O próprio signIn lança um erro de redirecionamento no sucesso — só
    // um AuthError de verdade é falha de login. Qualquer outra coisa sobe.
    if (error instanceof AuthError) {
      return ERRO_LOGIN;
    }
    throw error;
  }
}
