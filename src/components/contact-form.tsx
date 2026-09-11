"use client";

import { useState, type FormEvent } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";

type Status =
  | { state: "idle" }
  | { state: "submitting" }
  | { state: "success" }
  | { state: "error"; message: string };

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-accent-text focus:outline-none focus:ring-1 focus:ring-accent-text";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const whatsappHref = getWhatsAppLink();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
    };

    setStatus({ state: "submitting" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        setStatus({
          state: "error",
          message: result.message ?? "Não foi possível enviar sua mensagem.",
        });
        return;
      }

      setStatus({ state: "success" });
      form.reset();
    } catch {
      setStatus({
        state: "error",
        message: "Não foi possível enviar sua mensagem. Tente novamente.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <p className="rounded-lg border border-accent-text/40 p-6 font-sans text-sm text-foreground">
        Mensagem enviada! Em breve entraremos em contato.
      </p>
    );
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
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="sr-only">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Seu e-mail"
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

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-accent-solid px-8 py-3.5 text-sm font-medium tracking-wide text-accent-solid-foreground transition-opacity duration-300 hover:opacity-90 disabled:opacity-60"
      >
        {status.state === "submitting" ? "Enviando..." : "Enviar mensagem"}
      </button>

      {status.state === "error" && (
        <p className="font-sans text-sm text-foreground/80">
          {status.message}
          {whatsappHref && (
            <>
              {" "}
              Prefere falar direto?{" "}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-text underline"
              >
                Fale pelo WhatsApp
              </a>
              .
            </>
          )}
        </p>
      )}
    </form>
  );
}
