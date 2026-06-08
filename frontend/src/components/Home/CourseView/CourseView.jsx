import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard.jsx";
import { getAllCourses } from "../../../servies/operations/courseOpertaions.js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "Trending", label: "Trending" },
  { key: "Live", label: "Live cohorts" },
  { key: "Community", label: "Community" },
];

const CourseView = () => {
  const [courseType, setCourseType] = useState("Trending");
  const [coursesList, setCoursesList] = useState();
  const railRef = useRef(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("getAllCourses");
    if (cached) {
      setCoursesList(JSON.parse(cached));
    } else {
      getAllCourses().then((data) => {
        if (!data) return;
        setCoursesList(data);
        sessionStorage.setItem("getAllCourses", JSON.stringify(data));
      });
    }
  }, [courseType]);

  const scroll = (dir) => {
    const el = railRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  const visible = (coursesList || []).filter((c) => {
    if (c?.status !== "Published") return false;
    if (courseType === "Live") return c.mode === "Online";
    if (courseType === "Community") return c.mode === "Hybrid";
    return true;
  });

  return (
    <section className="container-page py-20">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Catalog
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our <span className="gradient-text">courses</span>.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Curated tracks built with industry mentors. Project-led, outcome
            focused.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex rounded-lg border border-border bg-secondary/40 p-1">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setCourseType(t.key)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                  courseType === t.key
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="hidden sm:flex gap-1.5">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll(1)}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative mt-10">
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {!coursesList &&
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="min-w-[320px] animate-pulse rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[16/10] rounded-t-2xl bg-muted" />
                <div className="space-y-3 p-5">
                  <div className="h-4 w-3/4 rounded bg-muted" />
                  <div className="h-3 w-1/2 rounded bg-muted" />
                  <div className="h-8 w-full rounded bg-muted" />
                </div>
              </div>
            ))}
          {visible.map((card) => (
            <div key={card._id} className="snap-start">
              <CourseCard
                instructor={`${card.instructor?.firstName ?? ""} ${
                  card.instructor?.lastName ?? ""
                }`.trim() || "Unknown"}
                date={card.startDate}
                features={card.whatYouWillLearn}
                title={card.courseName}
                original_price={card.price}
                discounted_price={card.price - (20 / 100) * card.price}
                discount_percentage={20}
                img={card.thumbnail}
                id={card._id}
              />
            </div>
          ))}
          {coursesList && visible.length === 0 && (
            <p className="text-muted-foreground">No courses in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CourseView;
