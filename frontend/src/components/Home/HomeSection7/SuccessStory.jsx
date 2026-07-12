import React, { useEffect, useRef, useState } from "react";
import review from "../../../data/review";
import ReviewCard from "./ReviewCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SuccessStory = () => {
  const railRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      const el = railRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + 340 >= max ? 0 : el.scrollLeft + 340;
      el.scrollTo({ left: next, behavior: "smooth" });
    }, 4000);
    return () => clearInterval(interval);
  }, [paused]);

  const scroll = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="container-page py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Outcomes
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Success <span className="gradient-text">stories</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Real career transitions from people who didn&apos;t wait for
            permission.
          </p>
        </div>
        <div className="flex gap-1.5">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll(-1)}
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll(1)}
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={railRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className="mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {review.map((item, i) => (
          <div key={i} className="snap-start">
            <ReviewCard
              name={item.name}
              increment={item.salary_increment}
              short_name={item.short_name}
              feedback={item.feedback}
              course={item.course}
              history={item.history}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStory;
