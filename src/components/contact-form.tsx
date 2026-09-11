"use client";

import { useRef, useState } from "react";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { Button as StatefulButton } from "@/components/ui/stateful-button";

type Status =
  | { state: "idle" }
  | { state: "success" }
  | { state: "error"; message: string };

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/40 focus:border-accent-text focus:outline-none focus:ring-1 focus:ring-accent-text";

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const whatsappHref = getWhatsAppLink();

  async function submit() {
    const form = formRef.current;
    if (!form || !form.reportValidity()) {
      throw new Error("validation");
    }

    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      message: data.get("message"),
      consent: data.get("consent") === "on",
    };

    setStatus({ state: "idle" });

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
      throw new Error(result.reason ?? "request_failed");
    }

    setStatus({ state: "success" });
    form.reset();
  }

  if (status.state === "success") {
    return (
      <p className="rounded-lg border border-accent-text/40 p-6 font-sans text-sm text-foreground">
        Mensagem enviada! Em breve entraremos em contato.
      </p>
    );
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

      <StatefulButton
        type="button"
        onClick={submit}
        className="px-8 py-3.5 text-sm tracking-wide"
      >
        Enviar mensagem
      </StatefulButton>

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
