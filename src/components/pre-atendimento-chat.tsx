"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getWhatsAppLink, copyWhatsAppMessage } from "@/lib/whatsapp";

// DEMONSTRATIVO — mesma lista ilustrativa usada em treatments.tsx; a lista
// oficial de tratamentos será confirmada com a clínica (ver PENDENCIAS.md).
const INTERESSES_DEMONSTRATIVOS = [
  "Harmonização facial",
  "Bioestimuladores de colágeno",
  "Preenchimento facial",
  "Toxina botulínica",
  "Protocolos de skincare",
  "Avaliação personalizada",
];

const OPCOES_PRAZO = [
  "O quanto antes",
  "Nos próximos dias",
  "Nas próximas semanas",
  "Estou apenas pesquisando",
];

const OPCOES_TEMPO_PROCEDIMENTO = ["Menos de 6 meses", "Entre 6 meses e 1 ano", "Mais de 1 ano"];

const PALAVRAS_ALERTA = [
  "dor",
  "reaç",
  "reac",
  "complicaç",
  "complicac",
  "urgen",
  "infecç",
  "infecc",
  "alergia",
  "sangr",
  "inchaç",
  "inchac",
  "emergên",
  "emergen",
  "piorou",
  "piorando",
];

function contemAlerta(texto: string) {
  const t = texto.toLowerCase();
  return PALAVRAS_ALERTA.some((p) => t.includes(p));
}

type Msg = { role: "bot" | "user"; text: string };

type Respostas = {
  nome: string;
  interesse: string;
  objetivo: string;
  jaRealizou: string;
  tempoProcedimento: string;
  prazo: string;
  cidade: string;
};

type Step =
  | "intro"
  | "nome"
  | "interesse"
  | "objetivo"
  | "ja_realizou"
  | "tempo_procedimento"
  | "prazo"
  | "cidade"
  | "alerta"
  | "resumo";

function montarMensagem(r: Respostas) {
  return [
    `Olá, meu nome é ${r.nome} e tenho interesse no procedimento ${r.interesse}.`,
    "",
    `Objetivo: ${r.objetivo}`,
    `Quando pretendo realizar: ${r.prazo}`,
    "",
    "Gostaria de continuar meu atendimento.",
  ].join("\n");
}

const MENSAGEM_ALERTA =
  "Olá! Estou com uma dúvida após um procedimento e gostaria de falar com a equipe.";

function Bubble({ role, text }: Msg) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn("flex", role === "user" ? "justify-end" : "justify-start")}
    >
      <p
        className={cn(
          "rounded-2xl px-5 py-3 text-sm leading-relaxed break-words sm:text-base",
          role === "bot"
            ? "max-w-[85%] border border-border bg-foreground/[0.04] text-foreground sm:max-w-[78%]"
            : "max-w-[85%] bg-accent-solid text-accent-solid-foreground sm:max-w-[72%]",
        )}
      >
        {text}
      </p>
    </motion.div>
  );
}

function ChipButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-foreground/25 px-5 py-2.5 text-sm font-medium tracking-wide text-foreground transition-colors duration-300 hover:border-accent-text hover:text-accent-text"
    >
      {children}
    </button>
  );
}

function TextComposer({
  value,
  onChange,
  onSubmit,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  placeholder: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="flex flex-col gap-2 sm:flex-row"
    >
      <input
        autoFocus
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-foreground/25 bg-transparent px-5 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:border-accent-text focus:outline-none sm:flex-1"
      />
      <button
        type="submit"
        className="w-full rounded-full bg-accent-solid px-6 py-3 text-sm font-medium text-accent-solid-foreground transition-opacity hover:opacity-90 sm:w-auto"
      >
        Enviar
      </button>
    </form>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-medium tracking-[0.15em] text-foreground/50 uppercase">
        {label}
      </dt>
      <dd className="mt-1 text-base font-medium text-foreground">{value}</dd>
    </div>
  );
}

