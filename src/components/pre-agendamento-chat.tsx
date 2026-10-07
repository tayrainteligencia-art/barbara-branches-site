"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getWhatsAppLink } from "@/lib/whatsapp";
import {
  DIAS,
  PROCEDIMENTO,
  TURNOS,
  type DiaId,
  type Disponibilidade,
  type TurnoId,
  formatarCpf,
  formatarDisponibilidade,
  formatarTelefone,
  montarMensagem,
  normalizarCpf,
  normalizarTelefone,
  validarCpf,
  validarDisponibilidade,
  validarNome,
  validarTelefone,
} from "@/lib/validacao-agendamento";

// Dados pessoais (nome, telefone, CPF) ficam SOMENTE no estado deste
// componente: nada em storage, cookies, URL, console ou analytics. Eles saem
// do navegador apenas na mensagem que a própria pessoa envia pelo WhatsApp.

const MENSAGEM_PACIENTE = "Olá! Já sou paciente e preciso de ajuda.";

// Abre o WhatsApp em nova aba já com a mensagem preenchida. Chamado direto no
// clique (gesto do usuário), então não é barrado como pop-up. O link é montado
// só na hora: CPF e telefone não ficam em nenhum atributo do DOM.
function abrirWhatsApp(mensagem: string) {
  window.open(getWhatsAppLink(mensagem), "_blank", "noopener,noreferrer");
}

const ORDEM = ["nome", "telefone", "cpf", "disponibilidade"] as const;
type Campo = (typeof ORDEM)[number];
type CampoTexto = Exclude<Campo, "disponibilidade">;
type Step = "intro" | Campo | "resumo" | "enviado";

type Respostas = { nome: string; telefone: string; cpf: string } & Disponibilidade;

const VAZIO: Respostas = { nome: "", telefone: "", cpf: "", dias: [], turnos: [] };

function mensagemDe({ nome, telefone, cpf, dias, turnos }: Respostas) {
  return montarMensagem({ nome, telefone, cpf, disponibilidade: { dias, turnos } });
}

const PERGUNTAS: Record<Campo, string> = {
  nome: "Para começar, qual é o seu nome completo?",
  telefone: "Qual número de telefone ou WhatsApp a equipe pode usar para falar com você?",
  cpf: "Qual é o seu CPF?",
  disponibilidade: "Em quais dias e turnos você tem disponibilidade?",
};

const CAMPOS_TEXTO: Record<
  CampoTexto,
  {
    label: string;
    placeholder: string;
    inputMode?: "numeric";
    autoComplete: string;
    type: "text" | "tel";
    normalizar: (v: string) => string;
    exibir: (v: string) => string;
    validar: (v: string) => { ok: true; valor: string } | { ok: false; erro: string };
  }
> = {
  nome: {
    label: "Nome completo",
    placeholder: "Nome e sobrenome",
    autoComplete: "name",
    type: "text",
    normalizar: (v) => v,
    exibir: (v) => v,
    validar: validarNome,
  },
  telefone: {
    label: "Telefone ou WhatsApp com DDD",
    placeholder: "(91) 98888-7777",
    inputMode: "numeric",
    autoComplete: "tel",
    type: "tel",
    normalizar: normalizarTelefone,
    exibir: formatarTelefone,
    validar: validarTelefone,
  },
  cpf: {
    label: "CPF",
    placeholder: "000.000.000-00",
    inputMode: "numeric",
    autoComplete: "off",
    type: "text",
    normalizar: normalizarCpf,
    exibir: formatarCpf,
    validar: validarCpf,
  },
};

function respostaExibida(campo: Campo, r: Respostas) {
  if (campo === "disponibilidade") return formatarDisponibilidade(r);
  return CAMPOS_TEXTO[campo].exibir(r[campo]);
}

const botaoPrimario =
  "inline-flex items-center justify-center rounded-full bg-accent-solid px-8 py-4 text-sm font-medium tracking-wide text-accent-solid-foreground transition-opacity duration-300 hover:opacity-90";
const botaoTexto =
  "text-xs font-medium tracking-[0.2em] text-foreground/55 uppercase underline-offset-4 transition-colors hover:text-accent-text hover:underline";
const linkPaciente =
  "text-sm text-foreground/60 underline underline-offset-4 transition-colors hover:text-accent-text";

