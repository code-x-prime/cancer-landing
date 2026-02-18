"use client";

import { Button } from "@/components/ui/button";

const StickyMobileCTA = () => {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-background/95 backdrop-blur-md border-t border-border p-3">
      <Button
        onClick={scrollToForm}
        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-5"
      >
        Submit Medical Reports Now
      </Button>
    </div>
  );
};

export default StickyMobileCTA;
