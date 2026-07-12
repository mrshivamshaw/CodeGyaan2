import React from "react";
import { TrendingUp, BookOpen, GraduationCap, Briefcase } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: "55%",
    label: "Avg salary hike",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    icon: BookOpen,
    value: "600+",
    label: "Courses available",
    color: "text-sky-400",
    bg: "bg-sky-500/10",
  },
  {
    icon: GraduationCap,
    value: "12,000+",
    label: "Career transitions",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
  },
  {
    icon: Briefcase,
    value: "400+",
    label: "Hiring partners",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
];

const HomeDown = () => {
  return (
    <section className="container-page -mt-10 relative z-10">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map(({ icon: Icon, value, label, color, bg }) => (
          <div
            key={label}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card/80 px-4 py-4 backdrop-blur transition-all hover:border-primary/30 hover:bg-card"
          >
            <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-lg ${bg} ${color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-semibold tracking-tight text-foreground">
                {value}
              </p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeDown;
