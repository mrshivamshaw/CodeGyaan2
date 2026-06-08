import React, { useEffect, useState } from "react";
import { ChevronDown, PlayCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseContent({ content, author }) {
  const [openId, setOpenId] = useState(null);
  const [lectures, setLectures] = useState(0);

  useEffect(() => {
    if (!content) return;
    setLectures(content.reduce((acc, s) => acc + (s.subSection?.length || 0), 0));
  }, [content]);

  return (
    <section className="mt-12 flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Course <span className="gradient-text">content</span>.
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {content?.length || 0} sections · {lectures} lectures
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {content?.map((section, i) => {
          const open = openId === section._id;
          return (
            <div key={section._id || i} className="border-b border-border last:border-b-0">
              <button
                onClick={() => setOpenId(open ? null : section._id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-secondary/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                    <BookOpen className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-foreground">
                      {section.sectionName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {section.subSection?.length || 0} lecture
                      {(section.subSection?.length || 0) !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-muted-foreground transition-transform",
                    open && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all",
                  open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <ul className="border-t border-border bg-background/40 px-5 py-3">
                    {section.subSection?.map((sub) => (
                      <li
                        key={sub._id}
                        className="flex items-center gap-2 py-2 text-sm text-muted-foreground"
                      >
                        <PlayCircle className="h-4 w-4 text-primary" />
                        {sub.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-6">
        <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Instructor
        </p>
        <div className="mt-4 flex items-center gap-4">
          <img
            src={author?.image}
            alt=""
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <p className="text-lg font-semibold text-foreground">
              {author?.firstName} {author?.lastName}
            </p>
            <p className="text-xs text-muted-foreground">
              Industry expert · CodeGyaan faculty
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
