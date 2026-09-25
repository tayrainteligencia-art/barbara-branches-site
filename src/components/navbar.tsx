"use client";

import Image from "next/image";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { ThemeToggle } from "@/components/theme-toggle";
import { getWhatsAppLink } from "@/lib/whatsapp";

const navItems = [
  { name: "Sobre", link: "#sobre" },
  { name: "Tratamentos", link: "#tratamentos" },
  { name: "Estrutura", link: "#estrutura" },
  { name: "FAQ", link: "#faq" },
  { name: "Contato", link: "#contato" },
];

export function Navbar() {
  const whatsappHref = getWhatsAppLink();

  return (
    <FloatingNav
      navItems={navItems}
      cta={{
        name: "Agendar",
        link: whatsappHref ?? "#contato",
        external: Boolean(whatsappHref),
      }}
      brand={
        <a href="#" aria-label="Bárbara Branches — início" className="shrink-0 pl-1">
          <Image
            src="/brand/icon.webp"
            alt=""
            width={28}
            height={28}
            className="h-7 w-7 object-contain"
          />
        </a>
      }
      end={<ThemeToggle />}
    />
  );
}
