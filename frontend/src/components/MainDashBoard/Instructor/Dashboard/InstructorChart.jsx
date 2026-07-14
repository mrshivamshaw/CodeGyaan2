import { useState } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

const COLORS = [
  "#6366f1", // Indigo 500
  "#10b981", // Emerald 500
  "#f59e0b", // Amber 500
  "#ec4899", // Pink 500
  "#8b5cf6", // Violet 500
  "#0ea5e9", // Sky 500
  "#ef4444", // Red 500
  "#14b8a6", // Teal 500
];

export default function InstructorChart({ courses }) {
  const [currChart, setCurrChart] = useState("students");

  const getColors = (num) => {
    return Array.from({ length: num }, (_, i) => COLORS[i % COLORS.length]);
  };

  const chartDataStudents = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.studentsEnrolled.length),
        backgroundColor: getColors(courses?.length || 0),
        borderWidth: 0,
      },
    ],
  };

  const chartIncomeData = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        data: courses?.map((course) => course?.price * course?.studentsEnrolled.length),
        backgroundColor: getColors(courses?.length || 0),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          color: "#9ca3af", // Tailwind gray-400
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          boxWidth: 15,
          padding: 20,
        }
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 13 },
        bodyFont: { size: 13 },
        padding: 10,
        cornerRadius: 8,
      }
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-y-6 rounded-xl bg-richblack-800 p-6 bg-black-bg border border-richblack-700/50 shadow-lg shadow-black/20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xl font-bold text-richblack-5">Visualize</p>
        <div className="flex items-center space-x-2 rounded-lg bg-richblack-800 p-1 border border-richblack-700/50">
          <button
            onClick={() => setCurrChart("students")}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
              currChart === "students"
                ? "bg-richblack-900 text-yellow-400 shadow-sm"
                : "text-richblack-200 hover:text-richblack-50"
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrChart("income")}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
              currChart === "income"
                ? "bg-richblack-900 text-yellow-400 shadow-sm"
                : "text-richblack-200 hover:text-richblack-50"
            }`}
          >
            Income
          </button>
        </div>
      </div>
      
      <div className="relative mx-auto flex items-center justify-center w-full h-[320px]">
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
