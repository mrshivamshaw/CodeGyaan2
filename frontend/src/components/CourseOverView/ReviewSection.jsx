import React from "react";
import { Star, Quote } from "lucide-react";

const Stars = ({ rating = 5 }) => (
  <div className="flex items-center gap-0.5 text-amber-300">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-3.5 w-3.5 ${
          i < Math.round(rating) ? "fill-amber-300" : "fill-none text-border"
        }`}
      />
    ))}
  </div>
);

const ReviewSection = ({ reviews }) => {
  return (
    <section className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-3 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Course <span className="gradient-text">reviews</span>.
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {reviews?.length || 0} review{reviews?.length === 1 ? "" : "s"} from
            verified learners
          </p>
        </div>
        <div className="flex items-end gap-2">
          <p className="text-4xl font-bold tracking-tight text-foreground">
            4.8<span className="text-base text-muted-foreground">/5</span>
          </p>
          <Stars rating={5} />
        </div>
      </div>

      {!reviews || reviews.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No reviews yet — be the first to share your experience.
        </p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {reviews.map((item, i) => (
            <li
              key={i}
              className="flex flex-col gap-3 rounded-xl border border-border bg-background/40 p-5"
            >
              <Quote className="h-5 w-5 text-primary/40" />
              <div className="flex items-center gap-3">
                <img
                  src={item?.user?.image}
                  alt=""
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {item?.user?.firstName} {item?.user?.lastName}
                  </p>
                  <Stars rating={item?.rating} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{item?.review}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ReviewSection;
