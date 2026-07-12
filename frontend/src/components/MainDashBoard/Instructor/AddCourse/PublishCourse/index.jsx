import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Globe, Lock, Sparkles } from "lucide-react";

import { editCourseDetails } from "../../../../../servies/operations/courseOpertaions.js";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constant.js";
import { Button } from "@/components/ui/button";

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) setValue("public", true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isPublic = watch("public");

  const goBack = () => dispatch(setStep(2));
  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const publish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      goToCourses();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);
    formData.append(
      "status",
      getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    );
    formData.append("id", localStorage.getItem("id"));
    setLoading(true);
    const result = await editCourseDetails(formData, token);
    if (result) goToCourses();
    setLoading(false);
  };

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Step 3
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          Publish <span className="gradient-text">settings</span>.
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Make the course public when you&apos;re ready.
        </p>
      </div>

      <form onSubmit={handleSubmit(publish)} className="space-y-6">
        <label
          htmlFor="public"
          className="flex cursor-pointer items-start gap-4 rounded-xl border border-border bg-background/40 p-5 transition-colors hover:border-primary/30"
        >
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="peer sr-only"
          />
          <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground peer-checked:bg-primary/15 peer-checked:text-primary">
            {isPublic ? <Globe className="h-5 w-5" /> : <Lock className="h-5 w-5" />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-foreground">
              {isPublic ? "Public course" : "Draft course"}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {isPublic
                ? "Visible in catalog. Learners can enroll immediately."
                : "Saved as draft. Only you can see it."}
            </p>
          </div>
          <div className="flex h-6 w-11 shrink-0 items-center rounded-full bg-secondary p-0.5 transition-colors peer-checked:bg-primary">
            <span
              className={`h-5 w-5 rounded-full bg-background shadow transition-transform ${
                isPublic ? "translate-x-5" : ""
              }`}
            />
          </div>
        </label>

        {isPublic && (
          <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-foreground">
            <Sparkles className="h-4 w-4 shrink-0 text-primary" />
            Your course will be live the moment you click save.
          </div>
        )}

        <div className="flex items-center justify-end gap-2 border-t border-border pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            disabled={loading}
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving…" : "Save and finish"}
          </Button>
        </div>
      </form>
    </div>
  );
}
