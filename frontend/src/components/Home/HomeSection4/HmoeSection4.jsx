import React from "react";
import { Link } from "react-router-dom";
import {
  Code2,
  Trophy,
  GraduationCap,
  Briefcase,
  Gem,
  Bot,
  ArrowUpRight,
} from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "CodeGyaan Lab",
    body: "Cloud IDE + auto-graded sandboxes. No setup hell — write code from anywhere.",
    gradient: "from-cyan-500/30 to-blue-500/30",
    iconColor: "text-cyan-300",
  },
  {
    icon: Trophy,
    title: "Experience Portal",
    body: "570+ internship-grade projects. Real shipping repos, code reviews, demo days.",
    gradient: "from-rose-500/30 to-orange-500/30",
    iconColor: "text-rose-300",
  },
  {
    icon: GraduationCap,
    title: "Hall of Fame",
    body: "100k+ alumni placements across product teams at top tech companies.",
    gradient: "from-violet-500/30 to-fuchsia-500/30",
    iconColor: "text-violet-300",
  },
  {
    icon: Briefcase,
    title: "Job Portal",
    body: "Curated openings + AI resume builder. Zero spam, faster offers.",
    gradient: "from-amber-500/30 to-yellow-500/30",
    iconColor: "text-amber-300",
  },
  {
    icon: Gem,
    title: "Affiliate Program",
    body: "Share what you love, earn while learners win. Lifetime recurring payouts.",
    gradient: "from-emerald-500/30 to-teal-500/30",
    iconColor: "text-emerald-300",
  },
  {
    icon: Bot,
    title: "AI Tutor",
    body: "24/7 doubt solver fine-tuned on course material. Like office hours, always on.",
    gradient: "from-sky-500/30 to-indigo-500/30",
    iconColor: "text-sky-300",
  },
];

const HomeSection4 = () => {
  return (
    <section className="container-page py-20">
      <div className="max-w-2xl">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Ecosystem
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Everything you need, <span className="gradient-text">in one place.</span>
        </h2>
        <p className="mt-3 text-muted-foreground">
          One platform from your first line of code to your first offer letter.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, body, gradient, iconColor }) => (
          <Link
            key={title}
            to="/dashboard/profile"
            className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-6 card-hover"
          >
            <div
              className={`pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br ${gradient} opacity-30 blur-2xl transition-opacity group-hover:opacity-60`}
            />
            <div className={`grid h-12 w-12 place-items-center rounded-xl border border-border bg-background/60 ${iconColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {body}
            </p>
            <div className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-all group-hover:opacity-100">
              Explore <ArrowUpRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeSection4;
