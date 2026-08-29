/**
 * Semeia o primeiro usuário admin, a pesquisa-padrão (seção 7 da spec) e um
 * link ativo para ela — sem o link, a pesquisa fica sem nenhuma URL /p/[token]
 * distribuível.
 *
 * Uso:
 *   pnpm db:seed -- --email=voce@dominiasys.com.br --senha="SenhaForte123!" [--nome="Seu Nome"]
 *
 * E-mail e senha só vêm de argumento — nunca hardcoded aqui. Rodar de novo é
 * seguro: usuário (por e-mail), pesquisa (por título) e link (um por
 * pesquisa) existentes são pulados, não duplicados.
 */
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { hash } from "@node-rs/argon2";
import { pesquisas, perguntas, pesquisaLinks, usuarios } from "../src/lib/db/schema";
import { gerarToken } from "../src/lib/tokens";

interface Argumentos {
  email: string;
  senha: string;
  nome: string;
}

function lerArgumentos(): Argumentos {
  const args = new Map<string, string>();
  for (const arg of process.argv.slice(2)) {
    const match = /^--([^=]+)=(.*)$/.exec(arg);
    if (match) args.set(match[1], match[2]);
  }

  const email = args.get("email");
  const senha = args.get("senha");
  const nome = args.get("nome") ?? "Administrador";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error(
      'E-mail inválido ou ausente. Use: --email="voce@dominiasys.com.br"',
    );
  }
  if (!senha || senha.length < 8) {
    throw new Error(
      'Senha ausente ou curta demais (mínimo 8 caracteres). Use: --senha="..."',
    );
  }

  return { email, senha, nome };
}

function opcao(rotulo: string) {
  const valor = rotulo
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return { valor, rotulo };
}

const PERGUNTAS_PADRAO = [
  {
    tipo: "unica" as const,
    enunciado: "Qual seu papel hoje?",
    obrigatoria: false,
    opcoes: [
      "Sócio ou diretor",
      "Gestor",
      "Especialista técnico",
      "Analista",
      "Empreendedor individual",
      "Outro",
    ].map(opcao),
  },
  {
    tipo: "escala" as const,
    enunciado: "Qual seu nível com IA hoje?",
    obrigatoria: false,
    opcoes: { min: 1, max: 5, rotulo_min: "nunca usei", rotulo_max: "uso todo dia no trabalho" },
  },
  {
    tipo: "multipla" as const,
    enunciado: "Quais temas te interessam?",
    obrigatoria: false,
    opcoes: [
      "Fundamentos de LLM",
      "Prompt com método",
      "Automação com n8n",
      "Agentes de IA",
      "IA para gestão",
      "IA para vendas e atendimento",
      "Dados e RAG",
      "IA para desenvolvimento de software",
    ].map(opcao),
  },
  {
    tipo: "textarea" as const,
    enunciado: "Qual problema você quer resolver com IA nos próximos 3 meses?",
    obrigatoria: true,
    opcoes: null,
  },
  {
    tipo: "multipla" as const,
    enunciado: "Que ferramentas você já usa?",
    obrigatoria: false,
    opcoes: ["ChatGPT", "Claude", "Gemini", "Copilot", "n8n", "Nenhuma ainda"].map(opcao),
  },
  {
    tipo: "unica" as const,
    enunciado: "Formato preferido",
    obrigatoria: false,
    opcoes: [
      "Ao vivo online",
      "Gravado com suporte",
      "Presencial em São José dos Campos",
      "Híbrido",
    ].map(opcao),
  },
  {
    tipo: "unica" as const,
    enunciado: "Carga horária ideal",
    obrigatoria: false,
    opcoes: ["4 h", "8 h", "16 h", "40 h ou mais"].map(opcao),
  },
  {
    tipo: "multipla" as const,
    enunciado: "Melhor horário",
    obrigatoria: false,
    opcoes: ["Manhã", "Horário de almoço", "Noite", "Sábado"].map(opcao),
  },
  {
    tipo: "unica" as const,
    enunciado: "Quanto você investiria nesse curso?",
    obrigatoria: false,
    opcoes: [
      "Até R$ 300",
      "R$ 300 a 800",
      "R$ 800 a 2.000",
      "Acima de R$ 2.000",
      "A empresa paga",
    ].map(opcao),
  },
  {
    tipo: "email" as const,
    enunciado: "Quer ser avisado quando a turma abrir? Deixe seu e-mail.",
    obrigatoria: false,
    opcoes: null,
  },
  {
    tipo: "consentimento" as const,
    enunciado:
      "Autorizo a DOMINIA a usar minhas respostas para desenhar cursos e a me contatar sobre eles.",
    obrigatoria: true,
    opcoes: null,
  },
];

