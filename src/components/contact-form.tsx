"use client";

import { useState, type FormEvent } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";

type Status = { state: "idle" } | { state: "error"; message: string };

const inputClasses =
  "w-full rounded-lg border border-cream-line bg-cream px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-soft/40 focus:border-bronze focus:outline-none focus:ring-1 focus:ring-bronze";

function buildWhatsAppMessage(fields: {
  name: string;
  phone: string;
  message: string;
}) {
  const lines = [
    `Olá! Meu nome é ${fields.name}.`,
    fields.phone && `Meu telefone: ${fields.phone}.`,
    fields.message,
  ].filter(Boolean);
  return lines.join(" ");
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
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
      return;
    }

    const whatsappHref = getWhatsAppLink(buildWhatsAppMessage({ name, phone, message }));

    if (!whatsappHref) {
      setStatus({
        state: "error",
        message: "Agendamento indisponível no momento. Tente novamente mais tarde.",
      });
      return;
    }

    window.open(whatsappHref, "_blank", "noopener,noreferrer");
    form.reset();
    setStatus({ state: "idle" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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

      <label className="flex items-start gap-3 font-sans text-xs leading-relaxed text-ink-soft/70">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-cream-line accent-bronze"
        />
        Concordo com o uso dos meus dados exclusivamente para retorno deste
        contato, conforme a LGPD.
      </label>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-bronze px-8 py-3.5 text-sm font-medium tracking-wide text-surface-dark transition-colors duration-300 hover:bg-bronze-light"
      >
        Enviar pelo WhatsApp
      </button>

      {status.state === "error" && (
        <p className="font-sans text-sm text-ink-soft/80">{status.message}</p>
      )}
    </form>
  );
}
