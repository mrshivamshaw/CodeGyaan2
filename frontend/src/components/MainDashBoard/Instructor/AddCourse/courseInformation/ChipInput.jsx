import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { X } from "lucide-react";
import { Label } from "@/components/ui/label";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
}) {
  const { editCourse, course } = useSelector((state) => state.course);
  const [chips, setChips] = useState([]);

  useEffect(() => {
    if (editCourse) setChips(course?.tag || []);
    register(name, { required: true, validate: (v) => v.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, chips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chips]);

  const onKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const v = e.target.value.trim();
      if (v && !chips.includes(v)) {
        setChips([...chips, v]);
        e.target.value = "";
      }
    }
  };

  const remove = (i) => setChips(chips.filter((_, idx) => idx !== i));

  return (
    <div className="grid gap-2">
      <Label className="capitalize">
        {label}
        <sup className="text-destructive">*</sup>
      </Label>
      <div className="flex flex-wrap items-center gap-2 rounded-md border border-border bg-secondary/50 p-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20">
        {chips.map((c, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-medium text-primary"
          >
            {c}
            <button
              type="button"
              onClick={() => remove(i)}
              className="rounded-full hover:bg-primary/20"
              aria-label={`Remove ${c}`}
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          id={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={onKey}
          className="min-w-[160px] flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
        />
      </div>
      {errors[name] && (
        <span className="text-xs text-destructive">{label} is required</span>
      )}
    </div>
  );
}
