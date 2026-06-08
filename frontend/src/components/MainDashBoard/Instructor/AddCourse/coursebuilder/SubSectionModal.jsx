import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  createSubSection,
  updateSubSection,
} from "../../../../../servies/operations/courseOpertaions.js";
import { setCourse } from "../../../../../slices/courseSlice";
import Upload from "../Upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SubSectionModal({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
  } = useForm();

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((s) => s.auth);
  const { course } = useSelector((s) => s.course);

  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isUpdated = () => {
    const c = getValues();
    return (
      c.lectureTitle !== modalData.title ||
      c.lectureDesc !== modalData.description ||
      c.lectureVideo !== modalData.videoUrl
    );
  };

  const handleEdit = async () => {
    const c = getValues();
    const formData = new FormData();
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);
    formData.append("title", c.lectureTitle);
    formData.append("duration", c.lectureDuration);
    formData.append("description", c.lectureDesc);
    if (c.lectureVideo !== modalData.videoUrl)
      formData.append("videoFile", c.lectureVideo);
    formData.append("id", localStorage.getItem("id"));
    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      const updated = course.courseContent.map((section) =>
        section._id === modalData.sectionId
          ? {
              sectionName: section.sectionName,
              subSection: [
                ...section.subSection.filter(
                  (s) => s._id !== modalData._id
                ),
                result,
              ],
              _id: section._id,
            }
          : section
      );
      dispatch(setCourse({ ...course, courseContent: updated }));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;
    if (edit) {
      if (!isUpdated()) return toast.error("No changes made.");
      handleEdit();
      return;
    }
    const formData = new FormData();
    formData.append("sectionId", modalData);
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("videoFile", data.lectureVideo);
    formData.append("id", localStorage.getItem("id"));
    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      const updated = course.courseContent.map((s) =>
        s._id === modalData ? result : s
      );
      dispatch(setCourse({ ...course, courseContent: updated }));
    }
    setModalData(null);
    setLoading(false);
  };

  const mode = view ? "Viewing" : edit ? "Editing" : "Adding";

  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="my-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between border-b border-border bg-background/40 p-5">
          <h2 className="text-lg font-semibold text-foreground">
            {mode} <span className="gradient-text">lecture</span>
          </h2>
          <button
            onClick={() => (!loading ? setModalData(null) : null)}
            className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
          <Upload
            name="lectureVideo"
            label="Lecture video"
            register={register}
            setValue={setValue}
            errors={errors}
            video
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div className="grid gap-2">
            <Label htmlFor="lectureTitle">
              Lecture title {!view && <sup className="text-destructive">*</sup>}
            </Label>
            <Input
              id="lectureTitle"
              disabled={view || loading}
              placeholder="Enter lecture title"
              {...register("lectureTitle", { required: true })}
            />
            {errors.lectureTitle && (
              <span className="text-xs text-destructive">
                Lecture title is required
              </span>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="lectureDesc">
              Lecture description{" "}
              {!view && <sup className="text-destructive">*</sup>}
            </Label>
            <Textarea
              id="lectureDesc"
              disabled={view || loading}
              placeholder="Brief summary of the lecture…"
              rows={5}
              {...register("lectureDesc", { required: true })}
            />
            {errors.lectureDesc && (
              <span className="text-xs text-destructive">
                Lecture description is required
              </span>
            )}
          </div>

          {!view && (
            <div className="flex justify-end gap-2 border-t border-border pt-5">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setModalData(null)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Saving…" : edit ? "Save changes" : "Save"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
