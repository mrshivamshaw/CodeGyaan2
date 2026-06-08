import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Building2,
  Wrench,
  CalendarClock,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
  {
    id: "mentors",
    icon: Users,
    title: "Guidance at every step",
    eyebrow: "1:1 Mentorship",
    body: "Top mentors from product companies guide you through career-defining decisions — pair programming, code reviews, mock interviews.",
    bullets: [
      "Weekly 1:1 sessions",
      "Resume + portfolio review",
      "Career roadmap planning",
    ],
    stat: { value: "500+", label: "Active mentors" },
    accent: "from-blue-500/20 to-cyan-500/10",
    glow: "bg-blue-500/30",
  },
  {
    id: "placements",
    icon: Building2,
    title: "One-stop placement engine",
    eyebrow: "Placement support",
    body: "Resume support, mock interviews, exclusive partner roles. We close the loop from skill to offer letter.",
    bullets: [
      "500+ hiring partners",
      "Direct referrals & drives",
      "Salary negotiation support",
    ],
    stat: { value: "1,500+", label: "Placements made" },
    accent: "from-emerald-500/20 to-teal-500/10",
    glow: "bg-emerald-500/30",
  },
  {
    id: "experience",
    icon: Wrench,
    title: "Real-time industry experience",
    eyebrow: "Hands-on projects",
    body: "Learn by shipping. Production-grade builds, design reviews, deploys to real infra — get your experience letter.",
    bullets: ["15+ domains", "430+ projects", "Verified internship letter"],
    stat: { value: "3,000+", label: "Interns shipped" },
    accent: "from-rose-500/20 to-orange-500/10",
    glow: "bg-rose-500/30",
  },
  {
    id: "flexible",
    icon: CalendarClock,
    title: "Flexible learning for you",
    eyebrow: "Your pace",
    body: "Live cohorts when you crave structure, self-paced when life happens. Switch between formats anytime.",
    bullets: ["15+ self-paced", "10+ live cohorts", "Lifetime access"],
    stat: { value: "24/7", label: "Replay access" },
    accent: "from-violet-500/20 to-fuchsia-500/10",
    glow: "bg-violet-500/30",
  },
];

const HomeSection5 = () => {
  const [active, setActive] = useState(features[0].id);
  const current = features.find((f) => f.id === active);

  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Why CodeGyaan
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          From <span className="gradient-text">learning to earning</span>.
        </h2>
        <p className="mt-3 text-muted-foreground">
          Four pillars that turn study time into job offers.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[280px,1fr]">
        <div role="tablist" className="flex flex-col gap-2">
          {features.map((f) => {
            const isActive = f.id === active;
            const Icon = f.icon;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.id)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl border p-4 text-left transition-all",
                  isActive
                    ? "border-primary/40 bg-card shadow-[0_0_0_1px_hsl(var(--primary)/0.2),0_20px_60px_-20px_hsl(var(--primary)/0.3)]"
                    : "border-border bg-card/40 hover:border-border hover:bg-card"
                )}
              >
                <div
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-lg transition-colors",
                    isActive
                      ? "bg-primary/15 text-primary"
                      : "bg-secondary text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {f.eyebrow}
                  </p>
                  <p
                    className={cn(
                      "truncate text-sm font-semibold",
                      isActive ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {f.title}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div
          key={current.id}
          className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 animate-fade-up"
        >
          <div
            className={cn(
              "pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full opacity-50 blur-3xl",
              current.glow
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40",
              current.accent
            )}
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <Badge variant="outline" className="border-border/60">
                {current.eyebrow}
              </Badge>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {current.title}
              </h3>
              <p className="mt-3 text-muted-foreground">{current.body}</p>
              <ul className="mt-6 space-y-2.5">
                {current.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <Check className="h-4 w-4 text-primary" /> {b}
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-7">
                <Link to="/dashboard/profile">
                  Explore <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {current.stat.label}
                </p>
                <p className="mt-2 text-6xl font-bold tracking-tight text-foreground">
                  {current.stat.value}
                </p>
                <div className="mt-6 space-y-3">
                  {[88, 64, 92].map((w, i) => (
                    <div key={i}>
                      <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
                        <span>Cohort {i + 1}</span>
                        <span>{w}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-amber-300"
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection5;
