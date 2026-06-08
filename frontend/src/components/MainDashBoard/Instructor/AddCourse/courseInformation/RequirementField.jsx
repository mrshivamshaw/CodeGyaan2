import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
}) {
  const { editCourse, course } = useSelector((s) => s.course);
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    if (editCourse) setList(course?.instruction || []);
    register(name, { required: true, validate: (v) => v.length > 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setValue(name, list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  const add = () => {
    if (!item.trim()) return;
    setList([...list, item.trim()]);
    setItem("");
  };
  const remove = (i) => setList(list.filter((_, idx) => idx !== i));

  return (
    <div className="grid gap-2">
      <Label htmlFor={name} className="capitalize">
        {label}
        <sup className="text-destructive">*</sup>
      </Label>
      <div className="flex gap-2">
        <Input
          id={name}
          value={item}
          onChange={(e) => setItem(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder="Add a requirement and press enter"
        />
        <Button type="button" onClick={add} variant="outline">
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
      {list.length > 0 && (
        <ul className="mt-2 space-y-1.5">
          {list.map((r, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-2 rounded-md border border-border bg-background/40 px-3 py-2 text-sm text-foreground"
            >
              <span>{r}</span>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-muted-foreground hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="text-xs text-destructive">{label} is required</span>
      )}
    </div>
  );
}
