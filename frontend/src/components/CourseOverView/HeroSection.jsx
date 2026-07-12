import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Globe,
  Star,
  Users,
  GraduationCap,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const HeroSection = ({ course }) => {
  if (!course)
    return (
      <div className="h-40 animate-pulse rounded-2xl border border-border bg-card" />
    );

  return (
    <div className="flex flex-col gap-8">
      <nav className="flex items-center gap-1 text-xs text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <span>Course</span>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{course.courseName}</span>
      </nav>

      <div>
        <Badge variant="glow" className="gap-1.5">
          <Sparkles className="h-3 w-3" /> Featured
        </Badge>
        <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl">
          {course.courseName}
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {course.courseDescription}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-5 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5 text-amber-300">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-amber-300" />
            ))}
          </div>
          <span className="font-semibold text-foreground">3.8</span>
          <span className="text-muted-foreground">
            ({course?.ratingAndReviews?.length || 0} reviews)
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Users className="h-4 w-4" />
          {course?.studentsEnrolled?.length || 0} enrolled
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <GraduationCap className="h-4 w-4" />
          {course?.instructor?.firstName} {course?.instructor?.lastName}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Globe className="h-4 w-4" /> English
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold tracking-tight text-foreground">
            What you&apos;ll learn
          </h2>
        </div>
        <p className="leading-relaxed text-muted-foreground first-letter:capitalize">
          {course.whatYouWillLearn}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
