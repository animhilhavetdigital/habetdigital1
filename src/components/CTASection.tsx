"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-animate", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, { scope: sectionRef });

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-16 md:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="cta-animate relative overflow-hidden rounded-[2.5rem] bg-surface-dark px-6 py-16 md:px-16 md:py-24 text-center">
          <div className="absolute top-[-20%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent-green/10 blur-[120px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-text-primary/10 blur-[100px]" />
          <div className="relative z-10">
            <h2 className="cta-animate text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto">
              Prêt à savoir si votre dossier vaut le coup ?
            </h2>
            <div className="cta-animate mt-12 flex justify-center">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-8 py-5 rounded-full bg-accent-green text-text-primary font-bold shadow-lg shadow-accent-green/20 transition-all duration-300 hover:bg-accent-greenStrong hover:text-white hover:scale-105 hover:-translate-y-0.5 whitespace-nowrap text-lg"
              >
                Faire le test gratuit — ça prend 2 min
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
