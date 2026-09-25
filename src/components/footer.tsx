import Image from "next/image";
import { getWhatsAppLink } from "@/lib/whatsapp";

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "Tratamentos", href: "#tratamentos" },
  { label: "Profissional", href: "#profissional" },
  { label: "Estrutura", href: "#estrutura" },
  { label: "Perguntas frequentes", href: "#faq" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  const whatsappHref = getWhatsAppLink();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border pt-16 pb-8">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-3">
          <div>
            <Image
              src="/brand/logo-full.webp"
              alt="Bárbara Branches"
              width={180}
              height={120}
              className="h-auto w-36 object-contain"
            />
            <p className="mt-4 max-w-xs font-sans text-sm leading-relaxed text-foreground/55">
              Beleza, ciência e harmonia em cada etapa do seu cuidado.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-xs font-medium tracking-[0.25em] text-accent-text uppercase">
              Navegação
            </h3>
            <ul className="mt-4 space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-sm text-foreground/65 transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-medium tracking-[0.25em] text-accent-text uppercase">
              Contato
            </h3>
            <ul className="mt-4 space-y-2 font-sans text-sm text-foreground/65">
              {whatsappHref ? (
                <li>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : (
                <li className="italic text-foreground/40">WhatsApp — a confirmar</li>
              )}
              <li>
                <a
                  href="mailto:atendimento@drabarbarabranches.com.br"
                  className="break-all transition-colors hover:text-foreground"
                >
                  atendimento@drabarbarabranches.com.br
                </a>
              </li>
              <li className="italic text-foreground/40">Redes sociais — em breve</li>
              <li>
                <a
                  href="/politica-de-privacidade"
                  className="transition-colors hover:text-foreground"
                >
                  Política de Privacidade
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col flex-wrap gap-2 border-t border-border pt-6 font-sans text-xs text-foreground/40 sm:flex-row sm:items-center sm:justify-between sm:gap-x-6">
          <p>© {year} Bárbara Branches. Todos os direitos reservados.</p>
          <p>Nuclear Center — CNPJ 10.913.454/0001-07 · CRM 6831</p>
        </div>
      </div>
    </footer>
  );
}
