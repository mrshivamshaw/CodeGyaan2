import React from "react";
import {
  Globe,
  BookOpen,
  Award,
  Star,
  Wrench,
  Briefcase,
} from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Learning methods",
    body: "Live + self-paced cohorts, peer review, and 1:1 mentorship.",
  },
  {
    icon: Award,
    title: "Certification",
    body: "Verified completion certificates trusted by 500+ partners.",
  },
  {
    icon: Star,
    title: "Auto-grading",
    body: "Instant feedback on assignments — improve while it's fresh.",
  },
  {
    icon: Wrench,
    title: "Industry curriculum",
    body: "Updated quarterly with input from active practitioners.",
  },
  {
    icon: Briefcase,
    title: "Ready to work",
    body: "Built around the actual interviews you'll face — not theory.",
  },
];

const WorldClass = () => {
  return (
    <section className="container-page py-20">
      <div className="grid items-start gap-12 lg:grid-cols-[1fr,1.4fr]">
        <div className="lg:sticky lg:top-24">
          <Globe className="h-10 w-10 text-primary" />
          <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            World-class learning for{" "}
            <span className="gradient-text">anyone, anywhere</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
            We partner with 275+ universities and product companies to make
            flexible, job-relevant online learning accessible — globally.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {features.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className={`rounded-2xl border border-border bg-card p-6 card-hover ${
                i === 0 ? "sm:col-span-2" : ""
              }`}
            >
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorldClass;
