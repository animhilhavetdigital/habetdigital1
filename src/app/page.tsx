import Navbar from "@/components/Navbar";
import LandingPage from "@/components/LandingPage";


import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <LandingPage />
        <div className="relative z-10">
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </div>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