export function PreAtendimentoChat() {
  const [step, setStep] = useState<Step>("intro");
  const [messages, setMessages] = useState<Msg[]>([]);
  const [respostas, setRespostas] = useState<Respostas>({
    nome: "",
    interesse: "",
    objetivo: "",
    jaRealizou: "",
    tempoProcedimento: "",
    prazo: "",
    cidade: "",
  });
  const [outroInteresse, setOutroInteresse] = useState(false);
  const [rascunho, setRascunho] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, step, reducedMotion]);

  function addBot(texts: string[]) {
    setMessages((m) => [...m, ...texts.map((text) => ({ role: "bot" as const, text }))]);
  }
  function addUser(text: string) {
    setMessages((m) => [...m, { role: "user" as const, text }]);
  }

  function iniciar() {
    setMessages([
      { role: "bot", text: "Oi! Seja bem-vinda à Barbara Branches. ✨" },
      {
        role: "bot",
        text: "Posso fazer algumas perguntas rápidas para entender melhor o que você procura?",
      },
      { role: "bot", text: "Leva menos de 2 minutos." },
      { role: "bot", text: "Antes de começar, como posso te chamar?" },
    ]);
    setStep("nome");
  }

  function enviarNome(texto: string) {
    if (!texto.trim()) return;
    addUser(texto);
    setRespostas((r) => ({ ...r, nome: texto }));
    setRascunho("");
    addBot([`Prazer, ${texto}! O que você gostaria de melhorar hoje?`]);
    setStep("interesse");
  }

  function escolherInteresse(op: string) {
    if (!op.trim()) return;
    addUser(op);
    setRespostas((r) => ({ ...r, interesse: op }));
    setRascunho("");
    setOutroInteresse(false);
    addBot(["E o que você gostaria de perceber diferente?"]);
    setStep("objetivo");
  }

  function enviarObjetivo(texto: string) {
    if (!texto.trim()) return;
    addUser(texto);
    setRespostas((r) => ({ ...r, objetivo: texto }));
    setRascunho("");
    if (contemAlerta(texto)) {
      addBot(["Essa situação precisa de atendimento da nossa equipe."]);
      setStep("alerta");
      return;
    }
    addBot(["Você já realizou algum procedimento nessa região?"]);
    setStep("ja_realizou");
  }

  function escolherJaRealizou(op: "Sim" | "Não") {
    addUser(op);
    setRespostas((r) => ({ ...r, jaRealizou: op }));
    if (op === "Sim") {
      addBot(["Faz aproximadamente quanto tempo?"]);
      setStep("tempo_procedimento");
    } else {
      addBot(["Quando você pensa em fazer sua avaliação?"]);
      setStep("prazo");
    }
  }

  function escolherTempoProcedimento(op: string) {
    addUser(op);
    setRespostas((r) => ({ ...r, tempoProcedimento: op }));
    addBot(["Quando você pensa em fazer sua avaliação?"]);
    setStep("prazo");
  }

  function escolherPrazo(op: string) {
    addUser(op);
    setRespostas((r) => ({ ...r, prazo: op }));
    addBot(["Em qual cidade ou bairro você mora?"]);
    setStep("cidade");
  }

  function enviarCidade(texto: string) {
    if (!texto.trim()) return;
    addUser(texto);
    setRespostas((r) => ({ ...r, cidade: texto }));
    setRascunho("");
    addBot(["Perfeito. ✨", "Já consegui organizar seu pré-atendimento."]);
    setStep("resumo");
  }

  const completed = step === "resumo" || step === "alerta";

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

      {step === "intro" ? (
        <section className="flex min-h-[70svh] flex-col items-start justify-center gap-6 pb-16">
          <p className="font-sans text-xs font-medium tracking-[0.35em] text-accent-text uppercase">
            Pré-atendimento
          </p>
          <h1 className="font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl">
            Oi! Seja bem-vinda à Barbara Branches. ✨
          </h1>
          <div className="flex flex-col gap-2">
            <p className="max-w-md font-sans text-base leading-relaxed text-foreground/70">
              Posso fazer algumas perguntas rápidas para entender melhor o que você procura?
            </p>
            <p className="font-sans text-sm text-foreground/50">Leva menos de 2 minutos.</p>
          </div>
          <button
            type="button"
            onClick={iniciar}
            className="inline-flex items-center justify-center rounded-full bg-accent-solid px-10 py-4 text-sm font-medium tracking-wide text-accent-solid-foreground transition-opacity duration-300 hover:opacity-90"
          >
            Começar
          </button>
        </section>
      ) : (
        // ConversationViewport: fluxo normal do documento, sem altura fixa,
        // sem position: sticky/absolute — cada bloco participa do flow e
        // empurra o próximo para baixo, evitando qualquer sobreposição.
        <section className="flex flex-col gap-6 pb-16">
          <div className="flex flex-col gap-4 sm:gap-5">
            {messages.map((m, i) => (
              <Bubble key={i} role={m.role} text={m.text} />
            ))}
          </div>

          {!completed && (
            <div className="flex flex-col gap-3">
              {step === "nome" && (
                <TextComposer
                  value={rascunho}
                  onChange={setRascunho}
                  onSubmit={() => enviarNome(rascunho)}
                  placeholder="Seu nome"
                />
              )}

              {step === "interesse" && (
                <>
                  <div className="flex flex-wrap gap-2.5">
                    {INTERESSES_DEMONSTRATIVOS.map((op) => (
                      <ChipButton key={op} onClick={() => escolherInteresse(op)}>
                        {op}
                      </ChipButton>
                    ))}
                    <ChipButton onClick={() => setOutroInteresse(true)}>Outro</ChipButton>
                  </div>
                  {outroInteresse && (
                    <TextComposer
                      value={rascunho}
                      onChange={setRascunho}
                      onSubmit={() => escolherInteresse(rascunho)}
                      placeholder="Conte com suas palavras…"
                    />
                  )}
                  <p className="text-xs italic text-foreground/45">
                    Opções demonstrativas — a lista oficial de tratamentos será confirmada com a
                    clínica.
                  </p>
                </>
              )}

              {step === "objetivo" && (
                <TextComposer
                  value={rascunho}
                  onChange={setRascunho}
                  onSubmit={() => enviarObjetivo(rascunho)}
                  placeholder="Ex.: pele com mais viço, contorno mais natural…"
                />
              )}

              {step === "ja_realizou" && (
                <div className="flex flex-wrap gap-2.5">
                  <ChipButton onClick={() => escolherJaRealizou("Sim")}>Sim</ChipButton>
                  <ChipButton onClick={() => escolherJaRealizou("Não")}>Não</ChipButton>
                </div>
              )}

              {step === "tempo_procedimento" && (
                <div className="flex flex-wrap gap-2.5">
                  {OPCOES_TEMPO_PROCEDIMENTO.map((op) => (
                    <ChipButton key={op} onClick={() => escolherTempoProcedimento(op)}>
                      {op}
                    </ChipButton>
                  ))}
                </div>
              )}

              {step === "prazo" && (
                <div className="flex flex-wrap gap-2.5">
                  {OPCOES_PRAZO.map((op) => (
                    <ChipButton key={op} onClick={() => escolherPrazo(op)}>
                      {op}
                    </ChipButton>
                  ))}
                </div>
              )}

              {step === "cidade" && (
                <TextComposer
                  value={rascunho}
                  onChange={setRascunho}
                  onSubmit={() => enviarCidade(rascunho)}
                  placeholder="Cidade ou bairro"
                />
              )}
            </div>
          )}

          {step === "alerta" && (
            <a
              href={getWhatsAppLink(MENSAGEM_ALERTA)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => copyWhatsAppMessage(MENSAGEM_ALERTA)}
              className="inline-flex items-center justify-center self-start rounded-full bg-accent-solid px-8 py-4 text-sm font-medium tracking-wide text-accent-solid-foreground transition-opacity duration-300 hover:opacity-90"
            >
              Continuar no WhatsApp
            </a>
          )}

          {step === "resumo" && (
            <div className="flex flex-col gap-6">
              <div className="rounded-[22px] border border-border bg-foreground/[0.03] p-7 sm:p-8">
                <p className="mb-1 font-sans text-xs font-medium tracking-[0.3em] text-accent-text uppercase">
                  Resumo
                </p>
                <p className="mb-6 font-display text-xl tracking-wide text-foreground">
                  Seu pré-atendimento
                </p>
                <dl className="flex flex-col gap-5">
                  <SummaryRow label="Nome" value={respostas.nome} />
                  <SummaryRow label="Interesse" value={respostas.interesse} />
                  <SummaryRow label="Objetivo" value={respostas.objetivo} />
                  <SummaryRow
                    label="Já realizou procedimento"
                    value={
                      respostas.tempoProcedimento
                        ? `${respostas.jaRealizou} — ${respostas.tempoProcedimento}`
                        : respostas.jaRealizou
                    }
                  />
                  <SummaryRow label="Quando pretende realizar" value={respostas.prazo} />
                  {respostas.cidade && (
                    <SummaryRow label="Cidade / bairro" value={respostas.cidade} />
                  )}
                </dl>
              </div>

              <div className="flex flex-col items-start gap-4">
                <p className="font-sans text-sm text-foreground/70">
                  Seu pré-atendimento está pronto.
                </p>
                <a
                  href={getWhatsAppLink(montarMensagem(respostas))}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => copyWhatsAppMessage(montarMensagem(respostas))}
                  className="inline-flex items-center justify-center rounded-full bg-accent-solid px-8 py-4 text-sm font-medium tracking-wide text-accent-solid-foreground transition-opacity duration-300 hover:opacity-90"
                >
                  Continuar atendimento no WhatsApp
                </a>
                <p className="text-xs text-foreground/45">
                  Copiamos seu resumo — se não colar sozinho no WhatsApp, é só apertar Ctrl+V
                  (ou ⌘V).
                </p>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </section>
      )}
    </div>
  );
}
