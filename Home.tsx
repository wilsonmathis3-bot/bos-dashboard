/*
 * Design: "Neural Cartography" — Data Visualization Aesthetic
 * Dark canvas with luminous data points, organic connectivity,
 * progressive revelation as you scroll.
 * Typography: Space Grotesk headings, JetBrains Mono for numbers, DM Sans body.
 */

import { useEffect, useRef, useState } from "react";
import { categories, integrations } from "@/data/integrations";
import IntegrationCard from "@/components/IntegrationCard";
import CategorySection from "@/components/CategorySection";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import BOSStrategy from "@/components/BOSStrategy";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (categoryId: string) => {
    const el = sectionRefs.current[categoryId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      <Navigation
        categories={categories}
        activeCategory={activeCategory}
        onCategoryClick={scrollToCategory}
      />

      <HeroSection />

      <main className="relative">
        {categories.map((category) => {
          const categoryIntegrations = integrations.filter(
            (i) => i.category === category.id
          );
          return (
            <CategorySection
              key={category.id}
              category={category}
              integrations={categoryIntegrations}
              ref={(el: HTMLElement | null) => {
                sectionRefs.current[category.id] = el;
              }}
            />
          );
        })}
      </main>

      <BOSStrategy />

      {/* Footer */}
      <footer className="relative py-20 border-t border-white/5">
        <div className="container max-w-5xl mx-auto text-center">
          <p className="font-mono text-sm text-white/30 mb-4">
            Research compiled June 2026
          </p>
          <p className="text-white/50 text-sm max-w-2xl mx-auto leading-relaxed">
            These 25 concepts represent significant whitespace because they require the convergence 
            of multiple distinct scientific disciplines — areas where traditional siloed patenting 
            and startup development struggle to operate.
          </p>
          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[#14f5c7] animate-glow-pulse" />
            <span className="font-mono text-xs text-white/30">BOS AI Integration Division</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
