"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "1",
    title: "Test (2 min)",
    desc: "Vérifiez votre éligibilité en ligne instantanément grâce à notre formulaire intelligent d'analyse.",
    color: "#50D995",
  },
  {
    num: "2",
    title: "Offre personnalisée",
    desc: "Découvrez nos solutions juridiques adaptées à votre dossier spécifique et le montant récupérable.",
    color: "#26D07C",
  },
  {
    num: "3",
    title: "Paiement sécurisé",
    desc: "Réglez en toute sérénité. Nous ne facturons que si votre dossier a de fortes chances de succès.",
    color: "#ADB3BA",
  },
  {
    num: "4",
    title: "Dossier activé",
    desc: "Nous prenons le relais immédiatement. Suivez l'avancée de votre litige depuis votre espace client.",
    color: "#22324B",
  },
];

export default function ScrollProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".process-card");

      // Initial state: card 1 visible, others hidden below
      gsap.set(cards[0], { y: 0, scale: 1, opacity: 1, rotate: 0 });
      gsap.set(cards.slice(1), { y: 100, scale: 0.6, opacity: 0, rotate: 5 });

      cards.forEach((card, i) => {
        const stepTrigger = `.process-step-${i + 1}`;

        // Entrance animation (for cards 2, 3, 4)
        if (i > 0) {
          gsap.fromTo(
            card,
            { y: 100, scale: 0.6, opacity: 0, rotate: 5 },
            {
              y: 0,
              scale: 1,
              opacity: 1,
              rotate: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: stepTrigger,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Exit animation (for cards 1, 2, 3)
        if (i < cards.length - 1) {
          gsap.to(card, {
            y: -100,
            scale: 0.6,
            opacity: 0,
            rotate: -5,
            duration: 0.6,
            ease: "power3.in",
            scrollTrigger: {
              trigger: stepTrigger,
              start: "bottom 40%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <div ref={sectionRef} id="comment-ca-marche" className="relative bg-background-main">
      {/* Header */}
      <div className="pt-16 md:pt-24 pb-8 md:pb-12 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-white shadow-sm border border-accent-green/20 text-accent-greenStrong text-sm font-bold mb-4">
          Processus
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
          Comment ça marche ?
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Scrolling Steps */}
          <div className="relative z-10 pb-24">
            {STEPS.map((step, i) => (
              <div
                key={step.num}
                className={`process-step-${i + 1} min-h-[70vh] flex items-center py-12`}
              >
                <div className="max-w-md">
                  <span
                    className="block text-7xl md:text-8xl font-bold"
                    style={{ color: step.color, opacity: 0.15 }}
                  >
                    {step.num}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-text-primary -mt-6 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-base md:text-lg text-text-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Sticky Visual */}
          <div className="hidden lg:block">
            <div className="sticky top-0 h-screen flex items-center justify-center">
              <div className="relative w-full max-w-sm aspect-[4/5]">
                {STEPS.map((step, i) => (
                  <div
                    key={step.num}
                    className="process-card absolute inset-0 rounded-[2.5rem] flex flex-col items-center justify-center p-8 border border-white/60 shadow-[0_20px_50px_rgba(34,50,75,0.08)] backdrop-blur-sm"
                    style={{ backgroundColor: `${step.color}12` }}
                  >
                    <span
                      className="text-6xl font-bold mb-4"
                      style={{ color: step.color }}
                    >
                      {step.num}
                    </span>
                    <h4 className="text-xl font-bold text-text-primary text-center">
                      {step.title}
                    </h4>
                    <div
                      className="mt-4 w-16 h-1 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
