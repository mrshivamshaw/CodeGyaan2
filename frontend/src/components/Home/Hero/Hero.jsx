import React from "react";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  PlayCircle,
  Star,
  Users,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const trustLogos = ["Google", "Microsoft", "Amazon", "Walmart", "LinkedIn"];

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />

      <div className="container-page relative pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-6">
            <Badge variant="glow" className="gap-1.5">
              <Sparkles className="h-3 w-3" />
              New cohort enrolling — Spring 2026
            </Badge>

            <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Upskill is made{" "}
              <span className="inline-flex items-center">
                <span className="text-muted-foreground/60">&lt;</span>
                <span className="gradient-text">
                  <Typewriter
                    options={{
                      strings: ["Practical", "Effortless", "Affordable"],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </span>
                <span className="text-muted-foreground/60">&gt;</span>
              </span>
              <br />
              with{" "}
              <span className="gradient-text">CodeGyaan</span>.
            </h1>

            <p className="max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
              Job-ready courses, hands-on labs, and a placement engine —
              everything you need to go from learner to hired. Built by
              practitioners who&apos;ve shipped at scale.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link to="/courses/category/6631d1590fbbb60e66870a9e">
                  Explore courses <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass">
                <Link to="/aboutus">
                  <PlayCircle className="h-5 w-5" /> Watch demo
                </Link>
              </Button>
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-6 border-t border-border pt-6">
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Learners
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-xl font-semibold text-foreground">
                  <Users className="h-4 w-4 text-primary" /> 12k+
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Rating
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-xl font-semibold text-foreground">
                  <Star className="h-4 w-4 fill-primary text-primary" /> 4.8/5
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  Salary hike
                </dt>
                <dd className="mt-1 flex items-center gap-1.5 text-xl font-semibold text-foreground">
                  <TrendingUp className="h-4 w-4 text-emerald-400" /> 55%
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl border border-border bg-card/60 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/40 via-transparent to-transparent opacity-60" />
              <div className="relative overflow-hidden rounded-xl border border-border/80 bg-background/80">
                <div className="flex items-center gap-1.5 border-b border-border/60 px-3 py-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-3 text-xs font-mono text-muted-foreground">
                    codegyaan.dev/learn
                  </span>
                </div>
                <div className="p-6 font-mono text-[13px] leading-relaxed">
                  <div className="text-muted-foreground">
                    <span className="text-pink-400">const</span>{" "}
                    <span className="text-sky-300">career</span> ={" "}
                    <span className="text-amber-300">await</span>{" "}
                    learn(&#123;
                  </div>
                  <div className="ml-4 text-muted-foreground">
                    track:{" "}
                    <span className="text-emerald-300">
                      &quot;Full-stack&quot;
                    </span>
                    ,
                  </div>
                  <div className="ml-4 text-muted-foreground">
                    mentor:{" "}
                    <span className="text-emerald-300">&quot;1:1&quot;</span>,
                  </div>
                  <div className="ml-4 text-muted-foreground">
                    projects: <span className="text-amber-300">42</span>,
                  </div>
                  <div className="ml-4 text-muted-foreground">
                    placement: <span className="text-amber-300">true</span>,
                  </div>
                  <div className="text-muted-foreground">&#125;);</div>
                  <div className="mt-3 text-xs text-emerald-400">
                    ✓ Compiled in 12 weeks. Ready to ship.
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card/90 p-3 shadow-xl backdrop-blur-xl sm:flex sm:items-center sm:gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-500/15 text-emerald-400">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Avg. hike</p>
                <p className="text-sm font-semibold">+₹6.4 LPA</p>
              </div>
            </div>
            <div className="pointer-events-none absolute -top-4 -right-4 hidden rounded-xl border border-border bg-card/90 px-3 py-2 shadow-xl backdrop-blur-xl sm:block">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Live cohort
              </p>
              <p className="text-sm font-semibold">2,300 enrolled</p>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Our alumni work at
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
            {trustLogos.map((l) => (
              <span
                key={l}
                className="text-lg font-semibold tracking-tight text-muted-foreground transition-colors hover:text-foreground"
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
