import type { Metadata } from "next";
import empresa from "@/content/empresa";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como a DOMINIA coleta, usa e protege dados pessoais no site, no formulário de diagnóstico e nas pesquisas de expectativa de curso.",
};

interface DadoTratado {
  dado: string;
  finalidade: string;
  baseLegal: string;
}

const DADOS_DIAGNOSTICO: DadoTratado[] = [
  {
    dado: "Nome, e-mail corporativo, WhatsApp e empresa",
    finalidade: "Entrar em contato para conduzir a conversa de 30 minutos que você solicitou.",
    baseLegal:
      "Execução de procedimentos preliminares a um possível contrato, a seu pedido (art. 7º, V, LGPD).",
  },
  {
    dado: "Porte da empresa (campo opcional)",
    finalidade: "Entender o contexto da sua empresa antes da conversa.",
    baseLegal: "Execução de procedimentos preliminares a um possível contrato (art. 7º, V, LGPD).",
  },
  {
    dado: "Descrição do principal desafio",
    finalidade: "Preparar a conversa com base no que você já contou, sem perguntar de novo.",
    baseLegal: "Execução de procedimentos preliminares a um possível contrato (art. 7º, V, LGPD).",
  },
  {
    dado: "Consentimento marcado no formulário",
    finalidade: "Registrar sua concordância com o tratamento descrito nesta política.",
    baseLegal: "Consentimento (art. 7º, I, LGPD).",
  },
  {
    dado: "Dados públicos do site e do LinkedIn da sua empresa",
    finalidade:
      "Complementar o cadastro com informações públicas antes do primeiro contato, para não tomar seu tempo perguntando o que já é público.",
    baseLegal: "Legítimo interesse em qualificar o atendimento (art. 7º, IX, LGPD).",
  },
  {
    dado: "Origem do clique (UTM) e classificação interna do lead",
    finalidade: "Entender de onde vêm os contatos e priorizar o atendimento.",
    baseLegal: "Legítimo interesse em melhorar o atendimento e a comunicação (art. 7º, IX, LGPD).",
  },
];

const DADOS_PESQUISA: DadoTratado[] = [
  {
    dado: "Suas respostas às perguntas da pesquisa",
    finalidade: "Decidir quais cursos construir, em que formato e para quem.",
    baseLegal: "Consentimento, marcado na última pergunta da pesquisa (art. 7º, I, LGPD).",
  },
  {
    dado: "E-mail (campo opcional, última pergunta)",
    finalidade: "Avisar quando a turma do curso abrir, só se você deixar o e-mail.",
    baseLegal: "Consentimento (art. 7º, I, LGPD).",
  },
  {
    dado: "Endereço IP",
    finalidade:
      "Nunca é guardado como está. Só um hash (uma sequência irreversível) é armazenado, para impedir respostas duplicadas ou abusivas no mesmo link.",
    baseLegal: "Legítimo interesse em prevenir fraude e abuso (art. 7º, IX, LGPD).",
  },
  {
    dado: "Navegador usado no envio (user-agent)",
    finalidade: "Mesma finalidade de segurança acima.",
    baseLegal: "Legítimo interesse em prevenir fraude e abuso (art. 7º, IX, LGPD).",
  },
];

const DADOS_NAVEGACAO: DadoTratado[] = [
  {
    dado: "Páginas visitadas, origem da visita e dispositivo",
    finalidade: "Entender o que funciona no site e melhorar o conteúdo.",
    baseLegal:
      "Legítimo interesse em melhorar o site (art. 7º, IX, LGPD), com ferramenta de análise que evita cookies quando possível.",
  },
  {
    dado: "Verificação de que o envio de um formulário não é automatizado (Cloudflare Turnstile)",
    finalidade: "Impedir spam e abuso nos formulários públicos.",
    baseLegal: "Legítimo interesse em segurança (art. 7º, IX, LGPD).",
  },
];

const TERCEIROS = [
  {
    nome: "Cal.com",
    papel: "Agenda a conversa de 30 minutos. Nome, e-mail e horário ficam registrados nessa ferramenta.",
  },
  {
    nome: "WhatsApp (Meta)",
    papel:
      "Se você clicar em \"Falar no WhatsApp\", a conversa acontece na plataforma do WhatsApp, fora do nosso controle direto.",
  },
  {
    nome: "Resend",
    papel: "Envia os e-mails automáticos de confirmação.",
  },
  {
    nome: "Cloudflare",
    papel: "Entrega o site e filtra tráfego malicioso antes de chegar ao servidor.",
  },
  {
    nome: "Google Analytics 4 ou Umami",
    papel: "Mede visitas ao site, conforme a ferramenta ativa no momento.",
  },
];

function Secao({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-surface-600 py-10">
      <h2 className="font-display text-h3-mobile font-medium text-branco-frio sm:text-h3">
        {titulo}
      </h2>
      <div className="mt-4 max-w-leitura space-y-4 text-corpo-mobile text-cinza-prata sm:text-corpo">
        {children}
      </div>
    </section>
  );
}

