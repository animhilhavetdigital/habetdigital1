"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────── DATA ──────────────── */

interface QuizQuestion {
  name: string;
  label: string;
  invert: boolean;
}

interface QuizStep {
  title: string;
  fields?: { name: string; label: string; type: "number" | "select"; placeholder?: string; options?: { label: string; value: string }[] }[];
  questions?: QuizQuestion[];
}

const STEPS: QuizStep[] = [
  {
    title: "Informations générales",
    fields: [
      { name: "montant", label: "Montant total du crédit (€)", type: "number", placeholder: "Ex: 15000" },
      {
        name: "nb_crédits",
        label: "Nombre de crédits conso litigieux",
        type: "select",
        options: [
          { label: "1 crédit", value: "1" },
          { label: "2 crédits", value: "2" },
          { label: "3 crédits ou plus", value: "3" },
        ],
      },
    ],
  },
  {
    title: "La vente",
    questions: [
      { name: "demarcheur", label: "Un intermédiaire ou démarcheur était-il présent lors de la vente ?", invert: false },
      { name: "domicile", label: "Le contrat a-t-il été signé chez vous (à domicile) ?", invert: false },
      { name: "retractation", label: "Ont-ils respecté le délai de rétractation ?", invert: true },
    ],
  },
  {
    title: "Situation actuelle",
    questions: [
      { name: "prelevements", label: "Les prélèvements ont-ils déjà commencé ?", invert: false },
      { name: "relance", label: "Avez-vous déjà reçu des courriers de relance ?", invert: false },
      { name: "mise_en_demeure", label: "Avez-vous reçu une mise en demeure ?", invert: false },
      { name: "ficp", label: "Êtes-vous menacé(e) de fichage Banque de France (FICP) ou avez-vous déjà été fiché(e) ?", invert: false },
      { name: "retard", label: "Êtes-vous en retard de paiement actuellement ?", invert: false },
    ],
  },
  {
    title: "Vérifications de l'organisme",
    questions: [
      { name: "solvabilite", label: "L'organisme a-t-il vérifié votre solvabilité réelle ?", invert: true },
      { name: "revenus_charges", label: "A-t-il vérifié vos revenus et vos charges ?", invert: true },
      { name: "info_claire", label: "Y a-t-il des absences d'information claire (coût total, taux, risques) ?", invert: false },
      { name: "justificatifs", label: "A-t-il vérifié tous les éléments sans exception (justificatifs, situation pro, charges, relevés) ?", invert: true },
      { name: "ficp_consulte", label: "L'organisme a-t-il consulté le FICP et vérifié vos crédits en cours ?", invert: true },
      { name: "antecedents", label: "L'organisme avait-il connaissance de vos antécédents de fichage ou incidents bancaires ?", invert: false },
    ],
  },
];

const ALL_QUESTIONS: QuizQuestion[] = STEPS.flatMap((s) => s.questions || []);

function computeScore(data: Record<string, string>): number {
  let score = 0;
  if (Number(data.montant) > 5000) score += 1;
  if (Number(data.montant) > 15000) score += 1;
  if (Number(data.nb_crédits) > 1) score += 1;

  ALL_QUESTIONS.forEach((q) => {
    const val = data[q.name];
    if (q.invert) {
      if (val === "non") score += 1;
    } else {
      if (val === "oui") score += 1;
    }
  });
  return score;
}

/* ──────────────── COMPONENTS ──────────────── */

