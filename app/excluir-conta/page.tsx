"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X, AlertTriangle, CheckCircle, Mail, Clock, Trash2, ShieldAlert } from "lucide-react";

/* ─── Intersection Observer hook ─── */
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Design System Colors ─── */
const DS = {
  greenPrimary: "#2E7D32",
  greenVibrant: "#4CAF50",
  yellowWarning: "#FFB300",
  redAlert: "#E53935",
  bgApp: "#F8F9FA",
  cardDark: "#101828",
  textPrimary: "#1A1A1A",
  textSecondary: "#667085",
};

const SUPPORT_EMAIL = "blwdevs@gmail.com";

export default function ExcluirConta() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [motivo, setMotivo] = useState("");
  const [fallback, setFallback] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assunto = encodeURIComponent("Solicitação de exclusão de conta - Cultiva.ai");
    const corpo = encodeURIComponent(
      `Olá, equipe Cultiva.ai,\n\nGostaria de solicitar a exclusão da minha conta e de todos os meus dados pessoais do aplicativo Cultiva.ai.\n\nDados do solicitante:\n- Nome completo: ${nome}\n- E-mail da conta: ${email}${motivo ? `\n- Motivo: ${motivo}` : ""}\n\nAguardo a confirmação do recebimento e a conclusão do processo em até 30 dias.\n\nAtenciosamente,\n${nome}`
    );

    const mailtoUrl = `mailto:${SUPPORT_EMAIL}?subject=${assunto}&body=${corpo}`;

    // Tenta abrir o cliente de email; usa fallback se a janela não abrir
    const link = document.createElement("a");
    link.href = mailtoUrl;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Mostra fallback após um pequeno delay (caso o mailto não seja suportado)
    const timer = setTimeout(() => {
      setFallback(true);
    }, 800);

    setSubmitted(true);

    return () => clearTimeout(timer);
  };

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: DS.bgApp }}>
      {/* ═══════ NAVBAR ═══════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(248,249,250,0.97)" : "rgba(16,24,40,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: scrolled ? "0 1px 12px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <a href="/" className="relative h-[42px] w-[160px] block">
            <img
              src="/logoBranca.svg"
              alt="Cultiva.ai"
              className="absolute inset-0 h-full w-auto object-contain transition-opacity duration-300"
              style={{ opacity: scrolled ? 0 : 1 }}
            />
            <img
              src="/logoVerde.svg"
              alt="Cultiva.ai"
              className="absolute inset-0 h-full w-auto object-contain transition-opacity duration-300"
              style={{ opacity: scrolled ? 1 : 0 }}
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Funcionalidades", href: "/#funcionalidades" },
              { label: "Como Funciona", href: "/#como-funciona" },
              { label: "Depoimentos", href: "/#depoimentos" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: scrolled ? DS.textSecondary : "rgba(255,255,255,0.85)" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="/"
              className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-105 flex items-center"
              style={{
                background: DS.greenPrimary,
                height: "48px",
                boxShadow: "0 4px 14px rgba(46,125,50,0.25)",
              }}
            >
              Voltar ao site
            </a>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? DS.textPrimary : "white" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div
            className="md:hidden px-4 pb-4"
            style={{ background: "white", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
          >
            {[
              { label: "Funcionalidades", href: "/#funcionalidades" },
              { label: "Como Funciona", href: "/#como-funciona" },
              { label: "Depoimentos", href: "/#depoimentos" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-sm font-medium border-b"
                style={{ color: DS.textSecondary, borderColor: "#f1f1f1" }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/"
              className="mt-4 w-full rounded-full text-sm font-bold text-white flex items-center justify-center"
              style={{ background: DS.greenPrimary, height: "48px" }}
              onClick={() => setMenuOpen(false)}
            >
              Voltar ao site
            </a>
          </div>
        )}
      </nav>

      {/* ═══════ HERO BANNER ═══════ */}
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${DS.cardDark} 0%, #1a2a1e 50%, #1c3a20 100%)`,
        }}
      >
        {/* Background glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{ background: DS.redAlert }}
        />

        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: "rgba(229,57,53,0.15)", color: "#ef9a9a", border: "1px solid rgba(229,57,53,0.3)" }}
          >
            <AlertTriangle size={14} />
            Ação irreversível
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Exclusão de conta e dados
          </h1>
          <p className="text-lg" style={{ color: "rgba(255,255,255,0.65)" }}>
            Solicite a remoção completa da sua conta e dados pessoais do{" "}
            <span style={{ color: DS.greenVibrant }}>Cultiva.ai</span>
          </p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[60px]">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill={DS.bgApp} />
          </svg>
        </div>
      </section>

      {/* ═══════ INFO CARDS ═══════ */}
      <section className="py-12 max-w-3xl mx-auto px-4">
        <AnimatedSection>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                icon: <Trash2 size={20} />,
                color: DS.redAlert,
                bg: "rgba(229,57,53,0.08)",
                border: "rgba(229,57,53,0.2)",
                title: "Dados excluídos",
                desc: "Perfil, histórico de conversas, imagens enviadas e dados agronômicos",
              },
              {
                icon: <Clock size={20} />,
                color: DS.yellowWarning,
                bg: "rgba(255,179,0,0.08)",
                border: "rgba(255,179,0,0.2)",
                title: "Prazo de até 30 dias",
                desc: "Após a confirmação da solicitação, o processo é concluído em até 30 dias",
              },
              {
                icon: <ShieldAlert size={20} />,
                color: DS.greenVibrant,
                bg: "rgba(76,175,80,0.08)",
                border: "rgba(76,175,80,0.2)",
                title: "Logs retidos por 90 dias",
                desc: "Registros de acesso podem ser mantidos por até 90 dias por segurança",
              },
            ].map((card, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div
                  className="rounded-2xl p-5 h-full"
                  style={{
                    background: card.bg,
                    border: `1px solid ${card.border}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: card.border, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: DS.textPrimary }}>
                    {card.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: DS.textSecondary }}>
                    {card.desc}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* ─── What gets deleted ─── */}
        <AnimatedSection delay={100}>
          <div
            className="rounded-2xl p-6 mb-8"
            style={{
              background: "white",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-lg font-bold mb-4" style={{ color: DS.textPrimary }}>
              O que é excluído?
            </h2>
            <p className="text-sm mb-4" style={{ color: DS.textSecondary }}>
              Ao solicitar a exclusão da conta no <strong>Cultiva.ai</strong>, os seguintes dados são permanentemente removidos dos nossos servidores:
            </p>
            <ul className="space-y-2">
              {[
                "Perfil do usuário (nome, e-mail, telefone e foto)",
                "Histórico completo de conversas com o assistente de IA",
                "Imagens e arquivos enviados pelo usuário",
                "Dados agronômicos cadastrados (safras, talhões, atividades, estoque)",
                "Notas fiscais importadas e associadas à conta",
                "Dados de colaboradores vinculados à conta",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: DS.textSecondary }}>
                  <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: DS.greenVibrant }} />
                  {item}
                </li>
              ))}
            </ul>
            <div
              className="mt-4 rounded-xl p-4 text-sm"
              style={{ background: "rgba(255,179,0,0.08)", border: "1px solid rgba(255,179,0,0.2)", color: "#92680a" }}
            >
              <strong>Atenção:</strong> registros de acesso e logs de segurança podem ser retidos por até{" "}
              <strong>90 dias</strong> após a exclusão, conforme exigência de segurança, e então são eliminados automaticamente.
            </div>
          </div>
        </AnimatedSection>

        {/* ─── Form ─── */}
        <AnimatedSection delay={150}>
          <div
            className="rounded-2xl p-6 mb-8"
            style={{
              background: "white",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-lg font-bold mb-1" style={{ color: DS.textPrimary }}>
              Solicitar exclusão
            </h2>
            <p className="text-sm mb-6" style={{ color: DS.textSecondary }}>
              Preencha o formulário abaixo. Ao enviar, seu cliente de e-mail será aberto com uma mensagem
              pré-preenchida para <strong>{SUPPORT_EMAIL}</strong>.
            </p>

            {submitted && !fallback ? (
              /* Success state — waiting for mailto to open */
              <div
                className="rounded-xl p-5 flex items-start gap-3"
                style={{ background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.25)" }}
              >
                <Mail size={20} className="mt-0.5 shrink-0" style={{ color: DS.greenVibrant }} />
                <div>
                  <p className="font-semibold text-sm mb-1" style={{ color: DS.greenPrimary }}>
                    Seu cliente de e-mail foi aberto!
                  </p>
                  <p className="text-sm" style={{ color: DS.textSecondary }}>
                    Verifique se o e-mail foi aberto e confirme o envio. Caso não tenha aberto,{" "}
                    <button
                      onClick={() => setFallback(true)}
                      className="underline font-medium hover:opacity-80"
                      style={{ color: DS.greenPrimary }}
                    >
                      clique aqui para ver as instruções manuais
                    </button>
                    .
                  </p>
                </div>
              </div>
            ) : submitted && fallback ? (
              /* Fallback instructions */
              <FallbackInstructions nome={nome} email={email} motivo={motivo} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="nome"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: DS.textPrimary }}
                  >
                    Nome completo <span style={{ color: DS.redAlert }}>*</span>
                  </label>
                  <input
                    id="nome"
                    type="text"
                    required
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      border: "1.5px solid #e2e8f0",
                      color: DS.textPrimary,
                      background: DS.bgApp,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = DS.greenVibrant)}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: DS.textPrimary }}
                  >
                    E-mail da conta cadastrada no app <span style={{ color: DS.redAlert }}>*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    style={{
                      border: "1.5px solid #e2e8f0",
                      color: DS.textPrimary,
                      background: DS.bgApp,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = DS.greenVibrant)}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="motivo"
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: DS.textPrimary }}
                  >
                    Motivo da exclusão{" "}
                    <span className="font-normal text-xs" style={{ color: DS.textSecondary }}>
                      (opcional)
                    </span>
                  </label>
                  <textarea
                    id="motivo"
                    rows={3}
                    value={motivo}
                    onChange={(e) => setMotivo(e.target.value)}
                    placeholder="Conte-nos o motivo, se desejar..."
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                    style={{
                      border: "1.5px solid #e2e8f0",
                      color: DS.textPrimary,
                      background: DS.bgApp,
                    }}
                    onFocus={(e) => (e.target.style.borderColor = DS.greenVibrant)}
                    onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                  />
                </div>

                <div
                  className="rounded-xl p-4 text-sm flex items-start gap-2"
                  style={{ background: "rgba(229,57,53,0.06)", border: "1px solid rgba(229,57,53,0.18)", color: "#b71c1c" }}
                >
                  <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                  <span>
                    Esta ação é <strong>permanente e irreversível</strong>. Todos os seus dados serão excluídos
                    e não será possível recuperá-los.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-[1.01] flex items-center justify-center gap-2"
                  style={{
                    background: DS.redAlert,
                    height: "52px",
                    boxShadow: "0 4px 14px rgba(229,57,53,0.3)",
                  }}
                >
                  <Trash2 size={16} />
                  Solicitar exclusão da conta
                </button>
              </form>
            )}
          </div>
        </AnimatedSection>

        {/* ─── Process timeline ─── */}
        <AnimatedSection delay={200}>
          <div
            className="rounded-2xl p-6"
            style={{
              background: "white",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            <h2 className="text-lg font-bold mb-5" style={{ color: DS.textPrimary }}>
              Como funciona o processo?
            </h2>
            <ol className="space-y-5">
              {[
                {
                  step: "1",
                  title: "Envie a solicitação",
                  desc: "Preencha e envie o formulário acima. Você receberá a mensagem pré-preenchida no seu cliente de e-mail.",
                },
                {
                  step: "2",
                  title: "Confirmação de recebimento",
                  desc: `Nossa equipe confirma o recebimento em até 3 dias úteis pelo e-mail ${SUPPORT_EMAIL}.`,
                },
                {
                  step: "3",
                  title: "Exclusão concluída",
                  desc: "Todos os dados são permanentemente removidos em até 30 dias após a confirmação. Logs de acesso são eliminados em até 90 dias.",
                },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{ background: DS.greenPrimary }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: DS.textPrimary }}>
                      {item.title}
                    </p>
                    <p className="text-sm" style={{ color: DS.textSecondary }}>
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </AnimatedSection>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="py-12 text-white" style={{ background: DS.cardDark }}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <img src="/logoVerde.svg" alt="Cultiva.ai" className="h-10" />
            </div>

            <p className="text-sm text-center" style={{ color: DS.textSecondary }}>
              © 2026 Cultiva.ai · Desenvolvido por{" "}
              <span style={{ color: DS.greenVibrant }}>BLW devs</span>
            </p>

            <div className="flex gap-6 text-sm" style={{ color: DS.textSecondary }}>
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeuY-iZ7DYq_h2qeSKSPOSsY150KV7Wb66NHaMpwiO4MZM7OQ/viewform?usp=publish-editor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Contato
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─── Fallback component shown when mailto doesn't open ─── */
function FallbackInstructions({
  nome,
  email,
  motivo,
}: {
  nome: string;
  email: string;
  motivo: string;
}) {
  const [copied, setCopied] = useState(false);

  const emailBody = `Olá, equipe Cultiva.ai,

Gostaria de solicitar a exclusão da minha conta e de todos os meus dados pessoais do aplicativo Cultiva.ai.

Dados do solicitante:
- Nome completo: ${nome}
- E-mail da conta: ${email}${motivo ? `\n- Motivo: ${motivo}` : ""}

Aguardo a confirmação do recebimento e a conclusão do processo em até 30 dias.

Atenciosamente,
${nome}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(emailBody).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="space-y-4">
      <div
        className="rounded-xl p-4 flex items-start gap-3"
        style={{ background: "rgba(76,175,80,0.08)", border: "1px solid rgba(76,175,80,0.25)" }}
      >
        <CheckCircle size={18} className="mt-0.5 shrink-0" style={{ color: "#2E7D32" }} />
        <p className="text-sm" style={{ color: "#1b5e20" }}>
          <strong>Solicitação pronta!</strong> Como seu cliente de e-mail não abriu automaticamente,
          envie um e-mail manualmente seguindo as instruções abaixo.
        </p>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <p className="font-medium mb-1" style={{ color: "#1A1A1A" }}>Destinatário</p>
          <code
            className="block px-3 py-2 rounded-lg text-xs"
            style={{ background: "#F8F9FA", border: "1px solid #e2e8f0", color: "#1A1A1A" }}
          >
            {SUPPORT_EMAIL}
          </code>
        </div>
        <div>
          <p className="font-medium mb-1" style={{ color: "#1A1A1A" }}>Assunto</p>
          <code
            className="block px-3 py-2 rounded-lg text-xs"
            style={{ background: "#F8F9FA", border: "1px solid #e2e8f0", color: "#1A1A1A" }}
          >
            Solicitação de exclusão de conta - Cultiva.ai
          </code>
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <p className="font-medium" style={{ color: "#1A1A1A" }}>Corpo do e-mail</p>
            <button
              onClick={copyToClipboard}
              className="text-xs font-semibold px-3 py-1 rounded-full transition-all hover:opacity-80"
              style={{
                background: copied ? "rgba(76,175,80,0.12)" : "rgba(46,125,50,0.1)",
                color: copied ? "#2E7D32" : "#2E7D32",
                border: "1px solid rgba(46,125,50,0.25)",
              }}
            >
              {copied ? "Copiado!" : "Copiar texto"}
            </button>
          </div>
          <pre
            className="px-3 py-3 rounded-lg text-xs leading-relaxed whitespace-pre-wrap"
            style={{ background: "#F8F9FA", border: "1px solid #e2e8f0", color: "#667085" }}
          >
            {emailBody}
          </pre>
        </div>
      </div>
    </div>
  );
}
