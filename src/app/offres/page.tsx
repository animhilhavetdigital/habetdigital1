"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

const offers = [
  {
    id: "diagnostic",
    name: "Diagnostic",
    price: 99,
    description: "Mémoire + Pack de preuves structuré pour agir seul.",
    features: [
      "Analyse IA complète",
      "Rapport PDF mémoire",
      "Pack de preuves ordonnées",
      "Recommandations stratégiques",
    ],
    popular: false,
  },
  {
    id: "mediation",
    name: "Médiation",
    price: 199,
    description: "Rapport + Médiation amiable. Droit Habitat prend le relais.",
    features: [
      "Tout inclus dans le Diagnostic",
      "Mise en demeure recommandée",
      "Négociation amiable",
      "Suivi étape par étape",
      "Conciliation avec la partie prenante",
    ],
    popular: true,
  },
];

export default function OffresPage() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".offre-animate", {
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        toggleActions: "play none none none"
      },
      opacity: 0,
      scale: 0.95,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
      clearProps: "all"
    });
  }, { scope: ref });

  return (
    <>
      <Navbar />
      <main>
        <section className="relative pt-36 pb-16 md:pt-44 md:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-green/10 text-accent-greenStrong text-sm font-medium mb-6">
              Éligibilité confirmée
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.1] max-w-3xl mx-auto">
              Choisissez votre offre
            </h1>
            <p className="mt-5 text-base md:text-lg text-text-body max-w-2xl mx-auto">
              Un accompagnement adapté à chaque étape de votre dossier.
            </p>
          </div>
        </section>

        <section ref={ref} className="pb-24 md:pb-32">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="offre-animate group relative rounded-3xl border border-accent-slate/20 bg-background-main p-8 md:p-10 transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden shadow-md"
                >
                  {/* Dotted background pattern */}
                  <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, #22324B 1.5px, transparent 1.5px)', backgroundSize: '16px 16px' }} />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Title & Description */}
                    <div className="mb-8">
                      <h3 className="text-3xl font-light text-text-primary mb-2">{offer.name}</h3>
                      <p className="text-sm text-text-body">{offer.description}</p>
                    </div>

                    {/* Features */}
                    <ul className="space-y-4 mb-8 flex-grow">
                      {offer.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm text-text-body">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent-greenStrong shrink-0">
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Divider */}
                    <div className="h-px w-full bg-accent-slate/20 mb-8" />

                    {/* Price & Button */}
                    <div>
                      <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-5xl font-light text-text-primary">{offer.price} €</span>
                      </div>

                      <Link
                        href={`/paiement?offre=${offer.id}`}
                        className="inline-block px-8 py-3 rounded-full font-medium transition-colors duration-300 bg-surface-dark text-white hover:bg-accent-green shadow-md"
                      >
                        Choisir cette offre
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Garantie */}
            <div className="offre-animate mt-16 rounded-3xl bg-surface-dark px-8 py-10 text-center relative overflow-hidden">
              <div className="absolute top-[-20%] left-[-10%] w-[30vw] h-[30vw] rounded-full bg-accent-green/10 blur-[100px]" />
              <div className="relative z-10">
                <h3 className="text-xl md:text-2xl font-bold text-text-white mb-3">Satisfait ou remboursé</h3>
                <p className="text-base text-text-light max-w-xl mx-auto">
                  Si vous n'êtes pas satisfait de votre rapport dans les 7 jours suivant la réception, nous vous remboursons intégralement. Sans justification.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
