"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: "Le test est-il vraiment gratuit ?",
    a: "Oui, et il le restera.",
  },
  {
    q: "Combien coûte une médiation ?",
    a: "Le prix vous est révélé après le test, si vous êtes éligible.",
  },
  {
    q: "Puis-je agir seul après le diagnostic ?",
    a: "Absolument. Le pack de preuves est conçu pour ça.",
  },
  {
    q: "Qu'est-ce qui rend mon dossier éligible ?",
    a: "Démarchage, vente à domicile, délais non respectés...",
  },
  {
    q: "Combien de temps dure une médiation ?",
    a: "En moyenne 3 à 6 semaines.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".faq-item", {
      scrollTrigger: { trigger: ref.current, start: "top 80%" },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
    });
  }, { scope: ref });

  return (
    <section ref={ref} className="py-16 md:py-24 bg-background-main">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-text-primary">
            Questions fréquentes
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="faq-item rounded-2xl border border-accent-slate/80 bg-white overflow-hidden"
            >
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-text-primary text-sm md:text-base pr-4">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-text-light shrink-0 transition-transform duration-300 ${
                    openIdx === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-text-body text-sm leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
