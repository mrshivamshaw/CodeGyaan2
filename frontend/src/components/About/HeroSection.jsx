import React from "react";
import mig1 from "../../assets/aboutus/aboutus1.png";
import mig2 from "../../assets/aboutus/aboutus2.png";
import mig3 from "../../assets/aboutus/aboutus3.f5cfba861877ea03735d.png";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

      <div className="container-page relative pt-16 pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="glow" className="gap-1.5">
            <Sparkles className="h-3 w-3" /> About CodeGyaan
          </Badge>
          <h1 className="mt-6 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Driving innovation in online education for a{" "}
            <span className="gradient-text">brighter future</span>.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-balance text-muted-foreground">
            We&apos;re passionate about making cutting-edge education
            accessible — combining technology, expert instructors, and a vibrant
            community.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {[mig1, mig2, mig3].map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          ))}
        </div>

        <p className="mx-auto mt-16 max-w-4xl text-balance text-center text-xl font-medium leading-snug text-foreground sm:text-2xl lg:text-3xl">
          We unite{" "}
          <span className="gradient-text">technology</span>,{" "}
          <span className="gradient-text">expertise</span>, and{" "}
          <span className="gradient-text">community</span> into one
          unparalleled learning experience.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
