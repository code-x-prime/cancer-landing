"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";

const doctors = [
  {
    name: "Dr. N. K. Pandey",
    title: "Chief- Robotic, Laparoscopic & Advanced Surgery",
    image: "/doctor/n-k-pandey.png",
    link: "https://panaceamedcare.com/doctors/nk-pandey"
  },
  {
    name: "Dr. Anshumali Misra",
    title: "Associate Director & Head – Plastic Surgery",
    image: "/doctor/anshumali-misra.png",
    link: "https://panaceamedcare.com/doctors/anshumali-misra"
  },
  {
    name: "Dr. (Col) Manjinder Sandhu",
    title: "Director - Cardiology",
    image: "/doctor/dr-(col)-manjinder-sandhu.png",
    link: "https://panaceamedcare.com/doctors/manjinder-sandhu-fortis"
  },
  {
    name: "Dr. Nisha Aggarwal",
    title: "Senior Consultant - Oncology",
    image: "/doctor/dr-nisha-aggarwal.png",
    link: "https://panaceamedcare.com/doctors/nisha-aggarwal-fortis"
  },
  {
    name: "Dr. Sandeep Budhiraja",
    title: "Group Medical Director",
    image: "/doctor/sandeep-budhiraja.jpeg",
    link: "https://panaceamedcare.com/doctors/sandeep-budhiraja-max-saket"
  },
  {
    name: "Dr. Anupam Bhargava",
    title: "Chairman - Urology",
    image: "/doctor/anupam-bhargava.jpg",
    link: "https://panaceamedcare.com/doctors/anupam-bhargava-max-saket"
  },
  {
    name: "Aakriti Aggarwal",
    title: "Senior Consultant",
    image: "/doctor/aakriti-aggarwal.jpg",
    link: "https://panaceamedcare.com/en/doctors/aakriti-aggarwal-marengo"
  },
  {
    name: "Dr. Dheeraj Gupta",
    title: "Senior Consultant - Neurosurgery",
    image: "/doctor/dheeraj-gupta.png",
    link: "https://panaceamedcare.com/doctors/dheeraj-gupta-marengo"
  }
];

const DoctorsCarousel = () => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="h-px flex-1 bg-border/50"></div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-primary/60 px-3">
          Consult with India&apos;s Top Oncology Specialists
        </p>
        <div className="h-px flex-1 bg-border/50"></div>
      </div>
      
      <div className="overflow-hidden relative group">
        <div className="flex animate-scroll hover:[animation-play-state:paused] gap-4 w-max">
          {[...doctors, ...doctors].map((doc, i) => (
            <a
              key={i}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-3 bg-white rounded-xl border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all min-w-[300px]"
            >
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-border">
                <Image 
                  src={doc.image} 
                  alt={doc.name} 
                  width={64} 
                  height={64} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[15px] font-bold text-foreground truncate">{doc.name}</h4>
                <p className="text-[12px] text-muted-foreground truncate leading-tight mt-0.5">{doc.title}</p>
              </div>
              <ExternalLink size={14} className="text-muted-foreground mr-1" />
            </a>
          ))}
        </div>
        
        {/* Fade gradients */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default DoctorsCarousel;
