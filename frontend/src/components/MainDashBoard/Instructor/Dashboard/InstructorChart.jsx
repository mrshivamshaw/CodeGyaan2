import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";
import { cn } from "@/lib/utils";

Chart.register(...registerables);

const palette = [
  "#f9cb5e",
  "#fbbf24",
  "#a78bfa",
  "#60a5fa",
  "#34d399",
  "#f472b6",
  "#fb923c",
  "#22d3ee",
];
const colors = (n) =>
  Array.from({ length: n }, (_, i) => palette[i % palette.length]);

export default function InstructorChart({ courses }) {
  const [tab, setTab] = useState("students");

  const studentsData = {
    labels: courses.map((c) => c.courseName),
    datasets: [
      {
        data: courses.map((c) => c.studentsEnrolled.length),
        backgroundColor: colors(courses.length),
        borderColor: "hsl(220 13% 7%)",
        borderWidth: 2,
      },
    ],
  };

  const incomeData = {
    labels: courses.map((c) => c.courseName),
    datasets: [
      {
        data: courses.map((c) => c.price * c.studentsEnrolled.length),
        backgroundColor: colors(courses.length),
        borderColor: "hsl(220 13% 7%)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "hsl(215 16% 75%)",
          font: { size: 11 },
          boxWidth: 12,
          padding: 12,
        },
      },
    },
  };

  return (
    <div className="flex flex-1 flex-col gap-5 rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Distribution</h3>
        <div className="inline-flex rounded-lg border border-border bg-secondary/40 p-1">
          {["students", "income"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "rounded-md px-3 py-1 text-xs font-medium capitalize transition-all",
                tab === t
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mx-auto h-72 w-full">
        <Pie
          data={tab === "students" ? studentsData : incomeData}
          options={options}
        />
      </div>
    </div>
  );
}
