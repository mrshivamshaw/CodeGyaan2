import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

import { fetchInstructorCourses } from "../../../../servies/operations/courseOpertaions.js";
import CoursesTable from "../InctructorCourses/CoursesTable.jsx";
import { Button } from "@/components/ui/button";

export default function MyCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchInstructorCourses(token);
      if (result) setCourses(result);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Teaching
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My <span className="gradient-text">courses</span>.
          </h1>
        </div>
        <Button onClick={() => navigate("/dashboard/add-courses")}>
          <Plus className="h-4 w-4" /> Add course
        </Button>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  );
}
