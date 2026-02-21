import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ExternalLink, Stethoscope } from "lucide-react";

const doctors = [
  {
    name: "Dr. Puneet Gupta",
    title: "Chairman – Oncology Services",
    image: "/doctor/puneet-gupta.png",
    link: "https://panaceamedcare.com/doctors/puneet-gupta",
  },
  {
    name: "Dr. Sangram Keshari Sahoo",
    title: "Director & Head- Surgical Oncology",
    image: "/doctor/sangram-keshari-sahoo.png",
    link: "https://panaceamedcare.com/doctors/sangram-keshari-sahoo",
  },
  {
    name: "Dr. Ashok Vaid",
    title: "Chairman - Medical Oncology, Hematology, and Stem Cell Transplant",
    image: "/doctor/ashok-vaid.jpeg",
    link: "https://panaceamedcare.com/doctors/ashok-vaid-medanta",
  },
  {
    name: "Dr. Harit Chaturvedi",
    title: "Chairman - Max Institute of Cancer Care",
    image: "/doctor/harit-chaturvedi.jpg",
    link: "https://panaceamedcare.com/doctors/harit-chaturvedi-max-saket",
  },
  {
    name: "Dr. Dharma Choudhary",
    title: "Chairman - Haemato Oncology & BMT",
    image: "/doctor/dharma-choudhary.jpg",
    link: "https://panaceamedcare.com/en/doctors/dharma-choudhary",
  }
];

const DoctorsCarousel = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Triple the items to ensure smooth infinite loop and enough content for wide screens
  const allDoctors = [...doctors, ...doctors, ...doctors];

  useEffect(() => {
    const slider = scrollRef.current;
    if (!slider) return;

    let animationFrameId;
    const speed = 0.8; // Adjust speed as needed

    const scroll = () => {
      if (!isPaused && !isDragging) {
        slider.scrollLeft += speed;
        
        // Loop back to center to maintain "infinite" feel
        const maxScroll = slider.scrollWidth / 3;
        if (slider.scrollLeft >= maxScroll * 2) {
          slider.scrollLeft -= maxScroll;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    // Initialize position to the middle third
    if (slider.scrollLeft === 0) {
      slider.scrollLeft = slider.scrollWidth / 3;
    }

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, isDragging]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Drag speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="w-full pt-6 pb-2">
      <div className="flex items-center gap-3 mb-5 px-1">
        <div className="h-px flex-1 bg-border/40"></div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <Stethoscope size={13} className="text-primary" />
          <p className="text-[11px] uppercase tracking-widest font-bold text-primary/70">
            Consult with India&apos;s Top Oncology Specialists
          </p>
        </div>
        <div className="h-px flex-1 bg-border/40"></div>
      </div>

      <div className="relative group overflow-hidden">
        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden gap-4 cursor-grab active:cursor-grabbing select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => { setIsPaused(false); setIsDragging(false); }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={() => setIsDragging(false)}
        >
          {allDoctors.map((doc, i) => (
            <a
              key={i}
              href={doc.link}
              target="_blank"
              rel="noopener noreferrer"
              draggable="false"
              className="group/card flex-shrink-0 w-[250px] rounded overflow-hidden bg-white border border-border/60 shadow-lg hover:shadow-xl hover:border-primary/40 transition-all mb-4"
              onClick={(e) => {
                // Prevent click if we were just dragging
                if (isDragging) e.preventDefault();
              }}
            >
              <div className="relative w-full aspect-[9/16] overflow-hidden bg-gradient-to-br from-primary/10 to-secondary pointer-events-none">
                <Image
                  src={doc.image}
                  alt={doc.name}
                  fill
                  className="object-cover object-top group-hover/card:scale-105 transition-transform duration-500"
                  draggable="false"
                />
              </div>

              <div className="p-3 flex items-start justify-between gap-1 pointer-events-none">
                <div className="min-w-0">
                  <h4 className="text-[12px] font-extrabold text-foreground leading-tight line-clamp-1">{doc.name}</h4>
                  <p className="text-[10px] text-muted-foreground leading-tight mt-0.5 line-clamp-2">{doc.title}</p>
                </div>
                <ExternalLink size={11} className="text-muted-foreground mt-0.5 flex-shrink-0" />
              </div>
            </a>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      </div>
    </div>
  );
};

export default DoctorsCarousel;

