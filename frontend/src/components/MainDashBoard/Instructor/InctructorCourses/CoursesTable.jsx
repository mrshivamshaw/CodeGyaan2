import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Check, Clock, Pencil, Trash2 } from "lucide-react";

import { formatDate } from "../../../../servies/formatDate.js";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../servies/operations/courseOpertaions.js";
import { COURSE_STATUS } from "../../../../utils/constant.js";
import ConfirmationModal from "../../../common/ConfirmationModal.jsx";
import { Badge } from "@/components/ui/badge";

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const TRUNCATE = 30;

  const onDelete = async (id) => {
    setLoading(true);
    await deleteCourse({ courseId: id }, token);
    const result = await fetchInstructorCourses(token);
    if (result) setCourses(result);
    setConfirm(null);
    setLoading(false);
  };

  if (!courses?.length)
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center">
        <p className="text-sm text-muted-foreground">No courses found.</p>
      </div>
    );

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div className="hidden grid-cols-[1fr,140px,120px,120px] gap-4 border-b border-border bg-secondary/40 px-6 py-3 text-xs font-medium uppercase tracking-wider text-muted-foreground sm:grid">
          <span>Course</span>
          <span>Duration</span>
          <span>Price</span>
          <span className="text-right">Actions</span>
        </div>

        <ul className="divide-y divide-border">
          {courses.map((c) => (
            <li
              key={c._id}
              className="grid gap-4 px-4 py-5 sm:grid-cols-[1fr,140px,120px,120px] sm:items-center sm:px-6"
            >
              <div className="flex items-start gap-4 min-w-0">
                <img
                  src={c.thumbnail}
                  alt=""
                  className="h-20 w-32 shrink-0 rounded-md object-cover sm:h-24 sm:w-40"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-base font-semibold text-foreground">
                    {c.courseName}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {c.courseDescription?.split(" ").length > TRUNCATE
                      ? c.courseDescription.split(" ").slice(0, TRUNCATE).join(" ") + "…"
                      : c.courseDescription}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="text-[11px] text-muted-foreground">
                      Created {formatDate(c.startDate)}
                    </span>
                    {c.status === COURSE_STATUS.DRAFT ? (
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="h-3 w-3" /> Draft
                      </Badge>
                    ) : (
                      <Badge variant="default" className="gap-1">
                        <Check className="h-3 w-3" /> Published
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              <span className="text-sm text-muted-foreground sm:text-foreground">
                <span className="sm:hidden text-xs uppercase tracking-wider text-muted-foreground mr-2">
                  Duration:
                </span>
                2h 30m
              </span>
              <span className="text-sm font-semibold text-foreground">
                ₹{c.price}
              </span>
              <div className="flex justify-start gap-1 sm:justify-end">
                <button
                  disabled={loading}
                  onClick={() => navigate(`/dashboard/edit-course/${c._id}`)}
                  title="Edit"
                  className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  disabled={loading}
                  onClick={() =>
                    setConfirm({
                      text1: "Delete this course?",
                      text2:
                        "All sections, lectures, and student progress will be removed. This cannot be undone.",
                      btn1Text: loading ? "Deleting…" : "Delete",
                      btn2Text: "Cancel",
                      btn1Handler: () => onDelete(c._id),
                      btn2Handler: () => setConfirm(null),
                    })
                  }
                  title="Delete"
                  className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground transition-all hover:border-destructive/40 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {confirm && <ConfirmationModal modalData={confirm} />}
    </>
  );
}
