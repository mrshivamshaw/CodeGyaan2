import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  IndianRupee,
  Plus,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import { fetchInstructorCourses } from "../../../../servies/operations/courseOpertaions.js";
import { getUserDetails } from "../../../../servies/operations/profileOperation.js";
import InstructorChart from "./InstructorChart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const StatCard = ({ icon: Icon, label, value, color = "primary" }) => {
  const colorMap = {
    primary: "bg-primary/15 text-primary",
    emerald: "bg-emerald-500/15 text-emerald-400",
    violet: "bg-violet-500/15 text-violet-400",
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-lg ${colorMap[color]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-3xl font-bold tracking-tight text-foreground">
        {value}
      </p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
};

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        await getUserDetails(token);
        const result = await fetchInstructorCourses(token);
        if (result) setCourses(result);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    })();
  }, [token]);

  useEffect(() => {
    let amt = 0,
      stu = 0;
    courses.forEach((c) => {
      amt += c.price * c.studentsEnrolled.length;
      stu += c.studentsEnrolled.length;
    });
    setTotalAmount(amt);
    setTotalStudents(stu);
  }, [courses]);

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Badge variant="glow" className="gap-1.5">
            <Sparkles className="h-3 w-3" /> Instructor
          </Badge>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Hi, <span className="gradient-text">{user?.firstName}</span> 👋
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Here&apos;s a snapshot of your teaching impact.
          </p>
        </div>
        <Button asChild>
          <Link to="/dashboard/add-courses">
            New course <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-28 animate-pulse rounded-2xl border border-border bg-card"
            />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center">
          <BookOpen className="mx-auto h-10 w-10 text-muted-foreground" />
          <h2 className="mt-4 text-lg font-semibold text-foreground">
            No courses yet
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Share what you know — your first course takes 2 hours to set up.
          </p>
          <Button asChild className="mt-6">
            <Link to="/dashboard/add-courses">
              Create a course <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              icon={BookOpen}
              label="Total courses"
              value={courses.length}
              color="primary"
            />
            <StatCard
              icon={Users}
              label="Total students"
              value={totalStudents}
              color="emerald"
            />
            <StatCard
              icon={IndianRupee}
              label="Total income"
              value={`₹ ${totalAmount.toLocaleString("en-IN")}`}
              color="violet"
            />
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr,1fr]">
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={courses} />
            ) : (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  Visualize
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Not enough data yet — publish a course to see analytics.
                </p>
              </div>
            )}

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">
                  Top courses
                </h3>
                <Link
                  to="/dashboard/my-courses"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  View all
                </Link>
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {courses.slice(0, 4).map((c) => (
                  <li
                    key={c._id}
                    className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-3"
                  >
                    <img
                      src={c.thumbnail}
                      alt=""
                      className="h-12 w-16 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">
                        {c.courseName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {c.studentsEnrolled.length} students · ₹{c.price}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
