"use client";

import { Shield, MessageCircle, Sparkles, Globe } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import LeadForm from "./LeadForm";

const HeroSection = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="gradient-hero py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-10 xl:gap-16 items-start">
          {/* Left Content */}
          <div className="order-2 lg:order-1 space-y-5 lg:space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 lg:px-4 lg:py-1.5 rounded-full text-xs lg:text-sm font-medium">
              <Shield size={14} />
              Serving patients from Nigeria, Kenya, Ethiopia, Ghana, Tanzania & across Africa
            </div>

            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-extrabold text-foreground leading-tight">
              Cancer Treatment in India
              <span className="block text-primary">for African Patients</span>
            </h1>

            <p className="text-lg lg:text-xl text-foreground/80 font-medium">
              Comprehensive Care from <span className="text-accent font-bold">USD 3,500</span>
            </p>

            <p className="text-muted-foreground text-base leading-relaxed max-w-lg">
              Advanced cancer treatment at leading Indian hospitals with complete medical, visa, and travel coordination by Panacea Medcare.
            </p>

            <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
              <Sparkles size={12} className="text-accent flex-shrink-0" />
              <span>AI-assisted medical case pre-screening for faster specialist review</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 py-6 shadow-lg shadow-accent/25"
              >
                Submit Medical Reports Now
              </Button>
              <a
                href="https://wa.me/919958800961"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-whatsapp text-whatsapp-foreground font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-whatsapp/25"
              >
                <Image src="/whatsapp.png" alt="WhatsApp" width={20} height={20} className="w-5 h-5" />
                Talk to a Care Expert
              </a>
            </div>
          </div>

          {/* Right Form */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24" id="lead-form">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
