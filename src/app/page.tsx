"use client";

import { useEffect } from "react";
import { LangProvider }     from "@/context/LangContext";
import { WaitlistProvider } from "@/context/WaitlistContext";
import { useWaitlist }      from "@/context/WaitlistContext";
import WaitlistModal        from "@/components/WaitlistModal";
import Navbar               from "@/components/Navbar";
import Hero                 from "@/components/Hero";
import AppPreview           from "@/components/AppPreview";
import Features             from "@/components/Features";
import Barbers              from "@/components/Barbers";
import HowItWorks           from "@/components/HowItWorks";
import FAQ                  from "@/components/FAQ";
import About                from "@/components/About";
import Download             from "@/components/Download";
import Footer               from "@/components/Footer";

function PageContent() {
  const { open, closeModal } = useWaitlist();

  useEffect(() => {
    // Mark document ready so CSS hides elements for animation
    document.documentElement.classList.add("js-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // Stop observing once visible — no need to re-trigger
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    // Small delay so elements are in DOM before observer attaches
    const timer = setTimeout(() => {
      document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal-ready");
    };
  }, []);

  return (
    <>
      <main className="min-h-screen bg-ink overflow-x-hidden">
        <Navbar />
        <Hero />
        <AppPreview />
        <Features />
        <Barbers />
        <HowItWorks />
        <FAQ />
        <About />
        <Download />
        <Footer />
      </main>
      <WaitlistModal open={open} onClose={closeModal} />
    </>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <WaitlistProvider>
        <PageContent />
      </WaitlistProvider>
    </LangProvider>
  );
}
