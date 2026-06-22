"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface SolutionSectionProps {
  onStartForm?: () => void;
  onStartChat?: () => void;
  children?: React.ReactNode;
}

export default function SolutionSection({ onStartForm, onStartChat, children }: SolutionSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (children) return;

    const selectors = [
      ".float-card-1",
      ".float-card-2",
      ".float-card-3",
      ".float-card-4",
      ".float-card-5"
    ];

    selectors.forEach((selector, index) => {
      gsap.to(selector, {
        y: -15 - (index % 3) * 5, // Amplitude de flottement fluide
        duration: 3.0 + index * 0.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2,
      });
    });
  }, { scope: containerRef, dependencies: [children] });

  return (
    <section 
      ref={containerRef} 
      className="py-16 md:py-24 bg-background-main relative overflow-hidden select-none"
      style={{
        backgroundImage: "radial-gradient(rgba(34, 50, 75, 0.07) 1.5px, transparent 1.5px)",
        backgroundSize: "32px 32px",
      }}
    >
      {/* Decorative blurred background shapes */}
      <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent-green/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-[#22324B]/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Texte centré en haut */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-text-primary mb-4 leading-snug max-w-3xl mx-auto">
            Votre solution en 2 minutes
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-text-body leading-relaxed max-w-2xl mx-auto">
            Notre test gratuit analyse instantanément votre dossier et vous dit si vous pouvez récupérer vos droits. Gratuit, sans engagement, 100% en ligne.
          </p>
        </div>

        {children ? (
          /* Affichage du Chat si activé */
          <div className="max-w-4xl mx-auto transition-all duration-300">
            {children}
          </div>
        ) : (
          /* Grille interactive avec bouton central et cartes flottantes */
          <div className="relative w-full h-[520px] sm:h-[580px] md:h-[700px] flex items-center justify-center overflow-visible my-4">
            
            {/* 1. Carte Portrait de l'Avocate (Top-Left) - Plus grande et décalée vers la gauche sur desktop */}
            <div className="float-card-1 absolute left-[4%] top-[6%] md:left-[2%] md:top-[6%] border border-accent-slate/10 rounded-2xl shadow-xl transition-all duration-300 z-10 w-24 h-24 sm:w-28 sm:h-28 md:w-52 md:h-52 overflow-hidden scale-[0.78] sm:scale-90 md:scale-100 origin-left">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=250"
                alt="Me. Sarah L." 
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            {/* 2. Carte Toggle (Top-Right) - Plus grande et décalée vers la droite sur desktop */}
            <div className="float-card-2 absolute right-[4%] top-[8%] md:right-[3%] md:top-[10%] bg-white/95 backdrop-blur-md border border-accent-slate/10 p-3.5 md:p-6 rounded-2xl shadow-lg flex items-center justify-between gap-4 transition-all duration-300 z-10 w-40 md:w-64 scale-[0.78] sm:scale-90 md:scale-100 origin-right hidden sm:flex">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-base md:text-2xl shrink-0">⚡</span>
                <span className="font-bold text-xs md:text-xl text-text-primary truncate">Analyse IA 2.0</span>
              </div>
              <div className="w-9 h-5 md:w-12 md:h-6.5 bg-accent-green rounded-full p-0.5 flex items-center justify-end shrink-0 cursor-pointer">
                <div className="w-4 h-4 md:w-5.5 md:h-5.5 bg-white rounded-full shadow" />
              </div>
            </div>

            {/* 3. Bouton central rond - Agrandissement prononcé en desktop et mobile */}
            {onStartChat && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                {/* Anneau de pulsation externe */}
                <div className="absolute w-48 h-48 sm:w-56 sm:h-56 md:w-76 md:h-76 rounded-full bg-accent-green/10 animate-ping opacity-35" style={{ animationDuration: '3s' }} />
                
                {/* Conteneur bouton rond */}
                <button
                  onClick={onStartChat}
                  className="relative w-40 h-40 sm:w-44 sm:h-44 md:w-60 md:h-60 rounded-full bg-white border border-accent-green/20 shadow-[0_15px_40px_rgba(38,208,124,0.22)] hover:shadow-[0_20px_50px_rgba(38,208,124,0.35)] flex flex-col items-center justify-center text-center p-5 transition-all duration-300 hover:scale-105 group cursor-pointer"
                >
                  {/* Pointillés rotatifs en arrière-plan */}
                  <div className="absolute inset-3 rounded-full border border-dashed border-accent-green/25 group-hover:rotate-45 transition-transform duration-1000" />
                  
                  {/* Icône de Chat */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 rounded-full bg-accent-green/15 flex items-center justify-center mb-2 md:mb-4 text-accent-greenStrong group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-9 md:h-9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                  </div>
                  
                  {/* Texte du bouton */}
                  <span className="font-extrabold text-xs sm:text-sm md:text-xl text-accent-greenStrong uppercase tracking-wider">Test interactif</span>
                  <span className="text-[10px] md:text-sm text-text-body/60 mt-0.5 sm:mt-1 font-medium">2 min gratuit</span>
                </button>
              </div>
            )}

            {/* 4. Carte Statistique (Bottom-Left) - Plus grande et décalée vers la gauche sur desktop */}
            <div className="float-card-3 absolute left-[4%] bottom-[8%] md:left-[2%] md:bottom-[10%] bg-white/95 backdrop-blur-md border border-accent-slate/10 p-4 md:p-6 rounded-2xl shadow-lg transition-all duration-300 z-10 w-32 md:w-60 scale-[0.78] sm:scale-90 md:scale-100 origin-left">
              <div className="flex justify-between items-start mb-1">
                <div className="text-xl md:text-4xl font-extrabold text-accent-greenStrong">98%</div>
                <span className="text-[10px] md:text-xs text-accent-green bg-accent-green/10 px-1.5 py-0.5 rounded font-bold shrink-0">+12%</span>
              </div>
              <p className="text-[9px] md:text-xs text-text-body font-medium leading-tight mb-2">Taux de réussite dossiers éligibles</p>
              {/* Mini Trend Graph line (SVG) */}
              <svg className="w-full h-8 text-accent-green" viewBox="0 0 100 30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 25 Q 25 18, 45 22 T 85 8" />
              </svg>
            </div>

            {/* 5. Carte Image Solution (Bottom-Right) - Nettement plus grande (w-96) et décalée vers la droite sur desktop */}
            <div className="float-card-4 absolute right-[1%] md:-right-[2%] bottom-[8%] md:bottom-[8%] border border-accent-slate/10 rounded-2xl shadow-xl transition-all duration-300 z-10 w-36 sm:w-44 md:w-80 aspect-[4/3] overflow-hidden scale-[0.78] sm:scale-90 md:scale-100 origin-right">
              <img
                src="/photo/Gemini_Generated_Image_6z87n86z87n86z87.png"
                alt="Solution Droit Habitat"
                className="w-full h-full object-cover"
              />
            </div>

            {/* 6. Message Alerte Expert (Top-Center) - Placé en haut au centre sur desktop pour éviter le chevauchement avec l'image du bas */}
            <div className="float-card-5 absolute top-[2%] left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md border border-accent-slate/10 py-2.5 px-5 md:py-3.5 md:px-6 rounded-full shadow-lg flex items-center gap-3 transition-all duration-300 z-10 w-60 md:w-96 scale-[0.78] sm:scale-90 md:scale-100 justify-center hidden sm:flex">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                alt="Support Agent" 
                className="w-6 h-6 md:w-9 md:h-9 rounded-full object-cover shrink-0 border border-white"
              />
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse shrink-0" />
                <span className="text-[10px] md:text-sm font-semibold text-text-primary truncate">Expert : Votre dossier est éligible.</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