function TabelaDados({ dados }: { dados: DadoTratado[] }) {
  return (
    <ul className="space-y-5">
      {dados.map((item) => (
        <li
          key={item.dado}
          className="rounded-card border border-branco-frio/[0.06] bg-surface-700 p-padding-card"
        >
          <p className="font-display text-branco-frio">{item.dado}</p>
          <p className="mt-2 text-sm text-cinza-prata">
            <span className="text-branco-frio/70">Para quê: </span>
            {item.finalidade}
          </p>
          <p className="mt-1 text-sm text-cinza-prata">
            <span className="text-branco-frio/70">Base legal: </span>
            {item.baseLegal}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function PoliticaDePrivacidadePage() {
  return (
    <article className="bg-surface-800 px-6 py-secao-mobile sm:py-secao-desktop">
      <div className="mx-auto max-w-[760px]">
        <p className="font-display text-eyebrow uppercase tracking-[.24em] text-azul-celeste">
          LGPD
        </p>
        <h1 className="mt-4 font-display text-h1-mobile font-semibold text-branco-frio sm:text-h1">
          Política de Privacidade
        </h1>
        <p className="mt-4 text-sm text-cinza-prata">Última atualização: 28 de agosto de 2026.</p>

        <div className="mt-6 max-w-leitura space-y-4 text-corpo-mobile text-cinza-prata sm:text-corpo">
          <p>
            Este documento explica quais dados pessoais a DOMINIA coleta neste site, para quê, com
            que base legal, com quem compartilha e quais direitos você tem sobre eles, nos termos
            da Lei Geral de Proteção de Dados (Lei 13.709/2018).
          </p>
        </div>

        <Secao titulo="Quem trata os seus dados">
          <p>
            {empresa.razaoSocial}, CNPJ {empresa.cnpj}, com sede em {empresa.endereco.logradouro},{" "}
            {empresa.endereco.cidade}/{empresa.endereco.uf}, é a controladora dos dados tratados
            neste site.
          </p>
          <p>
            Para exercer qualquer direito descrito aqui ou tirar dúvida sobre este documento, fale
            com a gente por{" "}
            <a href={`mailto:${empresa.email}`} className="text-azul-celeste hover:underline">
              {empresa.email}
            </a>
            .
          </p>
        </Secao>

        <Secao titulo="Dados do formulário de diagnóstico">
          <p>
            Quando você preenche o formulário da página de diagnóstico, coletamos:
          </p>
          <TabelaDados dados={DADOS_DIAGNOSTICO} />
        </Secao>

        <Secao titulo="Dados das pesquisas de expectativa de curso">
          <p>
            Quando você responde a uma pesquisa recebida por um link direto, coletamos:
          </p>
          <TabelaDados dados={DADOS_PESQUISA} />
          <p>
            Responder à pesquisa nunca exige login ou cadastro prévio. O e-mail é sempre o último
            campo, e é opcional.
          </p>
        </Secao>

        <Secao titulo="Dados de navegação no site">
          <TabelaDados dados={DADOS_NAVEGACAO} />
        </Secao>

        <Secao titulo="Com quem compartilhamos dados">
          <p>
            Não vendemos dados pessoais e não repassamos sua lista de contatos a terceiros para
            fins de marketing. Usamos os seguintes prestadores para operar o site e o atendimento,
            cada um só com o dado necessário à sua função:
          </p>
          <ul className="space-y-3">
            {TERCEIROS.map((terceiro) => (
              <li key={terceiro.nome}>
                <span className="font-display text-branco-frio">{terceiro.nome}</span>
                {" — "}
                {terceiro.papel}
              </li>
            ))}
          </ul>
        </Secao>

        <Secao titulo="Por quanto tempo guardamos">
          <p>
            Dados de contato (diagnóstico e pesquisa) ficam armazenados enquanto durar a relação
            comercial ou o interesse legítimo que justificou a coleta, e podem ser apagados a
            qualquer momento a seu pedido. Respostas de pesquisa podem ser excluídas
            individualmente pelo administrador, o que remove a resposta, os itens respondidos e o
            cadastro de lead vinculado.
          </p>
        </Secao>

        <Secao titulo="Como protegemos os dados">
          <p>
            O banco de dados roda em infraestrutura própria, sem exposição direta à internet:
            acesso só pela rede interna do servidor, nunca pelo navegador. Senhas de administrador
            são armazenadas com hash (argon2id), a sessão do painel usa cookie protegido contra
            leitura por script, e o IP de quem responde uma pesquisa nunca é guardado em texto
            puro — só um hash com salt.
          </p>
        </Secao>

        <Secao titulo="Seus direitos">
          <p>Nos termos do art. 18 da LGPD, você pode pedir a qualquer momento:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>confirmação de que tratamos algum dado seu, e acesso a esse dado;</li>
            <li>correção de dado incompleto, inexato ou desatualizado;</li>
            <li>anonimização, bloqueio ou eliminação de dado desnecessário ou excessivo;</li>
            <li>portabilidade dos dados a outro fornecedor;</li>
            <li>eliminação dos dados tratados com base no seu consentimento;</li>
            <li>informação sobre com quem compartilhamos seus dados;</li>
            <li>revogação do consentimento, a qualquer momento.</li>
          </ul>
          <p>
            Para exercer qualquer um desses direitos, escreva para{" "}
            <a href={`mailto:${empresa.email}`} className="text-azul-celeste hover:underline">
              {empresa.email}
            </a>
            . Respondemos em até 1 dia útil.
          </p>
        </Secao>

        <Secao titulo="Alterações desta política">
          <p>
            Este documento pode ser atualizado para refletir mudanças no site ou na legislação. A
            data no topo desta página sempre mostra a versão mais recente.
          </p>
        </Secao>
      </div>
    </article>
  );
}