function Bubble({ role, children }: { role: "bot" | "user"; children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  return (
    // Estado inicial e final sempre explícitos: com reduced-motion o hook
    // devolve false no primeiro render, e omitir props deixaria a bolha presa.
    <motion.div
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
      className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
    >
      <p
        className={cn(
          "max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed break-words sm:text-base",
          role === "bot"
            ? "border border-border bg-foreground/[0.04] text-foreground sm:max-w-[78%]"
            : "bg-accent-solid text-accent-solid-foreground sm:max-w-[72%]",
        )}
      >
        {children}
      </p>
    </motion.div>
  );
}

function MensagemErro({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="text-sm font-medium text-accent-text">
      {children}
    </p>
  );
}

function Chip({
  checked,
  onChange,
  inputRef,
  children,
}: {
  checked: boolean;
  onChange: () => void;
  inputRef?: React.Ref<HTMLInputElement>;
  children: React.ReactNode;
}) {
  return (
    <label className="cursor-pointer">
      <input
        ref={inputRef}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span className="inline-flex rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors duration-300 peer-checked:border-accent-solid peer-checked:bg-accent-solid peer-checked:text-accent-solid-foreground peer-focus-visible:ring-2 peer-focus-visible:ring-accent-text peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background hover:border-accent-text">
        {children}
      </span>
    </label>
  );
}

function alternar<T>(lista: T[], item: T) {
  return lista.includes(item) ? lista.filter((i) => i !== item) : [...lista, item];
}

export function PreAgendamentoChat() {
  const [step, setStep] = useState<Step>("intro");
  const [editando, setEditando] = useState(false);
  const [respostas, setRespostas] = useState<Respostas>(VAZIO);
  const [rascunhos, setRascunhos] = useState<Record<CampoTexto, string>>({
    nome: "",
    telefone: "",
    cpf: "",
  });
  const [selecao, setSelecao] = useState<Disponibilidade>({ dias: [], turnos: [] });
  const [erro, setErro] = useState<string | null>(null);
  const [consentimento, setConsentimento] = useState(false);
  const [erroConsentimento, setErroConsentimento] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const primeiroDiaRef = useRef<HTMLInputElement>(null);
  const primeiroTurnoRef = useRef<HTMLInputElement>(null);
  const consentimentoRef = useRef<HTMLInputElement>(null);
  const focoRef = useRef<HTMLHeadingElement>(null);
  const passoAnterior = useRef<Step>(step);

  // Ao trocar de etapa, leva o foco (e a rolagem) para o que importa nela.
  // Compara com a etapa anterior para não roubar o foco no carregamento
  // (nem no efeito duplicado do StrictMode).
  useEffect(() => {
    if (passoAnterior.current === step) return;
    passoAnterior.current = step;
    const alvo =
      step === "nome" || step === "telefone" || step === "cpf"
        ? inputRef.current
        : step === "disponibilidade"
          ? primeiroDiaRef.current
          : focoRef.current;
    if (!alvo) return;
    alvo.focus({ preventScroll: true });
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    alvo.scrollIntoView({ block: "center", behavior: reduzir ? "auto" : "smooth" });
  }, [step]);

  function irPara(proximo: Step) {
    setErro(null);
    if (proximo === "nome" || proximo === "telefone" || proximo === "cpf") {
      // Reabre a etapa com a resposta já dada (Voltar/Editar não perde nada).
      setRascunhos((r) => ({ ...r, [proximo]: respostas[proximo] || r[proximo] }));
    }
    if (proximo === "disponibilidade" && respostas.dias.length) {
      setSelecao({ dias: respostas.dias, turnos: respostas.turnos });
    }
    setStep(proximo);
  }

  function seguirDepoisDe(campo: Campo) {
    if (editando) {
      setEditando(false);
      irPara("resumo");
      return;
    }
    const i = ORDEM.indexOf(campo);
    irPara(i === ORDEM.length - 1 ? "resumo" : ORDEM[i + 1]);
  }

  function enviarTexto(campo: CampoTexto) {
    const r = CAMPOS_TEXTO[campo].validar(rascunhos[campo]);
    if (!r.ok) {
      setErro(r.erro);
      inputRef.current?.focus();
      return;
    }
    setRespostas((prev) => ({ ...prev, [campo]: r.valor }));
    seguirDepoisDe(campo);
  }

  function enviarDisponibilidade() {
    const r = validarDisponibilidade(selecao);
    if (!r.ok) {
      setErro(r.erro);
      (selecao.dias.length ? primeiroTurnoRef : primeiroDiaRef).current?.focus();
      return;
    }
    setRespostas((prev) => ({ ...prev, ...r.valor }));
    seguirDepoisDe("disponibilidade");
  }

  function voltar() {
    if (editando) {
      // Cancela a edição: descarta o rascunho e volta ao resumo.
      setEditando(false);
      irPara("resumo");
      return;
    }
    if (step === "resumo") return irPara("disponibilidade");
    const i = ORDEM.indexOf(step as Campo);
    irPara(i <= 0 ? "intro" : ORDEM[i - 1]);
  }

  function editar(campo: Campo) {
    setEditando(true);
    irPara(campo);
  }

  function recomecar() {
    setRespostas(VAZIO);
    setRascunhos({ nome: "", telefone: "", cpf: "" });
    setSelecao({ dias: [], turnos: [] });
    setConsentimento(false);
    setErroConsentimento(false);
    setEditando(false);
    irPara("intro");
  }

  function enviar() {
    if (!consentimento) {
      setErroConsentimento(true);
      consentimentoRef.current?.focus();
      return;
    }
    abrirWhatsApp(mensagemDe(respostas));
    irPara("enviado");
  }

  const mensagem = mensagemDe(respostas);
  const descricaoDisponibilidade = erro
    ? "dica-disponibilidade erro-disponibilidade"
    : "dica-disponibilidade";
  const campoAtual = (ORDEM as readonly string[]).includes(step) ? (step as Campo) : null;
  const respondidos = campoAtual ? ORDEM.slice(0, ORDEM.indexOf(campoAtual)) : [];

  const linkJaSouPaciente = (
    <a
      href={getWhatsAppLink(MENSAGEM_PACIENTE)}
      target="_blank"
      rel="noopener noreferrer"
      className={linkPaciente}
    >
      Já sou paciente e preciso de ajuda
    </a>
  );

  return (
    <div className="mx-auto w-full max-w-[680px] px-4 pt-28 sm:px-6">
      {/* pt-28 dá espaço para a navbar flutuante fixa (top-6, ~54px de
      altura), que não reserva espaço no fluxo do documento. */}
      <header className="pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-foreground/50 uppercase transition-colors hover:text-accent-text"
        >
          ← Voltar ao site
        </Link>
      </header>

      {step === "intro" && (
        <section className="flex min-h-[70svh] flex-col items-start justify-center gap-6 pb-16">
          <p className="font-sans text-xs font-medium tracking-[0.35em] text-accent-text uppercase">
            Pré-agendamento
          </p>
          <h1
            ref={focoRef}
            tabIndex={-1}
            className="font-display text-3xl leading-[1.2] tracking-wide text-foreground focus:outline-none sm:text-4xl"
          >
            Boas-vindas à Barbara Branches.
          </h1>
          <div className="flex max-w-md flex-col gap-3">
            <p className="font-sans text-base leading-relaxed text-foreground/70">
              Solicite um horário para a sua avaliação. Vamos pedir seu nome, telefone, CPF e
              os dias e turnos em que você tem disponibilidade.
            </p>
            <p className="font-sans text-sm leading-relaxed text-foreground/55">
              Isto é uma solicitação: o horário só fica marcado depois que a equipe
              confirmar com você pelo WhatsApp.
            </p>
          </div>
          <button type="button" onClick={() => irPara("nome")} className={cn(botaoPrimario, "px-10")}>
            Começar
          </button>
          {linkJaSouPaciente}
        </section>
      )}

      {campoAtual && (
        // ConversationViewport: fluxo normal do documento, sem altura fixa,
        // sem position: sticky/absolute — cada bloco empurra o próximo.
        <section className="flex flex-col gap-6 pb-16">
          <h1 className="sr-only">Pré-agendamento</h1>
          <div className="flex flex-col gap-4 sm:gap-5">
            {respondidos.map((c) => (
              <div key={c} className="flex flex-col gap-4 sm:gap-5">
                <Bubble role="bot">{PERGUNTAS[c]}</Bubble>
                <Bubble role="user">{respostaExibida(c, respostas)}</Bubble>
              </div>
            ))}
            <Bubble key={`${campoAtual}-pergunta`} role="bot">
              {PERGUNTAS[campoAtual]}
            </Bubble>
          </div>

          {campoAtual === "disponibilidade" ? (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                enviarDisponibilidade();
              }}
              className="flex flex-col gap-5"
            >
              <fieldset aria-describedby={descricaoDisponibilidade}>
                <legend className="mb-3 text-xs font-medium tracking-[0.2em] text-foreground/55 uppercase">
                  Dias da semana
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {DIAS.map((dia, i) => (
                    <Chip
                      key={dia.id}
                      inputRef={i === 0 ? primeiroDiaRef : undefined}
                      checked={selecao.dias.includes(dia.id)}
                      onChange={() =>
                        setSelecao((s) => ({ ...s, dias: alternar<DiaId>(s.dias, dia.id) }))
                      }
                    >
                      {dia.nome}
                    </Chip>
                  ))}
                </div>
              </fieldset>
              <fieldset aria-describedby={descricaoDisponibilidade}>
                <legend className="mb-3 text-xs font-medium tracking-[0.2em] text-foreground/55 uppercase">
                  Turnos
                </legend>
                <div className="flex flex-wrap gap-2.5">
                  {TURNOS.map((turno, i) => (
                    <Chip
                      key={turno.id}
                      inputRef={i === 0 ? primeiroTurnoRef : undefined}
                      checked={selecao.turnos.includes(turno.id)}
                      onChange={() =>
                        setSelecao((s) => ({
                          ...s,
                          turnos: alternar<TurnoId>(s.turnos, turno.id),
                        }))
                      }
                    >
                      <span className="capitalize">{turno.nome}</span>
                    </Chip>
                  ))}
                </div>
              </fieldset>
              <p id="dica-disponibilidade" className="text-xs text-foreground/50">
                Escolha pelo menos um dia e um turno. A equipe confirma o horário pelo WhatsApp.
              </p>
              {erro && <MensagemErro id="erro-disponibilidade">{erro}</MensagemErro>}
              <button type="submit" className={cn(botaoPrimario, "self-start px-6 py-3")}>
                {editando ? "Salvar" : "Continuar"}
              </button>
            </form>
          ) : (
            <form
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                enviarTexto(campoAtual);
              }}
              className="flex flex-col gap-2"
            >
              <label htmlFor={`campo-${campoAtual}`} className="sr-only">
                {CAMPOS_TEXTO[campoAtual].label}
              </label>
              <div className="flex flex-col gap-2 sm:flex-row">
                <input
                  key={campoAtual}
                  ref={inputRef}
                  id={`campo-${campoAtual}`}
                  type={CAMPOS_TEXTO[campoAtual].type}
                  inputMode={CAMPOS_TEXTO[campoAtual].inputMode}
                  autoComplete={CAMPOS_TEXTO[campoAtual].autoComplete}
                  spellCheck={false}
                  value={CAMPOS_TEXTO[campoAtual].exibir(rascunhos[campoAtual])}
                  onChange={(e) => {
                    const valor = CAMPOS_TEXTO[campoAtual].normalizar(e.target.value);
                    setRascunhos((r) => ({ ...r, [campoAtual]: valor }));
                  }}
                  placeholder={CAMPOS_TEXTO[campoAtual].placeholder}
                  aria-invalid={erro ? true : undefined}
                  aria-describedby={erro ? `erro-${campoAtual}` : undefined}
                  className="w-full rounded-full border border-foreground/25 bg-transparent px-5 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent-text focus:outline-none aria-invalid:border-accent-text sm:flex-1"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-accent-solid px-6 py-3 text-sm font-medium text-accent-solid-foreground transition-opacity hover:opacity-90 sm:w-auto"
                >
                  {editando ? "Salvar" : "Continuar"}
                </button>
              </div>
              {erro && <MensagemErro id={`erro-${campoAtual}`}>{erro}</MensagemErro>}
            </form>
          )}

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" onClick={voltar} className={botaoTexto}>
              ← {editando ? "Cancelar edição" : "Voltar"}
            </button>
            <button type="button" onClick={recomecar} className={botaoTexto}>
              Recomeçar
            </button>
          </div>
        </section>
      )}

      {step === "resumo" && (
        <section className="flex flex-col gap-6 pb-16">
          <div className="rounded-[22px] border border-border bg-foreground/[0.03] p-7 sm:p-8">
            <p className="mb-1 font-sans text-xs font-medium tracking-[0.3em] text-accent-text uppercase">
              Resumo
            </p>
            <h1
              ref={focoRef}
              tabIndex={-1}
              className="mb-6 font-display text-xl tracking-wide text-foreground focus:outline-none"
            >
              Revise sua solicitação
            </h1>
            <dl className="flex flex-col gap-5">
              {(
                [
                  ["nome", "Nome"],
                  ["telefone", "Telefone"],
                  ["cpf", "CPF"],
                ] as const
              ).map(([campo, rotulo]) => (
                <LinhaResumo
                  key={campo}
                  rotulo={rotulo}
                  valor={respostaExibida(campo, respostas)}
                  onEditar={() => editar(campo)}
                />
              ))}
              <LinhaResumo rotulo="Procedimento" valor={PROCEDIMENTO} />
              <LinhaResumo
                rotulo="Disponibilidade"
                valor={respostaExibida("disponibilidade", respostas)}
                onEditar={() => editar("disponibilidade")}
              />
            </dl>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-sans text-sm leading-relaxed text-foreground/70">
              Ao enviar, seu <strong className="font-medium text-foreground">nome</strong>,{" "}
              <strong className="font-medium text-foreground">telefone</strong> e{" "}
              <strong className="font-medium text-foreground">CPF</strong>, junto com a
              disponibilidade informada, vão para a clínica pela conversa do WhatsApp. A clínica
              usa esses dados apenas para entrar em contato com você e confirmar o
              pré-agendamento. Saiba mais na{" "}
              <Link
                href="/politica-de-privacidade"
                className="text-accent-text underline underline-offset-4"
              >
                Política de Privacidade
              </Link>
              .
            </p>
            <label className="flex items-start gap-3 font-sans text-sm leading-relaxed text-foreground/80">
              <input
                ref={consentimentoRef}
                type="checkbox"
                checked={consentimento}
                onChange={(e) => {
                  setConsentimento(e.target.checked);
                  setErroConsentimento(false);
                }}
                aria-invalid={erroConsentimento ? true : undefined}
                aria-describedby={erroConsentimento ? "erro-consentimento" : undefined}
                className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-accent-solid"
              />
              Li o aviso acima e concordo com o uso dos meus dados para esta finalidade,
              conforme a LGPD.
            </label>
            {erroConsentimento && (
              <MensagemErro id="erro-consentimento">
                Para enviar, confirme que concorda com o uso dos seus dados.
              </MensagemErro>
            )}

            <button type="button" onClick={enviar} className={cn(botaoPrimario, "self-start")}>
              Enviar pelo WhatsApp
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <button type="button" onClick={voltar} className={botaoTexto}>
              ← Voltar
            </button>
            <button type="button" onClick={recomecar} className={botaoTexto}>
              Recomeçar
            </button>
          </div>
          {linkJaSouPaciente}
        </section>
      )}

      {step === "enviado" && (
        <section className="flex min-h-[50svh] flex-col items-start justify-center gap-6 pb-16">
          <h1
            ref={focoRef}
            tabIndex={-1}
            className="font-display text-2xl leading-[1.3] tracking-wide text-foreground focus:outline-none sm:text-3xl"
          >
            Solicitação enviada. A equipe confirma o horário pelo WhatsApp.
          </h1>
          <p className="max-w-md font-sans text-sm leading-relaxed text-foreground/60">
            Se a conversa não abriu, use o botão abaixo.
          </p>
          <button type="button" onClick={() => abrirWhatsApp(mensagem)} className={botaoPrimario}>
            Abrir o WhatsApp novamente
          </button>
          <button type="button" onClick={recomecar} className={botaoTexto}>
            Recomeçar
          </button>
        </section>
      )}
    </div>
  );
}

function LinhaResumo({
  rotulo,
  valor,
  onEditar,
}: {
  rotulo: string;
  valor: string;
  onEditar?: () => void;
}) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-[0.15em] text-foreground/50 uppercase">
        {rotulo}
      </dt>
      <dd className="mt-1 flex items-start justify-between gap-4">
        <span className="min-w-0 text-base font-medium break-words text-foreground">{valor}</span>
        {onEditar && (
          <button
            type="button"
            onClick={onEditar}
            aria-label={`Editar ${rotulo}`}
            className="shrink-0 pt-0.5 text-xs font-medium tracking-[0.15em] text-accent-text uppercase underline-offset-4 hover:underline"
          >
            Editar
          </button>
        )}
      </dd>
    </div>
  );
}
