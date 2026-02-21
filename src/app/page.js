

import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import ProcessSection from '@/components/landing/ProcessSection';
import VideoTestimonials from '@/components/landing/VideoTestimonials';
import WhyIndiaSection from '@/components/landing/WhyIndiaSection';
import CostSection from '@/components/landing/CostSection';
import CancerTypesSection from '@/components/landing/CancerTypesSection';
import HospitalSection from '@/components/landing/HospitalSection';
import WhyPanaceaSection from '@/components/landing/WhyPanaceaSection';
import DocumentsSection from '@/components/landing/DocumentsSection';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/landing/Footer';
import FloatingWhatsApp from '@/components/landing/FloatingWhatsApp';
import StickyMobileCTA from '@/components/landing/StickyMobileCTA';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ProcessSection />
        <VideoTestimonials />
        <WhyIndiaSection />
        <CostSection />
        <CancerTypesSection />
        <HospitalSection />
        <WhyPanaceaSection />
        <DocumentsSection />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <StickyMobileCTA />
    </div>
  );
}
