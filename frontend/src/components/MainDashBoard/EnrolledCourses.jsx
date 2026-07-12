import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { GraduationCap, PlayCircle, ArrowRight } from "lucide-react";

import { getEnrolledCourses } from "../../servies/operations/profileOperation";
import { Button } from "@/components/ui/button";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const courses = await getEnrolledCourses(token);
        setEnrolledCourses(courses || []);
      } catch (e) {
        console.error(e);
        setEnrolledCourses([]);
      }
    })();
    setProgress(JSON.parse(localStorage.getItem("ProgressCount") || "[]"));
  }, [token]);

  const totalVideos = (content = []) =>
    content.reduce((a, s) => a + (s.subSection?.length || 0), 0);

  const open = (cId, secId, subId) =>
    navigate(`/view-course/${cId}/section/${secId}/sub-section/${subId}`);

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Learning
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Enrolled <span className="gradient-text">courses</span>.
          </h1>
        </div>
      </div>

      {enrolledCourses === null ? (
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-40 animate-pulse rounded-2xl border border-border bg-card"
            />
          ))}
        </div>
      ) : enrolledCourses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center">
          <GraduationCap className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            No enrollments yet
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Find a course to start your journey.
          </p>
          <Button asChild className="mt-6">
            <Link to="/">
              Browse catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {enrolledCourses.map((course) => {
            const prog =
              progress.find((p) => p.courseId === course._id) || {};
            const total = totalVideos(course.courseContent);
            const pct = total
              ? Math.min((prog.courseProgressCount / total) * 100, 100)
              : 0;

            return (
              <article
                key={course._id}
                className="group flex flex-col items-stretch gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:border-primary/30 sm:flex-row"
              >
                <button
                  onClick={() =>
                    open(
                      course._id,
                      course.courseContent[0]?._id,
                      course.courseContent[0]?.subSection?.[0]?._id
                    )
                  }
                  className="relative overflow-hidden rounded-xl sm:h-32 sm:w-56"
                >
                  <img
                    src={course.thumbnail}
                    alt=""
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <PlayCircle className="h-10 w-10 text-white" />
                  </div>
                </button>

                <div className="flex flex-1 flex-col gap-3 py-1">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row">
                    <h3 className="text-lg font-semibold text-foreground">
                      {course.courseName}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {prog.courseProgressCount || 0}/{total} lectures
                    </span>
                  </div>
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {course.courseDescription}
                  </p>
                  <div className="mt-auto">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium text-foreground">
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-amber-300 transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
