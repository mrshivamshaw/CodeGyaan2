import React from "react";
import founding from "../../assets/aboutus/FoundingStory.84f2828a5f4a9c08a802.png";

const FoundingStory = () => {
  return (
    <section className="container-page py-20">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Our story
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our founding <span className="gradient-text">story</span>.
          </h2>
          <p className="text-muted-foreground">
            CodeGyaan started with a small group of educators, engineers, and
            lifelong learners — frustrated that great teaching was locked
            behind geography, cost, and outdated formats.
          </p>
          <p className="text-muted-foreground">
            We saw the limitations of traditional education firsthand. The
            classroom shouldn&apos;t be the ceiling. Today we&apos;re building
            the platform we wish we&apos;d had when we started — accessible,
            project-led, and rooted in real industry practice.
          </p>
        </div>
        <div className="relative">
          <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
          <img
            src={founding}
            alt="Founding story"
            className="relative rounded-2xl border border-border shadow-2xl shadow-black/40"
          />
        </div>
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-2">
        {[
          {
            title: "Our vision",
            body: "An open platform where anyone, anywhere can learn the skills that compound — and connect with people who care about the craft as much as they do.",
          },
          {
            title: "Our mission",
            body: "Deliver outcome-first programs that close the gap between learning a skill and earning from it. Mentor-led, project-driven, placement-supported.",
          },
        ].map((c) => (
          <div
            key={c.title}
            className="rounded-2xl border border-border bg-card p-8 card-hover"
          >
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">
              {c.title.split(" ")[0]}{" "}
              <span className="gradient-text">{c.title.split(" ")[1]}</span>.
            </h3>
            <p className="mt-4 text-muted-foreground">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoundingStory;
