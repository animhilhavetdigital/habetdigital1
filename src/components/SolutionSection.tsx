"use client";

import Link from "next/link";

interface SolutionSectionProps {
  onStartForm?: () => void;
}

export default function SolutionSection({ onStartForm }: SolutionSectionProps) {
  return (
    <section className="py-24 md:py-32 bg-background-main relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Texte centré */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-semibold tracking-tight text-text-primary mb-6 leading-snug max-w-3xl mx-auto">
            Votre solution en 2 minutes
          </h2>
          <p className="text-base md:text-lg text-text-body leading-relaxed max-w-2xl mx-auto mb-8">
            Notre test gratuit analyse instantanément votre dossier et vous dit si vous pouvez récupérer vos droits. Gratuit, sans engagement, 100% en ligne.
          </p>

          {/* Boutons et Flèches */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
            
            {/* Flèche gauche */}
            <div className="hidden sm:flex animate-bounce-x-right">
              <svg className="w-8 h-8 text-accent-greenStrong" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            {onStartForm ? (
              <button
                onClick={onStartForm}
                className="inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl rounded-full bg-accent-green text-text-primary font-extrabold shadow-xl shadow-accent-green/30 transition-all duration-300 hover:bg-accent-greenStrong hover:scale-110 hover:-translate-y-1"
              >
                Tester mon éligibilité
                <svg className="ml-3 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ) : (
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center px-10 py-5 text-lg md:text-xl rounded-full bg-accent-green text-text-primary font-extrabold shadow-xl shadow-accent-green/30 transition-all duration-300 hover:bg-accent-greenStrong hover:scale-110 hover:-translate-y-1"
              >
                Tester mon éligibilité
                <svg className="ml-3 w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            )}

            {/* Flèche droite */}
            <div className="hidden sm:flex animate-bounce-x-left">
              <svg className="w-8 h-8 text-accent-greenStrong" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </div>

          </div>
        </div>
      </div>

      {/* Image élargie */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 mt-4 md:mt-8">
        <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(34,50,75,0.12)]">
          <img
            src="/photo/Gemini_Generated_Image_6z87n86z87n86z87.png"
            alt="Solution Droit Habitat"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
}
