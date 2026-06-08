import React from "react";

const stats = [
  { v: "12k+", l: "Active learners" },
  { v: "120+", l: "Mentors" },
  { v: "600+", l: "Courses" },
  { v: "4.8", l: "Avg. rating" },
];

const MiddleBanner = () => {
  return (
    <section className="border-y border-border bg-card/40">
      <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.l}
            className="flex flex-col items-center text-center"
          >
            <p className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span className="gradient-text">{s.v}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.l}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MiddleBanner;
