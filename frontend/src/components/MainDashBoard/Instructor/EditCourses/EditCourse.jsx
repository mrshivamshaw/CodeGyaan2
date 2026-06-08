import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getFullDetailsOfCourse } from "../../../../servies/operations/courseOpertaions.js";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice.js";
import RenderSteps from "../AddCourse/RenderSteps.jsx";

const EditCourse = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { course } = useSelector((s) => s.course);
  const { token } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(id, token);
      if (result) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result));
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="container-page py-10">
        <div className="h-72 animate-pulse rounded-2xl border border-border bg-card" />
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Teaching
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Edit <span className="gradient-text">course</span>.
        </h1>
      </div>
      {course ? (
        <RenderSteps />
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center">
          <p className="text-sm text-muted-foreground">Course not found.</p>
        </div>
      )}
    </div>
  );
};

export default EditCourse;
