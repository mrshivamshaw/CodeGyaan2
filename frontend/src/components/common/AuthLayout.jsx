import React from "react";
import { Link } from "react-router-dom";
import { Code2, Check, Sparkles } from "lucide-react";

const highlights = [
  "1:1 mentorship from product-team engineers",
  "42+ project-driven assignments per track",
  "Direct referrals to 500+ hiring partners",
  "Lifetime access to recordings + community",
];

const AuthLayout = ({ title, subtitle, children, eyebrow = "Welcome" }) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden border-r border-border bg-card lg:flex lg:flex-col lg:justify-between">
          <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />
          <div className="pointer-events-none absolute -left-32 top-1/3 h-[500px] w-[500px] rounded-full bg-primary/15 blur-3xl" />
          <div className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative p-10">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-amber-400 text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)]">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-xl font-semibold tracking-tight">
                Code<span className="gradient-text">Gyaan</span>
              </span>
            </Link>
          </div>

          <div className="relative px-10 py-12">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              Spring 2026 cohort open
            </div>
            <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground">
              The fast track from{" "}
              <span className="gradient-text">curious to hired</span>.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              12k+ engineers reskilled and placed at top product companies.
              Practical, project-led, mentor-guided.
            </p>

            <ul className="mt-8 space-y-3">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3 w-3" />
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative p-10">
            <div className="rounded-xl border border-border bg-background/40 p-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-primary to-amber-400 font-bold text-primary-foreground">
                  PR
                </div>
                <div>
                  <p className="text-sm font-semibold">Priya R.</p>
                  <p className="text-xs text-muted-foreground">
                    SDE-2 @ Razorpay
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">
                “Went from QA tester to backend engineer in 7 months. The
                mentorship was the difference.”
              </p>
            </div>
          </div>
        </aside>

        <main className="flex flex-col items-center justify-center p-6 sm:p-10">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 lg:hidden"
          >
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-amber-400 text-primary-foreground">
              <Code2 className="h-4 w-4" />
            </div>
            <span className="text-lg font-semibold tracking-tight">
              Code<span className="gradient-text">Gyaan</span>
            </span>
          </Link>

          <div className="w-full max-w-md">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
              {eyebrow}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            )}
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AuthLayout;
