import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, Filter, SortDesc, Layers } from "lucide-react";

import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import CourseCard from "../Home/CourseView/CourseCard";
import {
  fetchCourseByCategory,
  getAllCourses,
  fetchCourseCategories,
} from "../../servies/operations/courseOpertaions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { key: "popular", label: "Most popular" },
  { key: "related", label: "Related" },
  { key: "frequent", label: "Frequently viewed" },
];

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const CategoryCourse = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [related, setRelated] = useState([]);
  const [frequent, setFrequent] = useState([]);
  const [tab, setTab] = useState("popular");
  const [categories, setCategories] = useState(() =>
    JSON.parse(sessionStorage.getItem("category") || "[]")
  );

  const meta = useMemo(
    () =>
      categories.find((c) => c._id === category) || {
        name: "Category",
        description: "",
      },
    [categories, category]
  );

  // keep category metadata fresh so a re-seed never strands this page
  useEffect(() => {
    fetchCourseCategories().then((c) => c && setCategories(c));
  }, []);

  useEffect(() => {
    fetchCourseByCategory(category).then(setCourses);
    // always fetch fresh course list for related/frequent rails
    getAllCourses().then((all) => {
      const shuffled = shuffle(all || []);
      setRelated(shuffled.slice(0, 8));
      setFrequent(shuffled.slice(8, 16));
    });
  }, [category]);

  const list =
    tab === "popular" ? courses : tab === "related" ? related : frequent;
  const published = list.filter((c) => c?.status === "Published");

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="container-page relative py-14">
          <nav className="mb-5 flex items-center gap-1 text-xs text-muted-foreground">
            <Link to="/" className="hover:text-foreground">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>Categories</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{meta.name}</span>
          </nav>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="outline" className="gap-1.5">
                <Layers className="h-3 w-3" /> Catalog
              </Badge>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                {meta.name}
              </h1>
              <p className="mt-3 text-muted-foreground">{meta.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4" /> Filter
              </Button>
              <Button variant="outline" size="sm">
                <SortDesc className="h-4 w-4" /> Sort
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="mb-8 inline-flex rounded-lg border border-border bg-secondary/40 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-all",
                tab === t.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {published.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center">
            <p className="text-muted-foreground">No courses to show.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {published.map((c) => (
              <CourseCard
                key={c._id}
                img={c.thumbnail}
                title={c.courseName}
                date={c.startDate}
                instructor={`${c.instructor?.firstName ?? ""} ${
                  c.instructor?.lastName ?? ""
                }`.trim() || "Unknown"}
                id={c._id}
                features={c.courseDescription}
                original_price={c.price}
                discounted_price={c.price - (20 / 100) * c.price}
                discount_percentage={20}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default CategoryCourse;
