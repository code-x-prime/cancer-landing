"use client";

import { Play, Star } from "lucide-react";

const testimonials = [
  {
    id: "kA_19g5gu04",
    patient: "Success Story: Global Care",
    location: "Nigeria"
  },
  {
    id: "yseSeL9Mt0k",
    patient: "Cancer Victory Journey",
    location: "Kenya"
  },
  {
    id: "J1KQqxqgCNg",
    patient: "Trust in Indian Oncology",
    location: "Ethiopia"
  },
  {
    id: "PpPQtRerK4Q",
    patient: "Expert Treatment Success",
    location: "Tanzania"
  },
  {
    id: "36YhoD4cmcA",
    patient: "Advanced Medical Care",
    location: "Ghana"
  },
  {
    id: "zSWuMIzJnZY",
    patient: "Compassionate Healing",
    location: "Cameroon"
  }
];

const VideoTestimonials = () => {
  return (
    <section className="py-16 bg-secondary/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Star size={14} className="fill-current" />
            Patient Success Stories
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-foreground">
            Voices of <span className="text-primary">Hope & Healing</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
            Real stories from international patients who chose Panacea Medcare for their cancer treatment journey in India.
          </p>
        </div>

        <div className="overflow-hidden relative group">
          <div className="flex animate-scroll hover:[animation-play-state:paused] gap-6 w-max pb-4">
            {[...testimonials, ...testimonials].map((video, i) => (
              <div
                key={i}
                className="w-[320px] sm:w-[400px] bg-white rounded-2xl overflow-hidden shadow-xl border border-border/50 group/card transition-all hover:border-primary/30"
              >
                <div className="aspect-video relative bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-5 space-y-1">
                  <h4 className="font-bold text-foreground text-lg flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    {video.patient}
                  </h4>
                  <p className="text-sm text-muted-foreground font-medium flex items-center justify-between">
                    <span>{video.location}</span>
                    <span className="text-xs bg-secondary px-2 py-0.5 rounded text-primary font-bold">Verified Case</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Side Fades */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-secondary/30 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-secondary/30 to-transparent pointer-events-none z-10"></div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2 font-medium">
            <Play size={14} className="text-accent" />
            More success stories available on our official channel
          </p>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
    </section>
  );
};

export default VideoTestimonials;
