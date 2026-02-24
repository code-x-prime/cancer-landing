import { Phone, MapPin } from "lucide-react";
import Image from "next/image";

const Footer = () => (
  <footer
    className="text-white py-12 border-t border-white/10"
    style={{
      background: "linear-gradient(180deg, #0a3d52 0%, #0e6374 40%, #0e7490 70%, #0a5f75 100%)",
    }}
  >
    <div className="max-w-7xl mx-auto px-4">
      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">

        {/* Col 1 – Brand */}
        <div className="space-y-4">
          <Image
            src="/logo.png"
            alt="Panacea Medcare"
            width={180}
            height={60}
            className="h-auto object-contain brightness-0 invert"
          />
          <p className="text-sm text-white/75 leading-relaxed">
            Your trusted medical travel facilitator connecting African patients with India&apos;s best cancer specialists.
          </p>
        </div>

        {/* Col 2 – Get in Touch */}
        <div>
          <h3 className="font-bold text-white text-base mb-4">Get in Touch</h3>
          <div className="space-y-4">

            {/* Call */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                <Phone size={16} className="text-white" />
              </div>
              <div>
                <p className="text-xs text-white/60 mb-0.5">Call Us Now</p>
                <a href="tel:+919958800961" className="text-sm font-semibold text-white hover:text-white/80">+91-9958800961</a>
                <p className="text-xs text-white/50">24/7 Available</p>
              </div>
            </div>

            {/* Email → opens Gmail */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-0.5">Email Us</p>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=care@panaceamedcare.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-white hover:text-white/80"
                >
                  care@panaceamedcare.com
                </a>
                <p className="text-xs text-white/50">We&apos;ll respond quickly</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center flex-shrink-0">
                <Image src="/whatsapp.png" alt="WhatsApp" width={18} height={18} className="w-[18px] h-[18px] object-contain" />
              </div>
              <div>
                <p className="text-xs text-white/60 mb-0.5">WhatsApp Us</p>
                <a href="https://wa.me/919958800961" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-white/80 block">
                  +91-9958800961
                </a>
                <a href="https://wa.me/919958800962" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-white hover:text-white/80 block">
                  +91-9958800962
                </a>
                <p className="text-xs text-white/50">Instant Response</p>
              </div>
            </div>

          </div>
        </div>

        {/* Col 3 – Our Offices */}
        <div>
          <h3 className="font-bold text-white text-base mb-4">Our Offices</h3>
          <div className="bg-white/10 rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-white">Head Office</p>
            <div className="flex items-start gap-2 text-sm text-white/75">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-white/60" />
              <p className="leading-relaxed">
                Suite No. 402, Plot No. 996,<br />
                Sector 38, Gurgaon – 122001<br />
                Delhi NCR, India
              </p>
            </div>
            <div className="border-t border-white/10 pt-3 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/75">
                <Phone size={13} className="text-white/60 flex-shrink-0" />
                <a href="tel:+919958800961" className="hover:text-white">+91-9958800961</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/75">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-white/60 flex-shrink-0">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=care@panaceamedcare.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white break-all"
                >
                  care@panaceamedcare.com
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/20 pt-8 space-y-3">
        <p className="text-xs leading-relaxed max-w-4xl mx-auto text-center text-white/60">
          <strong className="text-white/80">Disclaimer:</strong> Panacea Medcare is a medical facilitation company and does not provide medical advice. AI-assisted pre-screening is used to organise medical information and support faster specialist review. All diagnoses and treatment decisions are made exclusively by licensed hospitals and doctors in India. Treatment costs are indicative and subject to medical evaluation.
        </p>
        <p className="text-xs leading-relaxed max-w-3xl mx-auto text-center text-white/50">
          AI-assisted pre-screening is used only to organise medical information and support faster specialist review; all medical decisions are made by licensed doctors.
        </p>
        <p className="text-xs text-center text-white/50 pt-1">
          © 2026 Panacea Medcare. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
