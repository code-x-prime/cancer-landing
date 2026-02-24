"use client";
import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ExternalLink, Stethoscope, ChevronLeft, ChevronRight } from "lucide-react";

const doctors = [
  {
    name: "Dr. Puneet Gupta",
    title: "Chairman – Oncology Services",
    hospital: "Fortis Memorial, Gurugram",
    image: "/doctor/puneet-gupta.webp",
    link: "https://panaceamedcare.com/doctors/puneet-gupta",
    desc: "Over 20 years of experience in surgical oncology. Specialist in gastrointestinal, breast & thoracic cancers. Trained at leading international cancer centres.",
  },
  {
    name: "Dr. Sangram Keshari Sahoo",
    title: "Director & Head – Surgical Oncology",
    hospital: "Apollo Hospitals, Delhi",
    image: "/doctor/sangram-keshari-sahoo.png",
    link: "https://panaceamedcare.com/doctors/sangram-keshari-sahoo",
    desc: "Renowned surgical oncologist with expertise in complex cancer surgeries including hepatobiliary, GI and urological cancers. 18+ years of practice.",
  },
  {
    name: "Dr. Ashok Vaid",
    title: "Chairman – Medical Oncology & BMT",
    hospital: "Medanta, Gurugram",
    image: "/doctor/ashok-vaid.jpeg",
    link: "https://panaceamedcare.com/doctors/ashok-vaid-medanta",
    desc: "Pioneer in bone marrow transplant in India. Has performed 1,000+ transplants. Specialises in blood cancers, breast and lung cancer.",
  },
  {
    name: "Dr. Harit Chaturvedi",
    title: "Chairman – Max Institute of Cancer Care",
    hospital: "Max Hospital, Saket",
    image: "/doctor/harit-chaturvedi.jpg",
    link: "https://panaceamedcare.com/doctors/harit-chaturvedi-max-saket",
    desc: "One of India's most respected head & neck oncology surgeons with 25+ years of experience. Treats over 3,000 new cancer patients annually.",
  },
  {
    name: "Dr. Dharma Choudhary",
    title: "Chairman – Haemato Oncology & BMT",
    hospital: "BLK-Max Hospital, Delhi",
    image: "/doctor/dharma-choudhary.jpg",
    link: "https://panaceamedcare.com/en/doctors/dharma-choudhary",
    desc: "Leading haematologist specialising in blood cancers — leukaemia, lymphoma, and myeloma. Expert in bone marrow & stem cell transplants.",
  },
  {
    name: "Dr. Sameer Kaul",
    title: "Sr. Consultant & Head – Surgical Oncology",
    hospital: "Apollo Hospitals, Delhi",
    image: "/doctor/sameer-kaul.jpg",
    link: "https://panaceamedcare.com/doctors/sameer-kaul-apollo",
    desc: "One of Apollo Delhi's most prominent surgical oncologists. Manages a major independently operating oncology unit with 20+ years of surgical excellence.",
  },
  {
    name: "Dr. Manish Singhal",
    title: "Head – Medical Oncology",
    hospital: "Apollo Hospitals, Delhi",
    image: "/doctor/manish-singhal.jpg",
    link: "https://panaceamedcare.com/doctors/manish-singhal-apollo",
    desc: "Senior medical oncologist specialising in breast, lung and colon cancers. Known for targeted therapy and immunotherapy protocols for advanced cancer.",
  },
  {
    name: "Dr. Vinod Raina",
    title: "Chairman – Oncosciences & Head, Medical Oncology",
    hospital: "Fortis Memorial, Gurugram",
    image: "/doctor/Dr.-Vinod-Raina.jpg",
    link: null,
    desc: "40+ years of experience. Former Head of Medical Oncology at AIIMS, New Delhi. Performed India's first high-dose chemotherapy & stem cell transplant in 1994.",
  },
  {
    name: "Dr. Vedant Kabra",
    title: "Principal Director – Surgical Oncology",
    hospital: "Fortis Memorial, Gurugram",
    image: "/doctor/dr-vedant-kabra.png",
    link: null,
    desc: "Performed 12,000+ cancer surgeries. Expert in robotic-assisted surgery, breast cancer, GI malignancies & head-neck oncosurgery. Gold Medalist — trained at Tata Memorial & NCC Singapore.",
  },
];

// Triple the list for seamless infinite loop
const allDoctors = [...doctors, ...doctors, ...doctors];

const DoctorsCarousel = () => {
  const scrollRef = useRef(null);

  // On mount — jump to middle third silently
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    // Use requestAnimationFrame to wait for layout
    requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth / 3;
    });
  }, []);

  // Seamless loop: when near edges, silently jump to middle
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const third = el.scrollWidth / 3;
    if (el.scrollLeft < 10) {
      el.scrollLeft += third;
    } else if (el.scrollLeft > third * 2 - el.clientWidth - 10) {
      el.scrollLeft -= third;
    }
  }, []);

  const CARD_W = 185; // approx card+gap width
  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? CARD_W * 2 : -CARD_W * 2, behavior: "smooth" });
  };

  return (
    <div className="w-full max-w-full overflow-hidden pt-6 pb-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-1.5">
          <Stethoscope size={13} className="text-primary" />
          <p className="text-[11px] uppercase tracking-widest font-bold text-primary/70">
            Consult with India&apos;s Top Oncology Specialists
          </p>
        </div>
        {/* Buttons */}
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={() => scroll("prev")}
            className="w-8 h-8 rounded-full border border-border bg-background hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center justify-center shadow-sm"
            aria-label="Previous"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll("next")}
            className="w-8 h-8 rounded-full border border-border bg-background hover:bg-primary hover:text-white hover:border-primary transition-colors flex items-center justify-center shadow-sm"
            aria-label="Next"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Scroll container */}
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-3 pb-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allDoctors.map((doc, i) => {
            const cardClass =
              "group/card flex-shrink-0 w-[170px] lg:w-[200px] rounded-xl overflow-hidden bg-white border border-border/60 shadow-md hover:shadow-xl hover:border-primary/40 transition-all";

            const cardInner = (
              <>
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary">
                  <Image
                    src={doc.image}
                    alt={doc.name}
                    fill
                    className="object-cover object-top group-hover/card:scale-105 transition-transform duration-500"
                    draggable="false"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-[12px] font-extrabold text-foreground leading-tight">{doc.name}</h4>
                    {doc.link && <ExternalLink size={10} className="text-muted-foreground mt-0.5 flex-shrink-0" />}
                  </div>
                  <p className="text-[10px] font-semibold text-primary leading-tight">{doc.title}</p>
                  <p className="text-[10px] text-muted-foreground/70 leading-tight italic">{doc.hospital}</p>
                  <p className="text-[10px] text-muted-foreground leading-snug mt-1 line-clamp-3">{doc.desc}</p>
                </div>
              </>
            );

            return doc.link ? (
              <a
                key={i}
                href={doc.link}
                target="_blank"
                rel="noopener noreferrer"
                draggable="false"
                className={cardClass}
              >
                {cardInner}
              </a>
            ) : (
              <div key={i} draggable="false" className={cardClass}>
                {cardInner}
              </div>
            );
          })}
        </div>
        <div className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
      </div>
    </div>
  );
};

export default DoctorsCarousel;
