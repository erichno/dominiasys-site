"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { Curso, Pesquisa } from "@/lib/db/schema";
import { atualizarPesquisa } from "@/app/admin/(protegido)/pesquisas/[id]/actions";

const STATUS_ROTULOS: Record<Pesquisa["status"], string> = {
  rascunho: "Rascunho",
  ativa: "Ativa",
  encerrada: "Encerrada",
};

interface EditorCabecalhoProps {
  pesquisa: Pesquisa;
  cursos: Curso[];
}

export function EditorCabecalho({ pesquisa, cursos }: EditorCabecalhoProps) {
  const [titulo, setTitulo] = useState(pesquisa.titulo);
  const [descricao, setDescricao] = useState(pesquisa.descricao ?? "");
  const [cursoId, setCursoId] = useState(pesquisa.cursoId ?? "");
  const [status, setStatus] = useState<Pesquisa["status"]>(pesquisa.status);
  const [mensagemFinal, setMensagemFinal] = useState(pesquisa.mensagemFinal ?? "");
  const [salvando, startTransition] = useTransition();
  const [salvo, setSalvo] = useState(false);

  function salvar() {
    setSalvo(false);
    startTransition(async () => {
      await atualizarPesquisa(pesquisa.id, {
        titulo,
        descricao: descricao.trim() || null,
        cursoId: cursoId || null,
        status,
        mensagemFinal: mensagemFinal.trim() || null,
      });
      setSalvo(true);
    });
  }

  return (
    <Card className="hover:translate-y-0 hover:border-branco-frio/[0.06] hover:shadow-none">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input label="Título" value={titulo} onChange={(event) => setTitulo(event.target.value)} />
        <Select
          label="Status"
          value={status}
          onChange={(event) => setStatus(event.target.value as Pesquisa["status"])}
        >
          {Object.entries(STATUS_ROTULOS).map(([valor, rotulo]) => (
            <option key={valor} value={valor}>
              {rotulo}
            </option>
          ))}
        </Select>
        <Select
          label="Curso vinculado (opcional)"
          value={cursoId}
          onChange={(event) => setCursoId(event.target.value)}
        >
          <option value="">Nenhum</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.titulo}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-4">
        <Textarea
          label="Descrição"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          rows={2}
        />
      </div>

      <div className="mt-4">
        <Textarea
          label="Mensagem final (tela de obrigado)"
          value={mensagemFinal}
          onChange={(event) => setMensagemFinal(event.target.value)}
          rows={2}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button
          type="button"
          onClick={salvar}
          disabled={salvando}
          className="!min-h-0 !px-6 !py-2.5"
        >
          {salvando ? "Salvando..." : "Salvar"}
        </Button>
        {salvo && <span className="text-sm text-sucesso">Salvo.</span>}
      </div>
    </Card>
  );
}
