"use client";

import { useRef, useState } from "react";
import { getWhatsAppLink, copyWhatsAppMessage } from "@/lib/whatsapp";
import { Button as StatefulButton } from "@/components/ui/stateful-button";

type Status = { state: "idle" } | { state: "error"; message: string };

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-accent-text focus:outline-none focus:ring-1 focus:ring-accent-text";

function buildWhatsAppMessage(fields: { name: string; phone: string; message: string }) {
  const lines = [
    `Olá! Meu nome é ${fields.name}.`,
    fields.phone && `Meu telefone: ${fields.phone}.`,
    fields.message,
  ].filter(Boolean);
  return lines.join(" ");
}

// Exportado como site estático (sem servidor Node no host) — o formulário não
// chama nenhuma API própria; ele monta a mensagem e abre o WhatsApp direto.
export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);

  async function submit() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) {
      throw new Error("validation");
    }

    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const consent = data.get("consent") === "on";

    if (!name || !message || !consent) {
      setStatus({
        state: "error",
        message: "Preencha nome e mensagem, e confirme o consentimento.",
      });
      throw new Error("validation");
    }

    const texto = buildWhatsAppMessage({ name, phone, message });
    copyWhatsAppMessage(texto);
    window.open(getWhatsAppLink(texto), "_blank", "noopener,noreferrer");
    form.reset();
    setStatus({ state: "idle" });
  }

  return (
    <form ref={formRef} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="sr-only">
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Seu nome"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="phone" className="sr-only">
          Telefone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="Seu telefone (opcional)"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          placeholder="Como podemos ajudar?"
          className={inputClasses}
        />
      </div>

      <label className="flex items-start gap-3 font-sans text-xs leading-relaxed text-foreground/70">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-border accent-accent-solid"
        />
        Concordo com o uso dos meus dados exclusivamente para retorno deste
        contato, conforme a LGPD.
      </label>

      <StatefulButton type="button" onClick={submit} className="px-8 py-3.5 text-sm tracking-wide">
        Enviar pelo WhatsApp
      </StatefulButton>
      <p className="font-sans text-xs text-foreground/45">
        Vamos abrir o WhatsApp com sua mensagem copiada — se não colar sozinha, é só apertar
        Ctrl+V (ou ⌘V) no campo de texto.
      </p>

      {status.state === "error" && (
        <p className="font-sans text-sm text-foreground/80">{status.message}</p>
      )}
    </form>
  );
}
