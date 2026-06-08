import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { X } from "lucide-react";

import { createRating } from "../../servies/operations/courseOpertaions.js";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((s) => s.profile);
  const { token } = useSelector((s) => s.auth);
  const { courseEntireData } = useSelector((s) => s.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData.courseDetails._id,
        rating: data.courseRating,
        review: data.courseExperience,
        id: user?._id,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-border bg-background/40 p-5">
          <h2 className="text-lg font-semibold text-foreground">Add review</h2>
          <button
            onClick={() => setReviewModal(false)}
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-3">
            <img
              src={user?.image}
              alt=""
              className="h-12 w-12 rounded-full object-cover ring-2 ring-primary/30 ring-offset-2 ring-offset-card"
            />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-muted-foreground">Posting publicly</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
            <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-background/40 p-4">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Your rating
              </p>
              <ReactStars
                count={5}
                onChange={(v) => setValue("courseRating", v)}
                size={32}
                activeColor="#f9cb5e"
                color="hsl(220 13% 22%)"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="courseExperience">
                Your experience{" "}
                <sup className="text-destructive">*</sup>
              </Label>
              <Textarea
                id="courseExperience"
                placeholder="What did you love? What would you change?"
                rows={5}
                {...register("courseExperience", { required: true })}
              />
              {errors.courseExperience && (
                <span className="text-xs text-destructive">
                  Please share your experience
                </span>
              )}
            </div>

            <div className="flex justify-end gap-2 border-t border-border pt-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setReviewModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit review</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
