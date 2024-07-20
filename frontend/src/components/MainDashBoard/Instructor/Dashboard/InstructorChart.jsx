import { useState, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Pie } from "react-chartjs-2";

Chart.register(...registerables);

export default function InstructorChart({ courses }) {
  // State to keep track of the currently selected chart
  const [currChart, setCurrChart] = useState("students");

  // Function to generate random colors for the chart
  const generateRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`;
      colors.push(color);
    }
    return colors;
  };

  // Data for the chart displaying student information
  const chartDataStudents = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        data: courses?.map((course) => course.studentsEnrolled.length),
        backgroundColor: generateRandomColors(courses?.length),
      },
    ],
  };

  // Data for the chart displaying income information
  const chartIncomeData = {
    labels: courses?.map((course) => course?.courseName),
    datasets: [
      {
        data: courses?.map((course) => course?.price * course?.studentsEnrolled.length),
        backgroundColor: generateRandomColors(courses?.length),
      },
    ],
  };

  // Options for the chart
  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true, // Ensure the legend is displayed
        position: "top",
        labels: {
          color: "white" // Change label color if not visible
        }
      }
    }
  };

  // Logging the chart data to check if it's correct
  useEffect(() => {
    // console.log(courses,"jksjnlw");
    // console.log("chartDataStudents:", chartDataStudents);
    // console.log("chartIncomeData:", chartIncomeData);
  }, [courses]);

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-black-bg p-6">
      <p className="text-lg font-bold text-richblack-5">Visualize</p>
      <div className="space-x-4 font-semibold">
        {/* Button to switch to the "students" chart */}
        <button
          onClick={() => setCurrChart("students")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "students"
              ? "text-yellow-400"
              : "text-yellow-50"
          }`}
        >
          Students
        </button>
        {/* Button to switch to the "income" chart */}
        <button
          onClick={() => setCurrChart("income")}
          className={`rounded-sm p-1 px-3 transition-all duration-200 ${
            currChart === "income"
              ? "text-yellow-400"
              : "text-yellow-50"
          }`}
        >
          Income
        </button>
      </div>
      <div className="relative mx-auto aspect-square h-full w-full">
        {/* Render the Pie chart based on the selected chart */}
        <Pie
          data={currChart === "students" ? chartDataStudents : chartIncomeData}
          options={options}
        />
      </div>
    </div>
  );
}
