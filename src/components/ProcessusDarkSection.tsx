"use client";

import "./processus-dark.css";

const STEPS = [
  {
    num: "1",
    title: "Test (2 min)",
    desc: "Vérifiez votre éligibilité en ligne instantanément grâce à notre formulaire intelligent d'analyse.",
    textPad: "lg:pr-52",
  },
  {
    num: "2",
    title: "Offre personnalisée",
    desc: "Découvrez nos solutions juridiques adaptées à votre dossier spécifique et le montant récupérable.",
    textPad: "lg:pl-52",
  },
  {
    num: "3",
    title: "Paiement sécurisé",
    desc: "Réglez en toute sérénité. Nous ne facturons que si votre dossier a de fortes chances de succès.",
    textPad: "lg:pr-52",
  },
  {
    num: "4",
    title: "Dossier activé",
    desc: "Nous prenons le relais immédiatement. Suivez l'avancée de votre litige depuis votre espace client.",
    textPad: "lg:pl-52",
  },
];

export default function ProcessusDarkSection() {
  return (
    <section
      className="min-h-screen text-center py-20 px-8 xl:px-0 flex flex-col justify-center font-[family-name:var(--font-raleway)] bg-[#50D995]"
    >
      {/* Sous-titre */}
      <span className="text-text-body text-lg max-w-lg mx-auto mb-2 capitalize flex items-center justify-center">
        Notre méthode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="text-[#50D995] ml-3 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </span>

      {/* Titre */}
      <h1 className="text-text-primary text-4xl md:text-5xl xl:text-6xl font-semibold max-w-3xl mx-auto mb-16 leading-snug">
        Comment ça marche ?
      </h1>

      {/* Grille 2×2 */}
      <div className="text-left grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto w-full">
        {STEPS.map((step) => (
          <div
            key={step.num}
            className={`pd-card bg-[#22324B] p-10 relative cursor-default rounded-[2rem]`}
          >
            {/* Cercle avec image de fond (clip-path animation) */}
            <div className="pd-circle" />

            {/* Contenu texte — padding pour éviter le chevauchement avec l’image */}
            <div className={`relative z-10 ${step.textPad}`}>
              <span className="block text-[#50D995] text-sm font-bold mb-2 tracking-wide uppercase">
                Étape {step.num}
              </span>
              <h2 className="capitalize text-white mb-4 text-2xl xl:text-3xl font-semibold leading-tight">
                {step.title}
              </h2>
              <p className="text-[#ADB3BA] text-base leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
