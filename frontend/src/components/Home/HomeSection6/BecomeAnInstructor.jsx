import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  DollarSign,
  Users,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const perks = [
  {
    icon: DollarSign,
    title: "Earn on every enrollment",
    body: "Industry-leading revenue share, paid monthly.",
  },
  {
    icon: Users,
    title: "Reach 12k+ learners",
    body: "Tap into an audience hungry for real, applied knowledge.",
  },
  {
    icon: BarChart3,
    title: "Built-in analytics",
    body: "See engagement, completion, and feedback in real time.",
  },
];

const BecomeAnInstructor = () => {
  return (
    <section className="container-page py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card via-card to-background p-8 sm:p-12 lg:p-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 -bottom-32 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-30" />

        <div className="relative grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start gap-5">
            <Badge variant="glow" className="gap-1.5">
              <Sparkles className="h-3 w-3" /> For experts
            </Badge>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Teach what you love.{" "}
              <span className="gradient-text">Earn what you&apos;re worth.</span>
            </h2>
            <p className="max-w-lg text-muted-foreground">
              Instructors from leading product teams reach millions on
              CodeGyaan. We give you the tools, distribution, and analytics —
              you bring the craft.
            </p>

            <ul className="mt-2 grid gap-4 sm:grid-cols-1">
              {perks.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background/40 p-3 backdrop-blur"
                >
                  <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {title}
                    </p>
                    <p className="text-xs text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/dashboard/profile">
                  Start teaching today <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/aboutus">Read instructor stories</Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  This month
                </p>
                <Badge variant="default">+24%</Badge>
              </div>
              <p className="mt-2 text-4xl font-bold tracking-tight text-foreground">
                ₹4,82,310
              </p>
              <p className="text-xs text-muted-foreground">
                Estimated payout • 312 enrollments
              </p>

              <div className="mt-6 space-y-4">
                {[
                  { label: "Course completion", v: 78 },
                  { label: "Avg. rating", v: 96 },
                  { label: "Repeat learners", v: 64 },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="mb-1 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{m.label}</span>
                      <span className="font-medium text-foreground">{m.v}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-amber-300"
                        style={{ width: `${m.v}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 hidden rounded-xl border border-border bg-card/95 px-4 py-3 shadow-xl backdrop-blur sm:block">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Avg. instructor
              </p>
              <p className="text-sm font-semibold text-foreground">
                ₹38L / yr
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BecomeAnInstructor;
