import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Plus, ChevronRight, ChevronLeft } from "lucide-react";

import {
  createSection,
  updateSection,
} from "../../../../../servies/operations/courseOpertaions.js";
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice.js";
import NestedView from "./NestedView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CourseBuilderForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { course } = useSelector((s) => s.course);
  const { token } = useSelector((s) => s.auth);
  const [loading, setLoading] = useState(false);
  const [editSectionName, setEditSectionName] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    let result;
    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
          id: localStorage.getItem("id"),
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
          id: localStorage.getItem("id"),
        },
        token
      );
    }
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  const goNext = () => {
    if (course.courseContent.length === 0) {
      toast.error("Add at least one section.");
      return;
    }
    if (course.courseContent.some((s) => s.subSection.length === 0)) {
      toast.error("Each section needs at least one lecture.");
      return;
    }
    dispatch(setStep(3));
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  return (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Step 2
        </p>
        <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
          Course <span className="gradient-text">builder</span>.
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Organize sections and lectures.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="sectionName">
            Section name <sup className="text-destructive">*</sup>
          </Label>
          <Input
            id="sectionName"
            disabled={loading}
            placeholder="e.g. Introduction"
            {...register("sectionName", { required: true })}
          />
          {errors.sectionName && (
            <span className="text-xs text-destructive">Section name is required</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button type="submit" disabled={loading} variant="outline">
            <Plus className="h-4 w-4" />
            {editSectionName ? "Edit section name" : "Create section"}
          </Button>
          {editSectionName && (
            <Button type="button" variant="ghost" onClick={cancelEdit}>
              Cancel edit
            </Button>
          )}
        </div>
      </form>

      {course?.courseContent?.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex items-center justify-end gap-2 border-t border-border pt-6">
        <Button variant="outline" onClick={goBack}>
          <ChevronLeft className="h-4 w-4" /> Back
        </Button>
        <Button onClick={goNext}>
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
