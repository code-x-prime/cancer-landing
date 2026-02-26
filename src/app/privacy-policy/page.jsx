import React from 'react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import { ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Panacea Medcare',
  description: 'Privacy Policy for Panacea Medcare. Learn how we respect and protect your personal and medical information.',
};

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 overflow-hidden pt-10 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Panacea Medcare respects your privacy and is committed to protecting your personal and medical information.
            </p>
          </div>

          <div className="glass rounded-2xl p-8 md:p-12 shadow-xl space-y-10 text-foreground/90 leading-relaxed border border-border/50">
            
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
                Information We Collect
              </h2>
              <p>
                When you fill out our form or contact us through WhatsApp, phone, or email, we may collect:
              </p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>Full name</li>
                <li>Contact details (phone number, WhatsApp number, email)</li>
                <li>Country of residence</li>
                <li>Medical reports and health information voluntarily shared by you</li>
              </ul>
              <p className="text-sm italic text-muted-foreground mt-4 p-4 bg-secondary/50 rounded-lg border border-border/40">
                This information is collected only for the purpose of providing medical consultation and treatment coordination services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
                How We Use Your Information
              </h2>
              <p>Your information is used to:</p>
              <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                <li>Review your medical case</li>
                <li>Share your reports with partner hospitals and doctors (only when required)</li>
                <li>Provide treatment plans and cost estimates</li>
                <li>Assist with visa, travel, and treatment arrangements</li>
                <li>Contact you regarding your inquiry</li>
              </ul>
              <p className="font-semibold text-foreground/90 mt-4">
                We do not sell, rent, or trade your personal information to third parties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
                Medical Information Protection
              </h2>
              <p>
                Any medical records shared with us are treated as strictly confidential.
              </p>
              <p>
                We share medical details only with authorized doctors or hospitals involved in your treatment process.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
                Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect your data from unauthorized access, misuse, or disclosure.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
                Third-Party Services
              </h2>
              <p>
                Our website may use third-party services such as Google Ads, Google Analytics, or Meta platforms for advertising and performance tracking. These services may use cookies to improve user experience and measure campaign effectiveness.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-primary flex items-center gap-2 border-b border-border/50 pb-2">
                Your Consent
              </h2>
              <p>
                By submitting your information on our website, you consent to the collection and use of your data as described in this Privacy Policy.
              </p>
            </section>

            <section className="space-y-4 bg-primary/5 p-6 rounded-xl border border-primary/20">
              <h2 className="text-2xl font-bold text-primary mb-4">
                Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions regarding this Privacy Policy, you may contact us at:
              </p>
              <address className="not-italic space-y-2 text-foreground">
                <p className="font-bold text-lg">Panacea Medcare</p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Email:</span> 
                  <a href="mailto:care@panaceamedcare.com" className="text-primary hover:underline group inline-flex items-center gap-1">
                    care@panaceamedcare.com
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <span className="font-medium">Phone / WhatsApp:</span> 
                  <a href="https://wa.me/919958800961" className="text-primary hover:underline group inline-flex items-center gap-1">
                    +91-9958800961
                  </a>
                </p>
              </address>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
