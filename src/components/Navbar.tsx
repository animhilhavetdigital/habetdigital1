"use client";

import Image from "next/image";
import Link from "next/link";

function GridIcon() {
  return (
    <div className="grid grid-cols-3 gap-[3px]">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="w-[3px] h-[3px] rounded-full bg-text-body/60"
        />
      ))}
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-max">
      <div className="bg-surface-glass backdrop-blur-md border border-white/40 shadow-[0_8px_40px_rgba(34,50,75,0.12)] rounded-[28px] px-3.5 py-3 sm:px-5 sm:py-3.5 flex items-center gap-3 sm:gap-5 justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0 mr-1 sm:mr-4">
          <Image
            src="/107240.png"
            alt="DroitHabitat"
            width={230}
            height={52}
            className="h-[28px] sm:h-[34px] w-auto"
            priority
          />
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Grid Icon Button */}
          <button
            type="button"
            aria-label="Menu"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-background-muted border border-accent-slate/15 flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-105"
          >
            <GridIcon />
          </button>

          {/* Calendar Button */}
          <button
            type="button"
            aria-label="Planifier"
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-surface-dark flex items-center justify-center shadow-lg shadow-surface-dark/25 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            <Image
              src="/calendrier-de-planification.png"
              alt="Calendrier"
              width={24}
              height={24}
              className="w-5 h-5 sm:w-6 sm:h-6 object-contain invert"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
