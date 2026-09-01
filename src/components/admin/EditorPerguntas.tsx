"use client";

import { useEffect, useState, useTransition, type FormEvent } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import type { Pergunta } from "@/lib/db/schema";
import {
  atualizarPergunta,
  criarPergunta,
  excluirPergunta,
  reordenarPerguntas,
} from "@/app/admin/(protegido)/pesquisas/[id]/actions";

type Tipo = Pergunta["tipo"];

const TIPOS: { valor: Tipo; rotulo: string }[] = [
  { valor: "texto", rotulo: "Texto curto" },
  { valor: "textarea", rotulo: "Texto longo" },
  { valor: "unica", rotulo: "Escolha única" },
  { valor: "multipla", rotulo: "Múltipla escolha" },
  { valor: "escala", rotulo: "Escala" },
  { valor: "nps", rotulo: "NPS (0 a 10)" },
  { valor: "email", rotulo: "E-mail" },
  { valor: "telefone", rotulo: "Telefone" },
  { valor: "consentimento", rotulo: "Consentimento" },
];

const TIPOS_COM_OPCOES = new Set<Tipo>(["unica", "multipla"]);

interface OpcaoLista {
  valor: string;
  rotulo: string;
}

interface ConfigEscala {
  min?: number;
  max?: number;
  rotulo_min?: string;
  rotulo_max?: string;
}

function slugificar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function opcoesParaTexto(opcoes: unknown): string {
  if (!Array.isArray(opcoes)) return "";
  return (opcoes as OpcaoLista[]).map((opcao) => opcao.rotulo).join("\n");
}

function textoParaOpcoes(texto: string): OpcaoLista[] {
  return texto
    .split("\n")
    .map((linha) => linha.trim())
    .filter(Boolean)
    .map((rotulo) => ({ valor: slugificar(rotulo) || rotulo, rotulo }));
}

interface PerguntaRowProps {
  pesquisaId: string;
  pergunta: Pergunta;
  travaAtiva: boolean;
}

