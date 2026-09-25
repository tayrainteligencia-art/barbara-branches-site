import type { Metadata } from "next";
import Link from "next/link";

// MODELO — pendente de revisão jurídica antes da publicação definitiva (ver
// banner abaixo e PENDENCIAS.md). Texto genérico para clínica de saúde/estética,
// cobrindo LGPD; dados de contato usam apenas informações já confirmadas.
export const metadata: Metadata = {
  title: "Política de Privacidade",
  robots: { index: false, follow: true },
};

const ATUALIZADO_EM = "24 de setembro de 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border py-10">
      <h2 className="font-display text-xl tracking-wide text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 space-y-4 font-sans text-sm leading-relaxed text-foreground/70">
        {children}
      </div>
    </section>
  );
}

export default function PoliticaDePrivacidadePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pt-28 pb-24 sm:px-10">
      {/* pt-28: espaço para a navbar flutuante fixa, que não reserva espaço no fluxo. */}
      <header className="pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.3em] text-foreground/50 uppercase transition-colors hover:text-accent-text"
        >
          ← Voltar ao site
        </Link>
      </header>

      <div className="rounded-2xl border border-dashed border-accent-text/50 bg-accent-text/[0.06] p-6">
        <p className="font-sans text-sm font-medium tracking-wide text-foreground">
          Este texto é um modelo gerado automaticamente e ainda não foi revisado por um
          advogado.
        </p>
        <p className="mt-2 font-sans text-sm leading-relaxed text-foreground/70">
          Ele cobre os pontos padrão de uma política de privacidade para clínica de saúde
          sob a LGPD, mas não deve ser publicado como versão definitiva sem validação
          jurídica e sem preencher os dados ainda pendentes (ver <code>PENDENCIAS.md</code>
          no repositório do site): encarregado de dados (DPO), horário de funcionamento e
          eventual ferramenta de analytics/cookies de terceiros.
        </p>
      </div>

      <div className="mt-10">
        <p className="font-sans text-xs font-medium tracking-[0.35em] text-accent-text uppercase">
          Política de Privacidade
        </p>
        <h1 className="mt-3 font-display text-3xl leading-[1.2] tracking-wide text-foreground sm:text-4xl">
          Como cuidamos dos seus dados
        </h1>
        <p className="mt-4 font-sans text-sm text-foreground/50">
          Última atualização: {ATUALIZADO_EM}
        </p>
      </div>

      <Section title="1. Quem somos">
        <p>
          Este site é mantido por Nuclear Center Clínica de Diagnósticos por Imagens LTDA
          (nome fantasia Nuclear Center), CNPJ 10.913.454/0001-07, com sede na Rua Mauriti,
          2159 — Pedreira, Belém - PA, CEP 66087-680, responsável pelos tratamentos e
          conteúdos divulgados sob a marca Bárbara Branches.
        </p>
      </Section>

      <Section title="2. Quais dados coletamos">
        <p>Coletamos dados que você mesma nos fornece diretamente, em três situações:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground/85">Formulário de contato:</strong> nome,
            e-mail, telefone (opcional) e o conteúdo da sua mensagem.
          </li>
          <li>
            <strong className="text-foreground/85">Pré-atendimento pelo site:</strong> nome
            e as respostas que você escolhe compartilhar (interesse, objetivo, prazo e
            cidade), usadas para preparar seu atendimento.
          </li>
          <li>
            <strong className="text-foreground/85">WhatsApp:</strong> quando você inicia uma
            conversa pelo botão do site, o conteúdo trocado fica na própria plataforma do
            WhatsApp, sujeito à política de privacidade da Meta.
          </li>
        </ul>
        <p>
          Não usamos, no momento, nenhuma ferramenta de analytics ou pixel de rastreamento
          neste site.
        </p>
      </Section>

      <Section title="3. Para que usamos esses dados">
        <ul className="list-disc space-y-2 pl-5">
          <li>Responder ao seu contato e dar continuidade ao atendimento;</li>
          <li>Organizar e agilizar sua avaliação/consulta;</li>
          <li>Cumprir obrigações legais e regulatórias aplicáveis a clínicas de saúde.</li>
        </ul>
        <p>Não usamos seus dados para fins diferentes dos informados aqui.</p>
      </Section>

      <Section title="4. Com quem compartilhamos">
        <p>
          Seus dados podem ser processados por prestadores que nos ajudam a operar o site e
          o atendimento — por exemplo, o serviço de envio de e-mail do formulário de contato
          e o próprio WhatsApp/Meta, quando você opta por continuar a conversa por lá. Não
          vendemos nem compartilhamos seus dados com terceiros para fins de marketing.
        </p>
      </Section>

      <Section title="5. Dados sensíveis de saúde">
        <p>
          Informações sobre procedimentos, condições de pele ou histórico de saúde que você
          compartilhe no pré-atendimento ou no formulário são tratadas como dados sensíveis
          (art. 11 da LGPD), usadas exclusivamente para preparar seu atendimento e nunca para
          fins publicitários ou de terceiros.
        </p>
      </Section>

      <Section title="6. Cookies">
        <p>
          O site usa apenas cookies/armazenamento local técnicos, necessários para lembrar
          sua preferência de tema claro/escuro. Nenhum cookie de rastreamento ou publicidade
          está ativo hoje; se isso mudar no futuro, esta política será atualizada e um aviso
          de cookies será adicionado, conforme exigido pela LGPD.
        </p>
      </Section>

      <Section title="7. Base legal e seus direitos">
        <p>
          Tratamos seus dados com base no seu consentimento, dado ao preencher o formulário
          ou o pré-atendimento (art. 7º, I, LGPD). Você pode, a qualquer momento:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Confirmar se tratamos dados seus e pedir uma cópia deles;</li>
          <li>Corrigir dados incompletos ou desatualizados;</li>
          <li>Pedir a exclusão dos seus dados;</li>
          <li>Revogar seu consentimento a qualquer momento.</li>
        </ul>
        <p>
          Para exercer esses direitos, use os canais listados na seção &quot;Contato&quot;
          abaixo.
        </p>
      </Section>

      <Section title="8. Retenção e segurança">
        <p>
          Guardamos seus dados apenas pelo tempo necessário para a finalidade que motivou a
          coleta ou pelo prazo exigido por lei, e adotamos medidas técnicas e organizacionais
          razoáveis para protegê-los contra acesso não autorizado.
        </p>
      </Section>

      <Section title="9. Encarregado de dados (DPO)">
        <p className="italic text-foreground/50">
          TODO — nome e contato do encarregado de dados a confirmar antes da publicação
          definitiva.
        </p>
      </Section>

      <Section title="10. Alterações desta política">
        <p>
          Podemos atualizar este texto para refletir mudanças no site ou na legislação. A
          data no topo desta página sempre indica a versão mais recente.
        </p>
      </Section>

      <Section title="11. Contato">
        <p>Dúvidas sobre esta política ou sobre seus dados podem ser enviadas para:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>E-mail: atendimento@drabarbarabranches.com.br</li>
          <li>WhatsApp: pelo botão flutuante disponível no site</li>
          <li>Endereço: Rua Mauriti, 2159 — Pedreira, Belém - PA, CEP 66087-680</li>
        </ul>
      </Section>
    </div>
  );
}