const TITULO_PESQUISA_PADRAO = "Que curso de IA você quer que exista?";
const DESCRICAO_PESQUISA_PADRAO =
  "Dez perguntas, três minutos. Suas respostas definem o que eu vou construir nos próximos meses.";

async function main() {
  const { email, senha, nome } = lerArgumentos();

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL não configurada.");
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
  const db = drizzle(pool);

  try {
    const usuarioExistente = await db
      .select({ id: usuarios.id })
      .from(usuarios)
      .where(eq(usuarios.email, email))
      .limit(1);

    if (usuarioExistente.length > 0) {
      console.log(`Usuário ${email} já existe — pulando.`);
    } else {
      // Argon2id já é o algoritmo padrão do @node-rs/argon2 — não passar
      // `algorithm: Algorithm.Argon2id` explicitamente porque é um const
      // enum ambiente, incompatível com isolatedModules deste projeto.
      const senhaHash = await hash(senha);
      await db.insert(usuarios).values({
        id: randomUUID(),
        email,
        senhaHash,
        nome,
        papel: "admin",
      });
      console.log(`Usuário admin criado: ${email}`);
    }

    const pesquisaExistente = await db
      .select({ id: pesquisas.id })
      .from(pesquisas)
      .where(eq(pesquisas.titulo, TITULO_PESQUISA_PADRAO))
      .limit(1);

    let pesquisaId: string;

    if (pesquisaExistente.length > 0) {
      pesquisaId = pesquisaExistente[0].id;
      console.log(`Pesquisa-padrão já existe — pulando.`);
    } else {
      const [pesquisa] = await db
        .insert(pesquisas)
        .values({
          id: randomUUID(),
          titulo: TITULO_PESQUISA_PADRAO,
          descricao: DESCRICAO_PESQUISA_PADRAO,
          status: "ativa",
        })
        .returning({ id: pesquisas.id });
      pesquisaId = pesquisa.id;

      await db.insert(perguntas).values(
        PERGUNTAS_PADRAO.map((pergunta, index) => ({
          id: randomUUID(),
          pesquisaId,
          ordem: index + 1,
          tipo: pergunta.tipo,
          enunciado: pergunta.enunciado,
          obrigatoria: pergunta.obrigatoria,
          opcoes: pergunta.opcoes,
        })),
      );

      console.log(
        `Pesquisa-padrão criada com ${PERGUNTAS_PADRAO.length} perguntas: "${TITULO_PESQUISA_PADRAO}"`,
      );
    }

    const linkExistente = await db
      .select({ token: pesquisaLinks.token })
      .from(pesquisaLinks)
      .where(eq(pesquisaLinks.pesquisaId, pesquisaId))
      .limit(1);

    if (linkExistente.length > 0) {
      console.log(`Link da pesquisa-padrão já existe: /p/${linkExistente[0].token}`);
    } else {
      const token = gerarToken();
      await db.insert(pesquisaLinks).values({
        id: randomUUID(),
        pesquisaId,
        token,
        rotulo: "Link inicial (seed)",
      });
      console.log(`Link da pesquisa-padrão criado: /p/${token}`);
    }
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Falha ao semear o banco:", error.message ?? error);
  process.exit(1);
});
