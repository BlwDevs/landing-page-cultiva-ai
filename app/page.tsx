"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mic,
  FileText,
  Users,
  Package,
  Sprout,
  Zap,
  ChevronRight,
  CheckCircle,
  Star,
  Menu,
  X,
  Phone,
  ArrowRight,
  MessageCircle,
  Shield,
  TrendingUp,
} from "lucide-react";

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
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ctaClick = () => {
    document.getElementById("cta-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "#a8d520" }}
            >
              <Sprout size={16} className="text-white" />
            </div>
            <span
              className="font-bold text-xl"
              style={{ color: scrolled ? "#1a3a1a" : "white" }}
            >
              cultiva<span style={{ color: "#a8d520" }}>.ai</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Funcionalidades", href: "#funcionalidades" },
              { label: "Como Funciona", href: "#como-funciona" },
              { label: "Depoimentos", href: "#depoimentos" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium transition-colors"
                style={{ color: scrolled ? "#374151" : "rgba(255,255,255,0.9)" }}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={ctaClick}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-gray-900 transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "#a8d520" }}
            >
              Quero testar o app
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: scrolled ? "#1a3a1a" : "white" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white px-4 pb-4 shadow-lg">
            {[
              { label: "Funcionalidades", href: "#funcionalidades" },
              { label: "Como Funciona", href: "#como-funciona" },
              { label: "Depoimentos", href: "#depoimentos" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-3 text-sm font-medium text-gray-700 border-b border-gray-100"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                ctaClick();
                setMenuOpen(false);
              }}
              className="mt-4 w-full py-3 rounded-full text-sm font-bold text-gray-900"
              style={{ background: "#a8d520" }}
            >
              Quero testar o app
            </button>
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0f2a0f 0%, #1a4a1a 40%, #2d6a2d 100%)",
        }}
      >
        {/* Glow blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20"
            style={{ background: "#a8d520", filter: "blur(80px)" }}
          />
          <div
            className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-10"
            style={{ background: "#a8d520", filter: "blur(120px)" }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 pt-24 pb-16 grid md:grid-cols-2 gap-12 items-center">
          {/* ── Left: copy ── */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{
                background: "rgba(168, 213, 32, 0.15)",
                color: "#a8d520",
                border: "1px solid rgba(168,213,32,0.3)",
              }}
            >
              <Zap size={12} />
              IA baseada na EMBRAPA
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
              Da nota fiscal ao{" "}
              <span className="gradient-text">manejo:</span>
              <br />
              tudo no mesmo{" "}
              <span className="gradient-text">lugar!</span>
            </h1>

            <p
              className="text-xl md:text-2xl font-light mt-4 mb-8"
              style={{ color: "rgba(255,255,255,0.8)" }}
            >
              Do áudio à decisão: o agro nunca foi tão simples.
            </p>

            <p className="text-base mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
              Gerencie safras, colaboradores, estoque e atividades de manejo com
              seu assistente de IA que responde por áudio e nunca dorme.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={ctaClick}
                className="group flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-black text-gray-900 transition-all hover:scale-105 hover:shadow-2xl glow-animation"
                style={{ background: "#a8d520" }}
              >
                Quero testar o app
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
              <button
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white transition-all hover:bg-white/10"
                style={{ border: "2px solid rgba(255,255,255,0.3)" }}
              >
                <MessageCircle size={18} />
                Ver demo
              </button>
            </div>

            <div className="mt-10 flex items-center gap-6">
              <div className="flex -space-x-2">
                {["A", "B", "C", "D"].map((l, i) => (
                  <div
                    key={l}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: `hsl(${100 + i * 20}, 45%, 35%)` }}
                  >
                    {l}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={12} fill="#a8d520" color="#a8d520" />
                  ))}
                </div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
                  +500 produtores já testaram
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: phone mockup ── */}
          <div className="flex justify-center md:justify-end">
            <div className="relative float-animation">
              {/* Phone shell */}
              <div
                className="relative w-64 md:w-72 rounded-[3rem] overflow-hidden"
                style={{
                  background: "#000",
                  border: "8px solid #1c1c1e",
                  boxShadow:
                    "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(168,213,32,0.15), 0 0 60px rgba(168,213,32,0.08)",
                }}
              >
                {/* Status bar */}
                <div className="bg-black px-4 pt-3 pb-1 flex justify-between items-center">
                  <span className="text-white text-xs font-medium">9:26</span>
                  <div className="flex items-center gap-1">
                    {[1, 0.6, 0.3].map((op, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full"
                        style={{ background: "#a8d520", opacity: op }}
                      />
                    ))}
                  </div>
                </div>

                {/* App screen */}
                <div className="bg-gray-50">
                  {/* App header */}
                  <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-white text-xs font-bold">
                        r
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Boa noite,</p>
                        <p className="text-sm font-bold text-gray-900">richard</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-amber-50">
                      <span>☀️</span>
                      <span className="font-semibold">30°</span>
                    </div>
                  </div>

                  {/* AI card */}
                  <div
                    className="mx-3 my-3 rounded-2xl p-4"
                    style={{ background: "#2d7a2d" }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                        <Sprout size={20} style={{ color: "#a8d520" }} />
                      </div>
                      <span className="text-xs text-white/60 ml-auto px-2 py-0.5 rounded-full bg-white/20">
                        Novo
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm mb-1">
                      Assistente Virtual
                    </h3>
                    <p className="text-white/70 text-xs mb-3">
                      Sua safra e finanças em um só lugar. Converse agora!
                    </p>
                    <button className="bg-gray-900 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1">
                      Iniciar Conversa <ArrowRight size={10} />
                    </button>
                  </div>

                  {/* Quick actions */}
                  <div className="px-3 pb-3">
                    <p className="text-xs font-bold text-gray-700 mb-2">
                      Ações Rápidas
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { icon: <FileText size={16} />, label: "Importar\nNota Fiscal" },
                        { icon: <Zap size={16} />, label: "Nova\nAtividade" },
                        { icon: <Sprout size={16} />, label: "Nova\nSafra" },
                        { icon: <Users size={16} />, label: "Cadastrar\nColaborador" },
                      ].map((a, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-xl p-3 flex flex-col items-center gap-1 shadow-sm"
                        >
                          <div className="text-gray-600">{a.icon}</div>
                          <p className="text-xs text-gray-700 text-center font-medium whitespace-pre-line leading-tight">
                            {a.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom tab bar */}
                  <div className="bg-white px-2 py-2 flex items-center justify-around border-t border-gray-100">
                    {[
                      { icon: <Zap size={15} />, label: "Início", active: true },
                      { icon: <Sprout size={15} />, label: "Safras" },
                      { icon: <Package size={15} />, label: "Produtos" },
                      { icon: <Users size={15} />, label: "Colaboradores" },
                    ].map((tab, i) => (
                      <div
                        key={i}
                        className="flex flex-col items-center gap-0.5"
                        style={{ opacity: tab.active ? 1 : 0.4 }}
                      >
                        <div style={{ color: tab.active ? "#2d7a2d" : "#9ca3af" }}>
                          {tab.icon}
                        </div>
                        <span
                          className="text-[9px]"
                          style={{ color: tab.active ? "#2d7a2d" : "#9ca3af" }}
                        >
                          {tab.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div
                className="absolute -top-4 -right-4 px-3 py-2 rounded-2xl text-xs font-bold shadow-lg"
                style={{ background: "#a8d520", color: "#1a3a1a" }}
              >
                <Mic size={12} className="inline mr-1" />
                Fala por áudio!
              </div>
              <div
                className="absolute -bottom-4 -left-4 px-3 py-2 rounded-2xl text-xs font-bold shadow-lg text-white"
                style={{
                  background: "#1a4a1a",
                  border: "1px solid rgba(168,213,32,0.3)",
                }}
              >
                <Shield size={12} className="inline mr-1" style={{ color: "#a8d520" }} />
                Base EMBRAPA
              </div>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 80L60 70C120 60 240 40 360 35C480 30 600 40 720 45C840 50 960 50 1080 42.5C1200 35 1320 20 1380 12.5L1440 5V80H0Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* ─── FEATURE STRIP ─── */}
      <section className="py-6 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: <Mic size={18} />, label: "Responde por áudio" },
              { icon: <FileText size={18} />, label: "Importa nota fiscal" },
              { icon: <Sprout size={18} />, label: "Gestão de safras" },
              { icon: <Users size={18} />, label: "Controle de equipe" },
              { icon: <Package size={18} />, label: "Estoque inteligente" },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                <span style={{ color: "#a8d520" }}>{f.icon}</span>
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VOICE FEATURE ─── */}
      <section id="como-funciona" className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{ background: "linear-gradient(160deg, #1a4a1a, #2d7a2d)" }}
              >
                <div className="relative p-10 min-h-96 flex flex-col">
                  {/* top headline */}
                  <div className="relative z-10">
                    <h2
                      className="text-5xl font-black leading-none mb-2"
                      style={{ color: "#a8d520" }}
                    >
                      Manda um
                      <br />
                      áudio 🎙️
                    </h2>
                    <div className="flex items-center gap-2 mt-4">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center"
                        style={{ background: "#a8d520" }}
                      >
                        <Sprout size={12} className="text-white" />
                      </div>
                      <span className="font-bold text-white text-sm">cultiva.ai</span>
                    </div>
                  </div>

                  {/* farmer emoji */}
                  <div className="relative mt-6 flex items-end justify-center">
                    <div
                      className="w-32 h-32 rounded-full flex items-center justify-center text-6xl"
                      style={{ background: "rgba(255,255,255,0.1)" }}
                    >
                      👨‍🌾
                    </div>
                    <div
                      className="absolute -right-2 top-0 px-4 py-2 rounded-xl text-sm font-bold"
                      style={{ background: "rgba(168,213,32,0.9)", color: "#1a3a1a" }}
                    >
                      <Mic size={14} className="inline mb-0.5 mr-1" />
                      &ldquo;Quais pragas…&rdquo;
                    </div>
                  </div>

                  <div
                    className="mt-6 p-4 rounded-2xl"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  >
                    <p className="text-lg font-bold" style={{ color: "#a8d520" }}>
                      Nossa IA te responde baseada na{" "}
                      <span className="text-white">EMBRAPA</span>
                    </p>
                    <p className="text-white/70 text-sm mt-1">
                      Manejo · Pragas · Produtos · Irrigação
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: "#f0fdf0", color: "#2d7a2d", border: "1px solid #bbf7d0" }}
              >
                <Mic size={12} />
                Controle por voz
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                Pergunte qualquer coisa.{" "}
                <span style={{ color: "#2d7a2d" }}>Receba a resposta certa.</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Sem digitar, sem complicação. Manda um áudio e o Cultiva.ai
                responde com base em dados técnicos da EMBRAPA — direto do campo.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "Pragas e doenças",
                    desc: "Identifique problemas na lavoura e receba orientação técnica instantânea.",
                  },
                  {
                    title: "Manejo e irrigação",
                    desc: "Saiba quando e quanto irrigar, podar e tratar cada cultura.",
                  },
                  {
                    title: "Produtos e doses",
                    desc: "Consulte produtos homologados e dosagens corretas para cada situação.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-sm"
                      style={{ background: "#f0fdf0", color: "#2d7a2d" }}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-0.5">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ─── */}
      <section id="funcionalidades" className="py-24" style={{ background: "#f8fdf4" }}>
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: "#e8f5e0", color: "#2d7a2d", border: "1px solid #bbf7d0" }}
            >
              <TrendingUp size={12} />
              Gestão de safra completa
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              Tudo que o produtor precisa,{" "}
              <span style={{ color: "#2d7a2d" }}>em um só lugar</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Do campo ao financeiro, o Cultiva.ai centraliza toda a gestão da
              sua propriedade rural de forma simples e inteligente.
            </p>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: <FileText size={28} />,
                title: "Importação rápida de NF",
                desc: "Importe notas fiscais automaticamente e organize seus custos de insumos sem esforço.",
                bg: "#dcfce7",
                fg: "#16a34a",
              },
              {
                icon: <Package size={28} />,
                title: "Produtos em estoque",
                desc: "Controle o estoque de defensivos, fertilizantes e insumos com alertas de reposição.",
                bg: "#fef9c3",
                fg: "#ca8a04",
              },
              {
                icon: <Users size={28} />,
                title: "Colaboradores",
                desc: "Gerencie sua equipe, atribua atividades e acompanhe a execução em tempo real.",
                bg: "#dbeafe",
                fg: "#2563eb",
              },
              {
                icon: <Sprout size={28} />,
                title: "Criação de safras",
                desc: "Cadastre safras, talhões e culturas. Acompanhe todo o ciclo produtivo.",
                bg: "#f3e8ff",
                fg: "#9333ea",
              },
            ].map((feat, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: feat.bg, color: feat.fg }}
                  >
                    {feat.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Activities banner */}
          <AnimatedSection>
            <div
              className="rounded-3xl p-8 text-white"
              style={{ background: "linear-gradient(135deg, #1a4a1a, #2d7a2d)" }}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h3 className="text-2xl font-black mb-2">
                    Atividades de manejo programadas
                  </h3>
                  <p className="text-white/70">
                    Crie, programe e acompanhe todas as atividades da sua fazenda.
                  </p>
                </div>
                <div className="flex gap-4 flex-wrap">
                  {[
                    { emoji: "💧", label: "Irrigação" },
                    { emoji: "✂️", label: "Poda" },
                    { emoji: "⛽", label: "Combustível" },
                    { emoji: "🌿", label: "Pulverização" },
                    { emoji: "🌱", label: "Colheita" },
                  ].map((act, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 w-16">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl"
                        style={{ background: "#a8d520" }}
                      >
                        {act.emoji}
                      </div>
                      <span className="text-xs text-white/70">{act.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Chat demo */}
            <AnimatedSection delay={200}>
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
                style={{ background: "#f0fdf0", color: "#2d7a2d", border: "1px solid #bbf7d0" }}
              >
                <MessageCircle size={12} />
                Simples Assim
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
                Seu agente de IA{" "}
                <span style={{ color: "#2d7a2d" }}>no campo</span>
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Como ter um extensionista rural disponível 24h, que conhece sua
                fazenda, sua equipe e suas safras.
              </p>

              <div className="space-y-6">
                {[
                  {
                    user: "Quais são as minhas safras?",
                    ai: "Você tem 3 safras ativas: Manga 2026.2, Manga 2027.2 e Uva 2028.",
                  },
                  {
                    user: "E as atividades de amanhã?",
                    ai: "Amanhã às 7h o colaborador José será responsável por pulverizar o talhão 3 da Manga 2026.2.",
                  },
                ].map((chat, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-end">
                      <div
                        className="max-w-xs px-4 py-2.5 rounded-2xl rounded-tr-sm text-sm text-white font-medium"
                        style={{ background: "#2d7a2d" }}
                      >
                        {chat.user}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center"
                        style={{ background: "#a8d520" }}
                      >
                        <Sprout size={14} className="text-white" />
                      </div>
                      <div
                        className="max-w-xs px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm text-gray-700"
                        style={{ background: "#f3f4f6" }}
                      >
                        {chat.ai}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="mt-8 p-4 rounded-2xl text-center text-2xl font-black"
                style={{ background: "#f0fdf0", color: "#2d7a2d" }}
              >
                Simples Assim 🌱
              </div>
            </AnimatedSection>

            {/* Steps */}
            <AnimatedSection>
              <div className="space-y-6">
                {[
                  {
                    n: "01",
                    title: "Baixe o app",
                    desc: "Disponível para Android. Faça seu cadastro em menos de 2 minutos.",
                    icon: <Phone size={20} />,
                    highlight: true,
                  },
                  {
                    n: "02",
                    title: "Cadastre sua fazenda",
                    desc: "Adicione suas safras, talhões, colaboradores e produtos de forma simples.",
                    icon: <Sprout size={20} />,
                  },
                  {
                    n: "03",
                    title: "Converse com o assistente",
                    desc: "Pergunte por texto ou áudio. O assistente responde com base na sua operação real.",
                    icon: <Mic size={20} />,
                  },
                  {
                    n: "04",
                    title: "Tome decisões com dados",
                    desc: "Veja relatórios, programe atividades e gerencie custos com inteligência.",
                    icon: <TrendingUp size={20} />,
                  },
                ].map((step, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="flex flex-col items-center">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 text-white"
                        style={{ background: step.highlight ? "#a8d520" : "#1a4a1a" }}
                      >
                        {step.icon}
                      </div>
                      {i < 3 && (
                        <div
                          className="w-0.5 flex-1 mt-2"
                          style={{ background: "#e5e7eb" }}
                        />
                      )}
                    </div>
                    <div className="pb-6">
                      <span className="text-xs font-bold" style={{ color: "#a8d520" }}>
                        Passo {step.n}
                      </span>
                      <h4 className="font-black text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-500 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section id="depoimentos" className="py-24" style={{ background: "#f8fdf4" }}>
        <div className="max-w-6xl mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
              O que os <span style={{ color: "#2d7a2d" }}>produtores</span> dizem
            </h2>
            <p className="text-gray-600">Mais de 500 produtores já usam o Cultiva.ai</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "João S.",
                role: "Produtor de Manga – Petrolina/PE",
                text: "Antes eu perdia horas controlando tudo em caderno. Hoje falo por áudio pro app e ele me diz o que precisa ser feito. Coisa de outro mundo!",
              },
              {
                name: "Maria A.",
                role: "Produtora de Acerola – Mossoró/RN",
                text: "A importação de nota fiscal me economiza um tempo absurdo. Meu estoque sempre atualizado sem eu precisar fazer nada manualmente.",
              },
              {
                name: "Carlos M.",
                role: "Produtor de Uva – Vale do São Francisco",
                text: "Minha equipe melhorou muito depois que comecei a usar o app pra programar as atividades. Todo mundo sabe o que tem que fazer.",
              },
            ].map((t, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                  <div className="flex mb-3">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} size={14} fill="#a8d520" color="#a8d520" />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                      style={{ background: "#2d7a2d" }}
                    >
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-gray-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ─── */}
      <section
        id="cta-section"
        className="py-24 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #0f2a0f 0%, #1a4a1a 60%, #2d6a2d 100%)",
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-10 left-20 w-72 h-72 rounded-full opacity-10"
            style={{ background: "#a8d520", filter: "blur(100px)" }}
          />
          <div
            className="absolute bottom-10 right-20 w-72 h-72 rounded-full opacity-10"
            style={{ background: "#a8d520", filter: "blur(100px)" }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <AnimatedSection>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-6"
              style={{
                background: "rgba(168,213,32,0.15)",
                color: "#a8d520",
                border: "1px solid rgba(168,213,32,0.3)",
              }}
            >
              🌱 Teste grátis, sem cartão de crédito
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Comece a usar o{" "}
              <span className="gradient-text">Cultiva.ai</span>
              <br />
              ainda hoje
            </h2>

            <p className="text-white/70 text-lg mb-10">
              Junte-se a centenas de produtores que já estão gerenciando suas
              fazendas de forma mais inteligente.
            </p>

            <div
              className="rounded-3xl p-8 mb-8"
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "Teste grátis", value: "7 dias" },
                  { label: "Sem cartão", value: "100%" },
                  { label: "Suporte", value: "WhatsApp" },
                ].map((item, i) => (
                  <div key={i}>
                    <p className="text-3xl font-black" style={{ color: "#a8d520" }}>
                      {item.value}
                    </p>
                    <p className="text-white/60 text-sm">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-left mb-8">
                {[
                  "Gestão completa de safras e talhões",
                  "Assistente de IA por voz e texto",
                  "Importação automática de notas fiscais",
                  "Controle de colaboradores e atividades",
                  "Respostas baseadas na EMBRAPA",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle size={16} style={{ color: "#a8d520" }} />
                    <span className="text-white/80 text-sm">{item}</span>
                  </div>
                ))}
              </div>

              <button
                className="w-full py-5 rounded-2xl text-lg font-black text-gray-900 transition-all hover:scale-105 hover:shadow-2xl glow-animation flex items-center justify-center gap-2"
                style={{ background: "#a8d520" }}
              >
                Quero testar o app
                <ChevronRight size={22} />
              </button>

              <p className="text-white/40 text-xs mt-4">
                Sem compromisso. Cancele quando quiser.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#a8d520" }}
              >
                <Sprout size={16} className="text-white" />
              </div>
              <span className="font-bold text-xl">
                cultiva<span style={{ color: "#a8d520" }}>.ai</span>
              </span>
            </div>

            <p className="text-gray-400 text-sm text-center">
              © 2026 Cultiva.ai · Desenvolvido por{" "}
              <span style={{ color: "#a8d520" }}>BLW devs</span>
            </p>

            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos</a>
              <a href="#" className="hover:text-white transition-colors">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