function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    gsap.from(".bento-card", {
      scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0, y: 50, scale: 0.95, duration: 0.8, ease: "power3.out", stagger: 0.1, clearProps: "all"
    });
    gsap.from(".hiw-animate", {
      scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none none" },
      opacity: 0, y: 20, duration: 0.6, stagger: 0.1, clearProps: "all"
    });
  }, { scope: ref });

  return (
    <div ref={ref} className="py-16 md:py-24 relative overflow-hidden bg-background-main">
      {/* Background Gradient & Glowing Orbs */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-main via-accent-green/5 to-background-muted z-0"></div>
      <div className="absolute top-[30%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-accent-green/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[20%] w-[35vw] h-[35vw] rounded-full bg-text-primary/10 blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10">
          <span className="hiw-animate inline-block px-4 py-1.5 rounded-full bg-white shadow-sm border border-accent-green/20 text-accent-greenStrong text-sm font-bold mb-3">
            Processus
          </span>
          <h2 className="hiw-animate text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Comment ça marche ?
          </h2>
        </div>

        {/* 2x2 Symmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {/* Step 1 */}
          <div className="bento-card group flex flex-col items-center text-center p-5 md:p-7 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(34,50,75,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,50,75,0.08)]">
            <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
              {/* Animated Radar/Scanner */}
              <div className="absolute inset-0 bg-accent-green/10 rounded-full animate-pulse"></div>
              <div className="absolute inset-4 border-2 border-accent-green/30 rounded-full"></div>
              <svg className="absolute inset-0 w-full h-full text-accent-green animate-[spin_4s_linear_infinite]" viewBox="0 0 100 100">
                <path d="M50 50 L50 10 A40 40 0 0 1 90 50 Z" fill="currentColor" opacity="0.2" />
              </svg>
              <div className="relative z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-accent-slate/10">
                <span className="text-xl font-bold text-accent-greenStrong">1</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Test (2 min)</h3>
            <p className="text-sm text-text-body leading-relaxed max-w-xs">
              Vérifiez votre éligibilité en ligne instantanément grâce à notre formulaire intelligent d'analyse.
            </p>
          </div>

          {/* Step 2 (Locked) */}
          <div className="bento-card group flex flex-col items-center text-center p-5 md:p-7 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(34,50,75,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,50,75,0.08)]">
            
            <div className="relative w-full max-w-[160px] h-28 mb-5">
              {/* Inner blurred container representing the hidden offer */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-accent-slate/20 bg-background-muted shadow-inner">
                {/* Fake Content Behind Blur */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 opacity-40">
                   <div className="h-3 w-1/2 bg-accent-slate rounded-full mb-3"></div>
                   <div className="text-3xl font-black text-text-primary blur-[2px]">Prix Fixe</div>
                   <div className="h-2 w-3/4 bg-accent-slate rounded-full mt-4"></div>
                   <div className="h-2 w-2/3 bg-accent-slate rounded-full mt-2"></div>
                </div>
                
                {/* The Lock Overlay */}
                <div className="absolute inset-0 bg-white/60 backdrop-blur-md z-20 flex flex-col items-center justify-center transition-all duration-500 group-hover:bg-white/50">
                  <div className="w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center mb-2 border border-accent-slate/10 transition-transform duration-500 group-hover:scale-110">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-primary"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <span className="text-xs font-bold text-text-primary px-4 py-1.5 rounded-full bg-white shadow-sm border border-accent-slate/10">
                    À débloquer
                  </span>
                </div>
              </div>

              {/* Number 2 Badge (Outside overflow) */}
              <div className="absolute -bottom-4 -right-2 z-30 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-accent-slate/10 transition-transform duration-500 group-hover:-translate-y-1">
                <span className="text-xl font-bold text-accent-greenStrong">2</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-text-primary mb-2">Offre personnalisée</h3>
            <p className="text-sm text-text-body leading-relaxed max-w-xs">
              Découvrez nos solutions juridiques adaptées à votre dossier spécifique et le montant récupérable.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bento-card group flex flex-col items-center text-center p-5 md:p-7 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(34,50,75,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,50,75,0.08)]">
            <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
              <div className="absolute inset-0 bg-accent-slate/10 rounded-full group-hover:scale-110 transition-transform duration-500"></div>
              <svg className="absolute inset-0 w-full h-full text-accent-green -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="251" strokeDashoffset="251" className="animate-[dash_3s_ease-in-out_infinite_alternate]" />
              </svg>
              <div className="relative z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-accent-slate/10">
                <span className="text-xl font-bold text-accent-greenStrong">3</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Paiement sécurisé</h3>
            <p className="text-sm text-text-body leading-relaxed max-w-xs">
              Réglez en toute sérénité. Nous ne facturons que si votre dossier a de fortes chances de succès.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bento-card group flex flex-col items-center text-center p-5 md:p-7 rounded-[2rem] bg-white/70 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(34,50,75,0.04)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,50,75,0.08)]">
            <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
              {/* Animated Floating File */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-16 bg-white border border-accent-slate/20 rounded-xl shadow-lg group-hover:-translate-y-4 transition-transform duration-500 flex flex-col p-2 gap-1.5">
                  <div className="w-full h-2 bg-accent-green/20 rounded-full"></div>
                  <div className="w-3/4 h-2 bg-accent-green/20 rounded-full"></div>
                  <div className="mt-auto self-end w-4 h-4 rounded-full bg-accent-green flex items-center justify-center text-white">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md border border-accent-slate/10">
                <span className="text-xl font-bold text-accent-greenStrong">4</span>
              </div>
            </div>
            <h3 className="text-xl font-bold text-text-primary mb-2">Dossier activé</h3>
            <p className="text-sm text-text-body leading-relaxed max-w-xs">
              Nous prenons le relais immédiatement. Suivez l'avancée de votre litige depuis votre espace client.
            </p>
          </div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}} />
    </div>
  );
}

