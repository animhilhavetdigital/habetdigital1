"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BentoCard from "./BentoCard";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    title: "Zéro risque",
    description: "Pas de frais avant d'être sûr.",
    icon: "🛡️",
  },
  {
    title: "5 minutes",
    description: "Réponse immédiate. Pas de paperasse.",
    icon: "⚡",
  },
  {
    title: "Humain",
    description: "Un négociateur vous accompagne.",
    icon: "🤝",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bento-reveal").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          scale: 0.95,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="expertise"
      ref={sectionRef}
      className="py-16 md:py-24 bg-background-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent-green/10 text-accent-greenStrong text-sm font-semibold mb-4">
            Avantages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
            Pourquoi Droit Habitat ?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="bento-reveal">
              <BentoCard span={false}>
                <div className="w-14 h-14 rounded-2xl bg-background-muted flex items-center justify-center text-3xl mb-6 shadow-sm border border-accent-slate/10">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-lg font-normal leading-relaxed text-text-body">
                  {feature.description}
                </p>
              </BentoCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
