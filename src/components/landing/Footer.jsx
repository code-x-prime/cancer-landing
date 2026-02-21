import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";

const Footer = () => (
  <footer className="bg-[#0E7490] text-background/80 py-12 border-t border-white/10">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid sm:grid-cols-2  gap-8 mb-3">
        <div>
          <div className="flex items-center">
            <Image src="/logo.png" alt="Panacea Medcare" width={128} height={128} className="w-52 h-auto object-contain brightness-0 invert" />
            
          </div>
          <p className="text-sm leading-relaxed">Your trusted medical travel facilitator connecting African patients with India&apos;s best cancer specialists.</p>
        </div>
        <div>
          <h3 className="font-bold text-background mb-3">Contact Us</h3>
          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2"><Phone size={14} /> +91 995 880 0961</p>
            <p className="flex items-center gap-2"><Mail size={14} /> care@panaceamedcare.com</p>
            <p className="flex items-center gap-2"><MapPin size={14} /> New Delhi, India</p>
          </div>
        </div>
       
      </div>

      <div className="border-t border-background/20 pt-6 space-y-4">
        <p className="text-xs leading-relaxed max-w-4xl mx-auto text-center">
          <strong>Disclaimer:</strong> Panacea Medcare is a medical facilitation company and does not provide medical advice. AI-assisted pre-screening is used to organise medical information and support faster specialist review. All diagnoses and treatment decisions are made exclusively by licensed hospitals and doctors in India. Treatment costs are indicative and subject to medical evaluation.
        </p>
        <p className="text-[10px] leading-relaxed max-w-3xl mx-auto text-center text-background/60">
          AI-assisted pre-screening is used only to organise medical information and support faster specialist review; all medical decisions are made by licensed doctors.
        </p>
        <p className="text-xs text-center">© {new Date().getFullYear()} Panacea Medcare. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
