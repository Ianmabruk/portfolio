import { useState } from 'react';
import ContactModal from './components/ContactModal';
import AboutSection from './sections/AboutSection';
import HeroSection from './sections/HeroSection';
import MarqueeSection from './sections/MarqueeSection';
import ProjectsSection from './sections/ProjectsSection';
import ServicesSection from './sections/ServicesSection';

/** The public portfolio. Served at / for every visitor, no authentication. */
export default function PortfolioSite() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#0C0C0C]">
      <HeroSection onContact={openContact} />
      <MarqueeSection />
      <AboutSection onContact={openContact} />
      <ServicesSection />
      <ProjectsSection />
      <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}