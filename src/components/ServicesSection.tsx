"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Inscription & Profil",
    description: "Créez votre compte en quelques minutes. Accédez immédiatement à votre tableau de bord personnalisé.",
  },
  {
    number: "02",
    title: "Personnalisation",
    description: "Définissez vos objectifs et préférences. Notre IA adapte l'expérience à vos besoins spécifiques.",
  },
  {
    number: "03",
    title: "Lancement & Suivi",
    description: "Déployez vos projets et suivez leur évolution en temps réel avec nos outils d'analyse avancés.",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-animate", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.12,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-16 md:py-24 bg-background-muted"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-green/10 text-accent-greenStrong text-sm font-semibold mb-4">
            Comment ça marche
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Un processus simple et efficace
          </h2>
          <p className="mt-4 text-base md:text-lg font-normal leading-relaxed text-text-body max-w-2xl mx-auto">
            Commencez facilement et voyez votre activité prospérer dès le premier jour avec un accompagnement personnalisé.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step) => (
            <div key={step.number} className="service-animate relative">
              <div className="relative rounded-3xl bg-background-main border border-accent-slate/10 p-8 md:p-10 h-full transition-all duration-300 hover:shadow-lg hover:border-accent-slate/20">
                <span className="text-6xl font-extrabold text-accent-green/15 absolute top-6 right-6">
                  {step.number}
                </span>
                <div className="w-12 h-12 rounded-2xl bg-accent-green/10 flex items-center justify-center text-accent-greenStrong font-bold text-lg mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-base font-normal leading-relaxed text-text-body">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
