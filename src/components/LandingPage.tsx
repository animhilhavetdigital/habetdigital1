"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import ProcessusDarkSection from "./ProcessusDarkSection";
import SolutionSection from "./SolutionSection";
import TestimonialsSection from "./TestimonialsSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import InteractiveChat from "./InteractiveChat";

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

/* ──────────────── MAIN ──────────────── */

export default function LandingPage() {
  const [phase, setPhase] = useState<"hero" | "form" | "chat" | "analysing" | "result">("hero");
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({ montant: "", "nb_crédits": "1" });
  const [score, setScore] = useState(0);
  const [result, setResult] = useState<"éligible" | "not-éligible">("éligible");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGradient, setShowGradient] = useState(false);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (phase === "hero" && !isChatOpen) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        // Tswira tdkhol men limen
        tl.from(".hero-bg", {
          x: 60,
          opacity: 0,
          scale: 1.05,
          duration: 1.2,
          ease: "power3.out",
        });

        // Typewriter : 7arf b 7arf
        tl.to(".hero-letter", {
          opacity: 1,
          duration: 0.04,
          stagger: 0.04,
          ease: "none",
        }, "-=0.3");

        // Activer liquid gradient mora typewriter
        tl.call(() => setShowGradient(true));

        // Description
        tl.from(".hero-desc", {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power3.out",
        }, "+=0.3");
      }, sectionRef);
      return () => ctx.revert();
    }
  }, { scope: sectionRef, dependencies: [phase] }); // We specifically don't want to re-run when isChatOpen changes

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
    setIsChatOpen(false);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
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
        <section ref={sectionRef} className="fixed inset-0 z-0 h-[100dvh] flex items-center overflow-hidden">
          {/* Background Image */}
          <div className="hero-bg absolute inset-0">
            <img
              src="/photo/A_professional_cinematic_medium_shot_202606080846.jpeg"
              alt="Droit Habitat"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#22324B]/75 via-[#22324B]/60 to-[#22324B]/20" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24">
            <div className="max-w-4xl lg:-ml-12">
              {/* Titre typewriter + liquid gradient */}
              <div
                ref={titleRef}
                className={`relative inline-block mb-8 ${showGradient ? '' : 'text-white'}`}
                onMouseMove={handleTitleMouseMove}
                style={showGradient ? {
                  '--x1': '0px',
                  '--y1': '0px',
                  '--x2': '0px',
                  '--y2': '0px',
                  '--x3': '0px',
                  '--y3': '0px',
                  background: `
                    radial-gradient(circle 220px at var(--x1) var(--y1), rgba(80, 217, 149, 0.55) 0%, transparent 100%),
                    radial-gradient(circle 160px at var(--x2) var(--y2), rgba(38, 208, 124, 0.5) 0%, transparent 100%),
                    radial-gradient(circle 100px at var(--x3) var(--y3), rgba(173, 179, 186, 0.45) 0%, transparent 100%),
                    #ffffff
                  `,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                } as React.CSSProperties : {}}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[1.1]">
                  <span className="block">
                    {"Votre crédit conso".split("").map((char, i) => (
                      <span key={`l1-${i}`} className="hero-letter inline opacity-0">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                  <span className="block">
                    {"vous pèse ?".split("").map((char, i) => (
                      <span key={`l2-${i}`} className="hero-letter inline opacity-0">
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>
                </h1>
              </div>
              <p className="hero-desc text-lg md:text-xl text-white/80 leading-relaxed max-w-xl">
                Vous êtes à un clic de transformer votre situation. Vérifiez gratuitement en 2 minutes si votre dossier présente un levier d&apos;action grâce à notre analyse intelligente.
              </p>
            </div>
          </div>
        </section>
        <div className="relative z-10 mt-[100dvh] bg-background-main shadow-[0_-20px_60px_rgba(34,50,75,0.2)] rounded-t-[2rem]">
          <SolutionSection onStartForm={() => setPhase("form")} onStartChat={() => setIsChatOpen(true)}>
            {isChatOpen && (
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 pt-2">
                <InteractiveChat
                  onComplete={(data) => {
                    setFormData(data);
                    setIsChatOpen(false);
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                    setPhase("analysing");
                    setTimeout(() => {
                      const s = computeScore(data);
                      setScore(s);
                      setResult(s >= 5 ? "éligible" : "not-éligible");
                      setPhase("result");
                    }, 2000);
                  }}
                  onClose={() => {
                    setIsChatOpen(false);
                    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                  }}
                />
              </div>
            )}
          </SolutionSection>
        </div>
        <div id="comment-ca-marche" className="relative z-10">
          <ProcessusDarkSection />
        </div>
        <div className="relative z-10 bg-background-main">
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
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
    </>
  );
}
