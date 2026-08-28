import servicos from "@/content/servicos";

const pilares = [
  {
    chave: "formar" as const,
    numero: "01",
    nome: "FORMAR",
    headline: "Pessoas usando IA com critério.",
    descricao:
      "Antes de automatizar qualquer coisa, o time precisa entender o que a ferramenta faz, onde ela erra e o que não pode entrar nela. Capacitação aplicada ao trabalho real, não a exemplos genéricos.",
  },
  {
    chave: "direcionar" as const,
    numero: "02",
    nome: "DIRECIONAR",
    headline: "A empresa sabendo onde aplicar.",
    descricao:
      "Mapeamento de oportunidades, priorização por impacto e esforço, estimativa de retorno e um roadmap com dono, prazo e critério de sucesso. Decisão baseada em dado, não em tendência.",
  },
  {
    chave: "construir" as const,
    numero: "03",
    nome: "CONSTRUIR",
    headline: "Sistema rodando em produção.",
    descricao:
      "Assistentes, agentes e sistemas sob medida, integrados ao que a empresa já usa, com painel de acompanhamento e time treinado para operar.",
  },
];

export function Pilares() {
  return (
    <section className="bg-surface-900 px-6 py-secao-mobile sm:py-secao-desktop">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-[640px] text-center">
          <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
            Como trabalho
          </p>
          <h2 className="mt-4 font-display text-h2-mobile font-semibold text-branco-frio sm:text-h2">
            Entender, decidir, executar
          </h2>
          <p className="mt-4 max-w-leitura text-corpo-mobile text-cinza-prata sm:text-corpo">
            A maioria dos fornecedores cobre uma etapa. Treinador não implanta. Consultor não
            codifica. Fábrica de software não questiona a decisão. A DOMINIA cobre as três, e é
            isso que faz o plano chegar à produção.
          </p>
        </div>

        <div className="relative mt-bloco-interno">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-24 hidden h-px origin-left rotate-[18deg] bg-gradient-to-r from-transparent via-azul-celeste/30 to-transparent md:block"
          />

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {pilares.map((pilar) => {
              const servicosDoPilar = servicos
                .filter((servico) => servico.pilar === pilar.chave)
                .map((servico) => servico.nome);

              return (
                <div key={pilar.chave} className="relative z-10">
                  <span className="font-display text-h3-mobile font-semibold text-azul-celeste sm:text-h3">
                    {pilar.numero}
                  </span>
                  <h3 className="mt-3 font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
                    {pilar.nome}
                  </h3>
                  <p className="mt-1 font-display text-sm text-cinza-prata">{pilar.headline}</p>
                  <p className="mt-3 text-corpo-mobile text-cinza-prata sm:text-corpo">
                    {pilar.descricao}
                  </p>
                  <p className="mt-4 text-sm text-azul-celeste">{servicosDoPilar.join(" · ")}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