/* ──────────────── MAIN ──────────────── */

export default function LandingPage() {
  const [phase, setPhase] = useState<"hero" | "form" | "analysing" | "result">("hero");
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({ montant: "", "nb_crédits": "1" });
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<"éligible" | "not-éligible">("éligible");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (phase === "hero") {
      const ctx = gsap.context(() => {
        gsap.from(".hero-animate", {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, { scope: sectionRef, dependencies: [phase] });

  const updateField = useCallback((name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const validateStep = useCallback(() => {
    const step = STEPS[stepIndex];
    const required = [
      ...(step.fields || []).map((f) => f.name),
      ...(step.questions || []).map((q) => q.name),
    ];
    const missing = required.filter((name) => !formData[name] || formData[name].trim() === "");
    if (missing.length > 0) {
      alert("Veuillez répondre à toutes les questions avant de continuer.");
      return false;
    }
    return true;
  }, [stepIndex, formData]);

  const nextStep = useCallback(() => {
    if (!validateStep()) return;
    if (stepIndex < STEPS.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setPhase("analysing");
      setTimeout(() => {
        const s = computeScore(formData);
        setScore(s);
        setResult(s >= 5 ? "éligible" : "not-éligible");
        setPhase("result");
      }, 2000);
    }
  }, [validateStep, stepIndex, formData]);

  const prevStep = useCallback(() => {
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  }, [stepIndex]);

  const restart = useCallback(() => {
    setPhase("hero");
    setStepIndex(0);
    setFormData({ montant: "", "nb_crédits": "1" });
    setScore(0);
    setIsSubmitting(false);
  }, []);

  const handleTitleMouseMove = useCallback((evt: React.MouseEvent<HTMLDivElement>) => {
    const rect = evt.currentTarget.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    const el = titleRef.current;
    if (!el) return;
    gsap.to(el, { '--x1': x, '--y1': y, duration: 0.5, ease: 'power2.out' });
    gsap.to(el, { '--x2': x, '--y2': y, duration: 0.5, ease: 'power2.out', delay: 0.08 });
    gsap.to(el, { '--x3': x, '--y3': y, duration: 0.5, ease: 'power2.out', delay: 0.16 });
  }, []);

  useEffect(() => {
    if (phase !== "hero") return;
    const timer = setTimeout(() => {
      const el = titleRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      gsap.set(el, { '--x1': cx, '--y1': cy, '--x2': cx, '--y2': cy, '--x3': cx, '--y3': cy });
    }, 50);
    return () => clearTimeout(timer);
  }, [phase]);

  /* ── HERO ── */
  if (phase === "hero") {
    return (
      <>
        <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center pt-24 overflow-hidden bg-background-main z-0">
          {/* Background Mesh Gradient Blobs (from SKILL.md) */}
          <div className="absolute top-[-15%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-accent-green/12 blur-[130px] pointer-events-none" />
          <div className="absolute top-[30%] right-[-15%] w-[40vw] h-[40vw] rounded-full bg-accent-slate/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] left-[15%] w-[50vw] h-[50vw] rounded-full bg-text-primary/5 blur-[160px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center text-center gap-8 md:gap-12">
              
              {/* Badge */}
              <div className="hero-animate inline-flex items-center gap-3 px-1 py-1 pr-4 rounded-full bg-surface-glass border border-accent-slate/20 text-text-body text-xs md:text-sm font-medium mb-10 shadow-[0_4px_30px_rgba(34,50,75,0.03)] backdrop-blur-md">
                <span className="flex items-center justify-center px-3 py-1 rounded-full bg-accent-green/15 text-accent-greenStrong font-bold">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  Gratuit
                </span>
                Plateforme d'analyse juridique
              </div>

              {/* Headline with liquid gradient text effect */}
              <div
                ref={titleRef}
                className="hero-animate relative inline-block"
                onMouseMove={handleTitleMouseMove}
                style={{
                  '--x1': '0px',
                  '--y1': '0px',
                  '--x2': '0px',
                  '--y2': '0px',
                  '--x3': '0px',
                  '--y3': '0px',
                } as React.CSSProperties}
              >
                <h1
                  className="text-5xl md:text-6xl lg:text-[6rem] xl:text-[7rem] font-light tracking-tight leading-[1.15] max-w-6xl flex flex-col items-center gap-3 md:gap-6"
                  style={{
                    background: `
                      radial-gradient(circle 220px at var(--x1) var(--y1), #50D995 0%, transparent 100%),
                      radial-gradient(circle 160px at var(--x2) var(--y2), #26D07C 0%, transparent 100%),
                      radial-gradient(circle 100px at var(--x3) var(--y3), #ADB3BA 0%, transparent 100%),
                      #22324B
                    `,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  <span className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4">
                    Votre
                    <span className="font-bold">crédit</span>
                    <span>conso</span>
                  </span>
                  <span className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4">
                    vous
                    <span className="font-bold">pèse ?</span>
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="hero-animate text-base md:text-xl font-normal leading-relaxed text-text-body max-w-3xl">
                Vous êtes à un clic de transformer votre situation. Vérifiez gratuitement en 2 minutes si votre dossier présente un levier d'action grâce à notre analyse intelligente.
              </p>

              {/* Buttons */}
              <div className="hero-animate mt-4 flex flex-col sm:flex-row items-center justify-center gap-5">
                <button
                  onClick={() => setPhase("form")}
                  className="px-8 py-4 rounded-full bg-accent-green text-text-primary font-bold shadow-lg shadow-accent-green/20 transition-all duration-300 hover:bg-accent-greenStrong hover:scale-105 hover:-translate-y-0.5"
                >
                  Tester mon éligibilité
                </button>
                <div className="px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm text-text-primary font-bold shadow-none border border-white/30">
                  100% gratuit · Sans engagement
                </div>
              </div>

            </div>
          </div>
        </section>
        <div id="comment-ca-marche">
          <HowItWorks />
        </div>
      </>
    );
  }

  /* ── FORM ── */
  if (phase === "form") {
    const step = STEPS[stepIndex];
    const progress = ((stepIndex + 1) / STEPS.length) * 100;

    return (
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <button onClick={() => { if (stepIndex === 0) restart(); else prevStep(); }} className="text-sm text-text-body hover:text-accent-greenStrong transition-colors flex items-center gap-1 mb-6">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              {stepIndex === 0 ? "Retour à l'accueil" : "Étape précédente"}
            </button>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-text-primary">Étape {stepIndex + 1} sur {STEPS.length}</span>
              <span className="text-sm text-text-body">{step.title}</span>
            </div>
            <div className="h-2 rounded-full bg-background-muted overflow-hidden">
              <div className="h-full rounded-full bg-accent-green transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="rounded-3xl bg-surface-glass backdrop-blur-md border border-white/40 shadow-[0_8px_40px_rgba(34,50,75,0.08)] p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-8">{step.title}</h2>

            <div className="space-y-8">
              {step.fields?.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-text-primary mb-2">{field.label}</label>
                  {field.type === "number" && (
                    <input
                      type="number"
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-2xl border border-accent-slate/20 bg-background-main px-5 py-3.5 text-text-primary placeholder:text-text-light focus:outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/10 transition-all"
                    />
                  )}
                  {field.type === "select" && (
                    <select
                      name={field.name}
                      value={formData[field.name] || "1"}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      className="w-full rounded-2xl border border-accent-slate/20 bg-background-main px-5 py-3.5 text-text-primary focus:outline-none focus:border-accent-green focus:ring-2 focus:ring-accent-green/10 transition-all appearance-none"
                    >
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}

              {step.questions?.map((q) => (
                <div key={q.name}>
                  <label className="block text-sm font-semibold text-text-primary mb-3">{q.label}</label>
                  <div className="flex gap-4">
                    {["oui", "non"].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => updateField(q.name, val)}
                        className={`flex-1 rounded-2xl border px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${
                          formData[q.name] === val
                            ? "border-accent-green bg-accent-green/10 text-accent-greenStrong"
                            : "border-accent-slate/20 bg-background-main text-text-body hover:border-accent-slate/40"
                        }`}
                      >
                        {val === "oui" ? "Oui" : "Non"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-end">
              <button
                onClick={nextStep}
                disabled={isSubmitting}
                className="px-8 py-4 rounded-full bg-accent-green text-text-primary font-bold shadow-lg shadow-accent-green/20 transition-all duration-300 hover:bg-accent-greenStrong hover:scale-105 hover:-translate-y-0.5 disabled:opacity-50"
              >
                {stepIndex === STEPS.length - 1 ? "Analyser mon dossier" : "Continuer"}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  /* ── ANALYSING ── */
  if (phase === "analysing") {
    return (
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 min-h-screen flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="relative w-20 h-20 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-accent-slate/15" />
            <div className="absolute inset-0 rounded-full border-4 border-accent-green border-t-transparent animate-spin" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Analyse en cours...</h2>
          <p className="text-base text-text-body">Nous évaluons vos réponses sur 16 critères juridiques</p>
        </div>
      </section>
    );
  }

  /* ── RESULT ── */
  const isEligible = result === "éligible";
  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 min-h-[60vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`w-20 h-20 mx-auto mb-8 rounded-full flex items-center justify-center ${isEligible ? "bg-accent-green/15" : "bg-accent-redMuted/15"}`}>
            {isEligible ? (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#26D07C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            ) : (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7E5455" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            )}
          </div>

          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 ${isEligible ? "text-text-primary" : "text-text-primary"}`}>
            {isEligible ? "Bonne nouvelle, vous êtes éligible !" : "Pas de levier d'action évident"}
          </h2>

          <p className="text-base md:text-lg text-text-body max-w-xl mx-auto mb-10">
            {isEligible
              ? `Votre dossier présente ${score} éléments favorables sur 16 critères. Nous recommandons une action rapide.`
              : `D'après vos réponses (${score}/16), nous ne détectons pas suffisamment d'irrégularités pour engager une démarche.`}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isEligible ? (
              <>
                <Link
                  href="/offres"
                  className="px-8 py-4 rounded-full bg-accent-green text-text-primary font-bold shadow-lg shadow-accent-green/20 transition-all duration-300 hover:bg-accent-greenStrong hover:scale-105 hover:-translate-y-0.5"
                >
                  Voir les offres
                </Link>
                <button
                  onClick={restart}
                  className="px-8 py-4 rounded-full bg-background-main/80 text-text-primary font-semibold border border-accent-slate/30 shadow-sm transition-all duration-300 hover:bg-background-main hover:shadow-md"
                >
                  Recommencer
                </button>
              </>
            ) : (
              <button
                onClick={restart}
                className="px-8 py-4 rounded-full bg-accent-green text-text-primary font-bold shadow-lg shadow-accent-green/20 transition-all duration-300 hover:bg-accent-greenStrong hover:scale-105 hover:-translate-y-0.5"
              >
                Recommencer le test
              </button>
            )}
          </div>
        </div>
      </section>
      <HowItWorks />
    </>
  );
}
