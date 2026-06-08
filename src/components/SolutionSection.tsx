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

          {/* Boutons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {onStartForm ? (
              <button
                onClick={onStartForm}
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-accent-green text-text-primary font-bold shadow-lg shadow-accent-green/20 transition-all duration-300 hover:bg-accent-greenStrong hover:scale-105 hover:-translate-y-0.5"
              >
                Tester mon éligibilité
                <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ) : (
              <Link
                href="/onboarding"
                className="inline-flex items-center justify-center px-7 py-3.5 rounded-full bg-accent-green text-text-primary font-bold shadow-lg shadow-accent-green/20 transition-all duration-300 hover:bg-accent-greenStrong hover:scale-105 hover:-translate-y-0.5"
              >
                Tester mon éligibilité
                <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            )}

          </div>
        </div>

        {/* Image */}
        <div className="relative max-w-[90vw] mx-auto">
          <div className="rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(34,50,75,0.12)]">
            <img
              src="/photo/Gemini_Generated_Image_6z87n86z87n86z87.png"
              alt="Solution Droit Habitat"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
