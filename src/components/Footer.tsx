"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".footer-reveal", {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: "power3.out",
      stagger: 0.08,
    });
  }, { scope: sectionRef });

  return (
    <footer ref={sectionRef} className="border-t border-accent-slate/15 bg-background-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          
          {/* Colonne 1 : Logo + Tagline */}
          <div className="footer-reveal">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Image
                src="/107240.png"
                alt="DroitHabitat"
                width={150}
                height={38}
                className="h-8 w-auto"
              />
            </Link>
            <p className="text-sm text-text-body leading-relaxed max-w-xs">
              La solution experte pour analyser et agir sur vos litiges de crédit à la consommation.
            </p>
          </div>

          {/* Colonne 2 : Liens */}
          <div className="footer-reveal">
            <h4 className="text-sm font-semibold text-text-primary mb-4">Liens utiles</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-text-body hover:text-accent-green transition-colors">
                  Comment ça marche
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-text-body hover:text-accent-green transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-text-body hover:text-accent-green transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-sm text-text-body hover:text-accent-green transition-colors">
                  Mentions légales
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Coordonnées */}
          <div className="footer-reveal">
            <h4 className="text-sm font-semibold text-text-primary mb-4">Nous contacter</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:contact@droithabitat.fr" className="text-sm text-text-body hover:text-accent-green transition-colors flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  contact@droithabitat.fr
                </a>
              </li>
              <li>
                <a href="tel:+33123456789" className="text-sm text-text-body hover:text-accent-green transition-colors flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  +33 1 23 45 67 89
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Réseaux sociaux */}
          <div className="footer-reveal">
            <h4 className="text-sm font-semibold text-text-primary mb-4">Suivez-nous</h4>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background-main border border-accent-slate/20 flex items-center justify-center text-text-light hover:text-accent-green hover:border-accent-green transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background-main border border-accent-slate/20 flex items-center justify-center text-text-light hover:text-accent-green hover:border-accent-green transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background-main border border-accent-slate/20 flex items-center justify-center text-text-light hover:text-accent-green hover:border-accent-green transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

        </div>

        <div className="footer-reveal mt-12 pt-8 border-t border-accent-slate/15 text-center">
          <p className="text-sm text-text-light">
            © {new Date().getFullYear()} DroitHabitat. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
