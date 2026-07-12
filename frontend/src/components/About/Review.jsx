import React, { useRef } from "react";
import { courseReviwe } from "../../data/courseReviwe";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const Review = () => {
  const railRef = useRef(null);
  const scroll = (dir) => {
    railRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  };

  return (
    <section className="container-page py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Reviews
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From other <span className="gradient-text">learners</span>.
          </h2>
        </div>
        <div className="flex gap-1.5">
          <Button variant="outline" size="icon" onClick={() => scroll(-1)} aria-label="Previous">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => scroll(1)} aria-label="Next">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={railRef}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {courseReviwe.map((item, i) => (
          <div
            key={i}
            className="snap-start min-w-[300px] max-w-[340px] flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 card-hover sm:min-w-[340px]"
          >
            <div className="flex items-start justify-between">
              <Quote className="h-6 w-6 text-primary/40" />
              <div className="flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star
                    key={k}
                    className={`h-3.5 w-3.5 ${
                      k < Math.round(item.rating)
                        ? "fill-amber-300"
                        : "fill-none text-border"
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="line-clamp-5 text-sm text-foreground">{item.review}</p>
            <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-amber-400 text-sm font-bold text-primary-foreground">
                {item.short}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-foreground">
                  {item.personName}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.programmingTech}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Review;
