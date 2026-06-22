"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "La transformation était remarquable à observer. En quelques mois, notre productivité a explosé tandis que les membres de l'équipe adoptaient le nouveau système et commençaient à livrer des résultats exceptionnels.",
    author: "Sally Taher",
    role: "Lead Designer chez Bastillo",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
    size: "lg",
    company: "bastillo"
  },
  {
    quote: "Son interface intuitive et ses analyses robustes sont essentielles pour naviguer sur les marchés.",
    author: "Jaylen Carter",
    role: "Spécialiste Crypto chez Nanowise",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
    size: "md",
    company: "nanowise"
  },
  {
    quote: "Depuis la mise en œuvre de cette solution, nous avons constaté une amélioration spectaculaire de notre efficacité analytique.",
    author: "Rachel Foster",
    role: "Responsable Stratégie Digitale chez Nexus Digital",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150",
    size: "md",
    company: "Nexus Digital"
  },
  {
    quote: "Une expérience vraiment fluide. Nous ne nous attendions pas à un retour sur investissement aussi rapide. Les perspectives sont incroyables et l'interface est d'une fluidité exceptionnelle.",
    author: "Linda Watts",
    role: "Directrice Commerciale chez Bastillo",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150",
    size: "md",
    company: "bastillo"
  },
  {
    quote: "Les perspectives propulsées par l'IA de la plateforme ont complètement transformé notre stratégie marketing du jour au lendemain.",
    author: "Evan Gessler",
    role: "PDG chez Gessler",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150",
    size: "sm",
    company: "GESSLER"
  },
  {
    quote: "Une valeur incroyable. C'est la meilleure décision financière que notre startup ait prise cette année, nous faisant économiser des centaines d'heures.",
    author: "Mark Evans",
    role: "Fondateur chez SyncTech",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
    size: "lg",
    company: "SyncTech"
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const column1Ref = useRef<HTMLDivElement>(null);
  const column2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Column 1 moving UP
    gsap.to(column1Ref.current, {
      yPercent: -50,
      ease: "none",
      duration: 35,
      repeat: -1,
    });

    // Column 2 moving DOWN
    gsap.fromTo(column2Ref.current, 
      { yPercent: -50 },
      { yPercent: 0, ease: "none", duration: 40, repeat: -1 }
    );

    // Scroll reveal animation
    gsap.from(".testimonial-reveal", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    });
  }, { scope: containerRef });

  // Separate array into two lanes
  const lane1 = [testimonials[0], testimonials[1], testimonials[2]];
  const lane2 = [testimonials[3], testimonials[4], testimonials[5]];

  // Duplicate for seamless infinite loop
  const col1Items = [...lane1, ...lane1];
  const col2Items = [...lane2, ...lane2];

  return (
    <section ref={containerRef} className="py-16 md:py-24 bg-background-main relative overflow-hidden">
      {/* Background Soft Gradients (SKILL.md style) */}
      <div className="absolute top-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-accent-green/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40vw] h-[40vw] rounded-full bg-text-primary/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column */}
          <div className="lg:col-span-5 relative flex flex-col">
            <h2 className="testimonial-reveal text-4xl md:text-5xl lg:text-[4rem] font-bold tracking-tight text-text-primary leading-[1.1] mb-6">
              Ce Que Disent<br/><span className="text-text-body font-light">Nos Clients</span>
            </h2>
            <p className="testimonial-reveal text-base md:text-lg text-text-body leading-relaxed mb-10 max-w-sm">
              Découvrez comment nos clients transforment leur croissance grâce à des solutions avancées. Voici exactement comment ils y sont parvenus.
            </p>
            
            {/* Video Card Container */}
            <div className="testimonial-reveal relative w-full aspect-[3/4] max-w-md rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(34,50,75,0.1)] group cursor-pointer border border-accent-slate/10">
              {/* Image background */}
              <div className="absolute inset-0 bg-surface-dark">
                 <img src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=800" className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" alt="David Pierce Video" />
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              
              {/* Top Info */}
              <div className="absolute top-8 left-8 right-8 text-white z-10">
                <h3 className="text-3xl font-bold mb-1">David Pierce</h3>
                <p className="text-sm text-white/80 font-medium">Consultant Marketing chez Giggle</p>
              </div>

              {/* Play Button Hover Effect */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-lg">
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </div>
              </div>
              
              {/* Video Controls Footer */}
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-white z-10">
                <div className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                  <span className="text-xs font-bold tracking-widest uppercase">0:00 / 0:06</span>
                </div>
                <div className="flex gap-4">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Grid (Infinite Vertical Marquee) */}
          <div className="testimonial-reveal lg:col-span-7 relative h-[600px] lg:h-auto">
            <div className="absolute inset-0 overflow-hidden -mx-4 px-4 sm:mx-0 sm:px-0">

              <div className="flex gap-6 w-full h-fit">
              
              {/* Column 1 (Moves UP) */}
              <div ref={column1Ref} className="flex-1 w-full sm:w-1/2">
                {col1Items.map((t, i) => (
                  <div key={`col1-${i}`} className="pb-6">
                    <div className={`w-full rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(34,50,75,0.04)] p-6 sm:p-8 flex flex-col transition-all duration-300 hover:bg-white/80 hover:shadow-md ${t.size === 'lg' ? 'min-h-[420px]' : t.size === 'md' ? 'min-h-[340px]' : 'min-h-[280px]'}`}>
                      <div className="mb-6">
                        <span className="text-xs font-bold text-text-primary uppercase tracking-widest">{t.company}</span>
                      </div>
                      <p className="text-xl md:text-2xl font-light text-text-primary leading-tight mb-8">
                        {t.quote}
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full bg-background-muted object-cover border border-accent-slate/20" />
                        <div>
                          <p className="text-base font-bold text-text-primary">{t.author}</p>
                          <p className="text-sm text-text-body">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Column 2 (Moves DOWN) */}
              <div ref={column2Ref} className="flex-1 hidden sm:block sm:w-1/2">
                {col2Items.map((t, i) => (
                  <div key={`col2-${i}`} className="pb-6">
                    <div className={`w-full rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_30px_rgba(34,50,75,0.04)] p-6 sm:p-8 flex flex-col transition-all duration-300 hover:bg-white/80 hover:shadow-md ${t.size === 'lg' ? 'min-h-[420px]' : t.size === 'md' ? 'min-h-[340px]' : 'min-h-[280px]'}`}>
                      <div className="mb-6">
                        <span className="text-xs font-bold text-text-primary uppercase tracking-widest">{t.company}</span>
                      </div>
                      <p className="text-xl md:text-2xl font-light text-text-primary leading-tight mb-8">
                        {t.quote}
                      </p>
                      <div className="flex items-center gap-4 mt-auto">
                        <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full bg-background-muted object-cover border border-accent-slate/20" />
                        <div>
                          <p className="text-base font-bold text-text-primary">{t.author}</p>
                          <p className="text-sm text-text-body">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
            </div>

            {/* Fluid "Flow" Fade Masks - Placed OUTSIDE overflow-hidden so they aren't clipped */}
            {/* Top Flow */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-background-main z-30 pointer-events-none"></div>
            <div className="absolute -top-10 -left-20 -right-20 h-48 bg-background-main blur-[40px] rounded-[100%] z-30 pointer-events-none"></div>

            {/* Bottom Flow */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-background-main z-30 pointer-events-none"></div>
            <div className="absolute -bottom-10 -left-20 -right-20 h-48 bg-background-main blur-[40px] rounded-[100%] z-30 pointer-events-none"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
