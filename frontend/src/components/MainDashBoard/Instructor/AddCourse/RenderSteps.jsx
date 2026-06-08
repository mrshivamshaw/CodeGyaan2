import React from "react";
import { useSelector } from "react-redux";
import { Check } from "lucide-react";

import CourseBuilderForm from "./coursebuilder/CourseBuilderForm";
import CourseInformationForm from "./courseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Course information", sub: "Title, price, category" },
  { id: 2, title: "Course builder", sub: "Sections & lectures" },
  { id: 3, title: "Publish", sub: "Final review" },
];

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  return (
    <div className="flex flex-col gap-8">
      <ol className="grid grid-cols-3 gap-3">
        {steps.map((s) => {
          const active = step === s.id;
          const done = step > s.id;
          return (
            <li
              key={s.id}
              className={cn(
                "relative flex flex-col gap-2 rounded-xl border p-4 transition-all",
                active
                  ? "border-primary/40 bg-primary/5 shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]"
                  : done
                  ? "border-border bg-card"
                  : "border-dashed border-border bg-card/40"
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "grid h-7 w-7 place-items-center rounded-full text-xs font-bold",
                    active
                      ? "bg-primary text-primary-foreground"
                      : done
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : s.id}
                </span>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    active || done ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {s.title}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">{s.sub}</p>
            </li>
          );
        })}
      </ol>

      <div>
        {step === 1 && <CourseInformationForm />}
        {step === 2 && <CourseBuilderForm />}
        {step === 3 && <PublishCourse />}
      </div>
    </div>
  );
}
