import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const to = process.env.CONTACT_EMAIL_TO;

  if (!apiKey || !from || !to) {
    return NextResponse.json(
      {
        ok: false,
        reason: "not_configured",
        message:
          "O envio por e-mail ainda não foi configurado. Fale com a clínica pelo WhatsApp.",
      },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json(
      { ok: false, reason: "invalid_body", message: "Dados inválidos." },
      { status: 400 },
    );
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const message = String(body.message ?? "").trim();
  const consent = Boolean(body.consent);

  if (!name || !email || !message || !consent || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      {
        ok: false,
        reason: "validation_error",
        message: "Preencha nome, e-mail e mensagem, e confirme o consentimento.",
      },
      { status: 422 },
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Novo contato pelo site — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\nTelefone: ${phone || "não informado"}\n\nMensagem:\n${message}`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      {
        ok: false,
        reason: "provider_error",
        message: "Não foi possível enviar sua mensagem agora. Tente pelo WhatsApp.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
