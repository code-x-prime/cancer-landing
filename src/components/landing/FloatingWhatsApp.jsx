import Image from "next/image";


const FloatingWhatsApp = () => (
  <a
    href="https://wa.me/919958800961"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-20 sm:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
    aria-label="Chat on WhatsApp"
  >
    <Image src="/whatsapp.png" alt="WhatsApp" width={28} height={28} className="w-7 h-7" />
  </a>
);

export default FloatingWhatsApp;