function PerguntaRow({ pesquisaId, pergunta, travaAtiva }: PerguntaRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: pergunta.id,
  });

  const [enunciado, setEnunciado] = useState(pergunta.enunciado);
  const [ajuda, setAjuda] = useState(pergunta.ajuda ?? "");
  const [obrigatoria, setObrigatoria] = useState(pergunta.obrigatoria);
  const [tipo, setTipo] = useState<Tipo>(pergunta.tipo);
  const [opcoesTexto, setOpcoesTexto] = useState(opcoesParaTexto(pergunta.opcoes));
  const [escala, setEscala] = useState<ConfigEscala>((pergunta.opcoes as ConfigEscala) ?? {});
  const [salvando, startSalvamento] = useTransition();
  const [excluindo, startExclusao] = useTransition();
  const [salvo, setSalvo] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  function salvar() {
    setSalvo(false);
    setErro(null);
    startSalvamento(async () => {
      const opcoes = TIPOS_COM_OPCOES.has(tipo)
        ? textoParaOpcoes(opcoesTexto)
        : tipo === "escala"
          ? escala
          : null;

      await atualizarPergunta(pesquisaId, pergunta.id, {
        enunciado,
        ajuda: ajuda.trim() || null,
        obrigatoria,
        tipo,
        opcoes,
      });
      setSalvo(true);
    });
  }

  function excluir() {
    if (!confirm("Excluir esta pergunta? Essa ação não pode ser desfeita.")) return;
    setErro(null);
    startExclusao(async () => {
      try {
        await excluirPergunta(pesquisaId, pergunta.id);
      } catch {
        setErro("Não consegui excluir. A pesquisa já tem resposta registrada.");
      }
    });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-card border border-branco-frio/[0.06] bg-surface-700 p-padding-card"
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          aria-label="Arrastar para reordenar"
          className="mt-2 cursor-grab touch-none text-cinza-prata hover:text-branco-frio active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="5" cy="4" r="1.2" fill="currentColor" />
            <circle cx="11" cy="4" r="1.2" fill="currentColor" />
            <circle cx="5" cy="8" r="1.2" fill="currentColor" />
            <circle cx="11" cy="8" r="1.2" fill="currentColor" />
            <circle cx="5" cy="12" r="1.2" fill="currentColor" />
            <circle cx="11" cy="12" r="1.2" fill="currentColor" />
          </svg>
        </button>

        <div className="flex flex-1 flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
            <Input
              label="Enunciado"
              value={enunciado}
              onChange={(event) => setEnunciado(event.target.value)}
            />
            <Select
              label="Tipo"
              value={tipo}
              disabled={travaAtiva}
              onChange={(event) => setTipo(event.target.value as Tipo)}
            >
              {TIPOS.map((item) => (
                <option key={item.valor} value={item.valor}>
                  {item.rotulo}
                </option>
              ))}
            </Select>
          </div>

          <Input
            label="Ajuda (opcional)"
            value={ajuda}
            disabled={travaAtiva}
            onChange={(event) => setAjuda(event.target.value)}
          />

          {TIPOS_COM_OPCOES.has(tipo) && (
            <Textarea
              label="Opções (uma por linha)"
              value={opcoesTexto}
              disabled={travaAtiva}
              onChange={(event) => setOpcoesTexto(event.target.value)}
              rows={4}
            />
          )}

          {tipo === "escala" && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Input
                label="Mínimo"
                type="number"
                value={escala.min ?? 1}
                disabled={travaAtiva}
                onChange={(event) =>
                  setEscala((atual) => ({ ...atual, min: Number(event.target.value) }))
                }
              />
              <Input
                label="Máximo"
                type="number"
                value={escala.max ?? 5}
                disabled={travaAtiva}
                onChange={(event) =>
                  setEscala((atual) => ({ ...atual, max: Number(event.target.value) }))
                }
              />
              <Input
                label="Rótulo mínimo"
                value={escala.rotulo_min ?? ""}
                disabled={travaAtiva}
                onChange={(event) =>
                  setEscala((atual) => ({ ...atual, rotulo_min: event.target.value }))
                }
              />
              <Input
                label="Rótulo máximo"
                value={escala.rotulo_max ?? ""}
                disabled={travaAtiva}
                onChange={(event) =>
                  setEscala((atual) => ({ ...atual, rotulo_max: event.target.value }))
                }
              />
            </div>
          )}

          <Checkbox
            label="Obrigatória"
            checked={obrigatoria}
            disabled={travaAtiva}
            onChange={(event) => setObrigatoria(event.target.checked)}
          />

          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={salvar}
              disabled={salvando}
              className="!min-h-0 !px-4 !py-2 !text-sm"
            >
              {salvando ? "Salvando..." : "Salvar"}
            </Button>
            {!travaAtiva && (
              <button
                type="button"
                onClick={excluir}
                disabled={excluindo}
                className="font-display text-sm text-erro hover:underline disabled:opacity-50"
              >
                {excluindo ? "Excluindo..." : "Excluir"}
              </button>
            )}
            {salvo && <span className="text-sm text-sucesso">Salvo.</span>}
            {erro && <span className="text-sm text-erro">{erro}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

interface EditorPerguntasProps {
  pesquisaId: string;
  perguntasIniciais: Pergunta[];
  travaAtiva: boolean;
}

export function EditorPerguntas({ pesquisaId, perguntasIniciais, travaAtiva }: EditorPerguntasProps) {
  const [perguntas, setPerguntas] = useState(perguntasIniciais);
  const [criando, startCriacao] = useTransition();
  const [, startReordenacao] = useTransition();

  // Servidor revalida a rota inteira após cada ação — sincroniza a lista
  // local com a nova prop, mas cada PerguntaRow mantém sua própria edição
  // em andamento porque o key={pergunta.id} preserva o componente.
  useEffect(() => {
    setPerguntas(perguntasIniciais);
  }, [perguntasIniciais]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  function aoTerminarArraste(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const indiceAntigo = perguntas.findIndex((pergunta) => pergunta.id === active.id);
    const indiceNovo = perguntas.findIndex((pergunta) => pergunta.id === over.id);
    const reordenadas = arrayMove(perguntas, indiceAntigo, indiceNovo);
    setPerguntas(reordenadas);

    startReordenacao(async () => {
      await reordenarPerguntas(
        pesquisaId,
        reordenadas.map((pergunta) => pergunta.id),
      );
    });
  }

  function adicionarPergunta(event: FormEvent) {
    event.preventDefault();
    startCriacao(async () => {
      await criarPergunta(pesquisaId);
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {travaAtiva && (
        <div className="rounded-card border border-atencao/30 bg-atencao/[0.08] p-4">
          <p className="font-display text-sm font-medium text-branco-frio">Edição travada</p>
          <p className="mt-1 text-sm text-cinza-prata">
            Esta pesquisa já tem respostas registradas. Para preservar o histórico, só é possível
            editar o enunciado das perguntas existentes e adicionar perguntas novas — não dá para
            apagar pergunta, trocar o tipo, a ajuda, a obrigatoriedade ou as opções.
          </p>
        </div>
      )}

      {perguntas.length === 0 ? (
        <p className="text-corpo-mobile text-cinza-prata">Nenhuma pergunta ainda.</p>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={aoTerminarArraste}>
          <SortableContext
            items={perguntas.map((pergunta) => pergunta.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-4">
              {perguntas.map((pergunta) => (
                <PerguntaRow
                  key={pergunta.id}
                  pesquisaId={pesquisaId}
                  pergunta={pergunta}
                  travaAtiva={travaAtiva}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <form onSubmit={adicionarPergunta}>
        <Button type="submit" variant="secondary" disabled={criando}>
          {criando ? "Adicionando..." : "Adicionar pergunta"}
        </Button>
      </form>
    </div>
  );
}
