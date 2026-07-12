import React from "react";
import { Link } from "react-router-dom";
import { Trophy, GraduationCap, Gem, Code2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Trophy,
    title: "Leadership",
    body: "Mentors who've shipped at scale — not just taught at it.",
    color: "text-violet-300",
    bg: "bg-violet-500/10",
  },
  {
    icon: GraduationCap,
    title: "Accountability",
    body: "1:1 reviews, weekly checkpoints, no learner left behind.",
    color: "text-rose-300",
    bg: "bg-rose-500/10",
  },
  {
    icon: Gem,
    title: "Flexibility",
    body: "Live cohorts or self-paced. Switch tracks when you need to.",
    color: "text-emerald-300",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Code2,
    title: "Build to learn",
    body: "42+ real-world projects per track. You ship, then you understand.",
    color: "text-amber-300",
    bg: "bg-amber-500/10",
  },
];

const HomeSection3 = () => {
  return (
    <section className="container-page py-20">
      <div className="grid items-end gap-8 lg:grid-cols-2">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          Get the skills you need for a{" "}
          <span className="gradient-text">job that&apos;s in demand.</span>
        </h2>
        <div className="flex flex-col items-start gap-5">
          <p className="text-muted-foreground">
            Today, a competitive engineer needs more than syntax. We teach the
            craft, the systems thinking, and the soft skills hiring managers
            actually filter for.
          </p>
          <Button asChild>
            <Link to="/dashboard/profile">
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {values.map(({ icon: Icon, title, body, color, bg }) => (
          <div
            key={title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 card-hover"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-2xl transition-opacity group-hover:opacity-100" />
            <div className={`mb-5 grid h-12 w-12 place-items-center rounded-xl ${bg} ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-4 rounded-2xl border border-border bg-gradient-to-br from-card to-card/40 p-8 sm:grid-cols-2 sm:p-12">
        <div>
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            Experience
          </p>
          <p className="mt-2 text-5xl font-bold tracking-tight text-foreground">
            10<span className="text-primary">+</span>{" "}
            <span className="text-base font-medium text-muted-foreground">years</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Designing learner-first programs since 2015.
          </p>
        </div>
        <div className="sm:border-l sm:border-border sm:pl-12">
          <p className="text-sm uppercase tracking-wider text-muted-foreground">
            Tracks
          </p>
          <p className="mt-2 text-5xl font-bold tracking-tight text-foreground">
            250<span className="text-primary">+</span>{" "}
            <span className="text-base font-medium text-muted-foreground">courses</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            From frontend basics to distributed systems.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HomeSection3;
