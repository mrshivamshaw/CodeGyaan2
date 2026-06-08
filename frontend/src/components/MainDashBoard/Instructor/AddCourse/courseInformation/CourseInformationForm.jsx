import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ChevronRight, IndianRupee } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  addCourseDetails,
  editCourseDetails,
  fetchCourseCategories,
} from "../../../../../servies/operations/courseOpertaions.js";
import { setStep, setCourse } from "../../../../../slices/courseSlice.js";
import { COURSE_STATUS } from "../../../../../utils/constant.js";
import RequirementField from "./RequirementField";
import ChipInput from "./ChipInput";
import Upload from "../Upload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Field = ({ label, required, error, children, hint }) => (
  <div className="grid gap-2">
    <div className="flex items-baseline justify-between">
      <Label>
        {label}
        {required && <sup className="text-destructive">*</sup>}
      </Label>
      {hint && (
        <span className="text-xs text-muted-foreground">{hint}</span>
      )}
    </div>
    {children}
    {error && (
      <span className="text-xs text-destructive">{label} is required</span>
    )}
  </div>
);

const SelectField = ({ id, register, name, required, defaultValue = "", placeholder, options }) => (
  <select
    id={id}
    defaultValue={defaultValue}
    {...register(name, { required })}
    className="h-10 w-full rounded-md border border-border bg-secondary/50 px-3 text-sm text-foreground focus:border-primary/50 focus:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

const CourseInformationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((s) => s.auth);
  const { course, editCourse } = useSelector((s) => s.course);
  const [loading, setLoading] = useState(false);
  const [courseCategories, setCourseCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true);
      const categories = await dispatch(fetchCourseCategories());
      if (categories?.length) setCourseCategories(categories);
      setLoading(false);
    };

    if (editCourse) {
      setValue("courseName", course.courseName);
      setValue("courseDescription", course.courseDescription);
      setValue("price", course.price);
      setValue("startDate", course.startDate);
      setValue("mode", course.mode);
      setValue("tag", course.tag);
      setValue("whatYouWillLearn", course.whatYouWillLearn);
      setValue("category", course.category);
      setValue("instruction", course.instruction);
      setValue("thumbnail", course.thumbnail);
    }

    const cached = sessionStorage.getItem("category");
    if (cached) setCourseCategories(JSON.parse(cached));
    else getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormUpdated = () => {
    const c = getValues();
    return (
      c.courseName !== course.courseName ||
      c.courseDescription !== course.courseDescription ||
      c.price !== course.price ||
      c.tag.toString() !== course.tag.toString() ||
      c.whatYouWillLearn !== course.whatYouWillLearn ||
      c.category._id !== course.category._id ||
      c.thumbnail !== course.thumbnail ||
      c.instruction.toString() !== course.instruction.toString()
    );
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (!isFormUpdated()) {
        toast.error("No changes made yet.");
        return;
      }
      const c = getValues();
      const formData = new FormData();
      formData.append("id", localStorage.getItem("id"));
      formData.append("courseId", course._id);
      if (c.courseName !== course.courseName)
        formData.append("courseName", data.courseName);
      if (c.courseDescription !== course.courseDescription)
        formData.append("courseDescription", data.courseDescription);
      if (c.price !== course.price) formData.append("price", data.price);
      if (c.startDate !== course.startDate)
        formData.append("startDate", data.startDate);
      if (c.mode !== course.mode) formData.append("mode", data.mode);
      if (c.tag.toString() !== course.tag.toString())
        formData.append("tag", JSON.stringify(data.tag));
      if (c.whatYouWillLearn !== course.whatYouWillLearn)
        formData.append("whatYouWillLearn", data.whatYouWillLearn);
      if (c.category._id !== course.category._id)
        formData.append("category", data.category);
      if (c.instruction.toString() !== course.instruction.toString())
        formData.append("instruction", JSON.stringify(data.instruction));
      if (c.thumbnail !== course.thumbnail)
        formData.append("thumbnail", data.thumbnail);

      setLoading(true);
      const result = await editCourseDetails(formData, token);
      setLoading(false);
      if (result) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }
      return;
    }

    const formData = new FormData();
    formData.append("courseName", data.courseName);
    formData.append("courseDescription", data.courseDescription);
    formData.append("price", data.price);
    formData.append("startDate", data.startDate);
    formData.append("mode", data.mode);
    formData.append("whatYouWillLearn", data.whatYouWillLearn);
    formData.append("category", data.category);
    formData.append("instruction", [...data.instruction]);
    formData.append("status", COURSE_STATUS.DRAFT);
    formData.append("tag", [...data.tag]);
    formData.append("thumbnail", data.thumbnail);
    formData.append("token", localStorage.getItem("token"));
    formData.append("id", localStorage.getItem("id"));
    setLoading(true);
    const result = await addCourseDetails(formData, token);
    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
    >
      <Field label="Course title" required error={errors.courseName}>
        <Input
          id="courseName"
          placeholder="e.g. Modern Full-Stack with Next.js"
          {...register("courseName", { required: true })}
        />
      </Field>

      <Field
        label="Short description"
        required
        error={errors.courseDescription}
      >
        <Textarea
          id="courseDescription"
          placeholder="What is this course about?"
          {...register("courseDescription", { required: true })}
          rows={4}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Price (₹)" required error={errors.price}>
          <div className="relative">
            <IndianRupee className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="price"
              type="number"
              placeholder="999"
              className="pl-9"
              {...register("price", { required: true, valueAsNumber: true })}
            />
          </div>
        </Field>

        <Field label="Start date" required error={errors.startDate}>
          <Input
            id="startDate"
            type="date"
            {...register("startDate", { required: true })}
          />
        </Field>

        <Field label="Mode" required error={errors.mode}>
          <SelectField
            id="mode"
            register={register}
            name="mode"
            required
            placeholder="Choose a mode"
            options={[
              { value: "Hybrid", label: "Hybrid" },
              { value: "Online", label: "Online" },
            ]}
          />
        </Field>

        <Field label="Category" required error={errors.category}>
          <SelectField
            id="category"
            register={register}
            name="category"
            required
            placeholder={loading ? "Loading…" : "Choose a category"}
            options={courseCategories.map((c) => ({
              value: c._id,
              label: c.name,
            }))}
          />
        </Field>
      </div>

      <ChipInput
        label="Tags"
        name="tag"
        placeholder="Add a tag and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <Upload
        name="thumbnail"
        label="Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

      <Field
        label="Benefits of the course"
        required
        error={errors.whatYouWillLearn}
      >
        <Textarea
          id="whatYouWillLearn"
          placeholder="Bullet the outcomes learners walk away with"
          {...register("whatYouWillLearn", { required: true })}
          rows={4}
        />
      </Field>

      <RequirementField
        name="instruction"
        label="Requirements"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border pt-6">
        {editCourse && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => dispatch(setStep(2))}
          >
            Continue without saving
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {editCourse ? "Save changes" : "Next"} <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default CourseInformationForm;
