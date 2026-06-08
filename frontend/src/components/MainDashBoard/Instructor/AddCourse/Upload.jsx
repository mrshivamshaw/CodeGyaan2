import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X } from "lucide-react";
import "video-react/dist/video-react.css";
import { Player } from "video-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData || editData || ""
  );

  const onDrop = (files) => {
    const file = files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setPreviewSource(reader.result);
    setSelectedFile(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  useEffect(() => {
    register(name, { required: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile, setValue]);

  return (
    <div className="grid gap-2">
      <Label className="capitalize" htmlFor={name}>
        {label}
        {!viewData && <sup className="text-destructive">*</sup>}
      </Label>
      <div
        className={cn(
          "relative overflow-hidden rounded-xl border-2 border-dashed border-border bg-background/40 transition-all",
          isDragActive && "border-primary/50 bg-primary/5"
        )}
      >
        {previewSource ? (
          <div className="p-4">
            {!video ? (
              <img
                src={previewSource}
                alt=""
                className="aspect-video w-full rounded-lg object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <X className="h-3 w-3" /> Remove
              </button>
            )}
          </div>
        ) : (
          <div
            {...getRootProps()}
            className="flex min-h-[220px] cursor-pointer flex-col items-center justify-center gap-3 p-6"
          >
            <input {...getInputProps()} />
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/15 text-primary">
              <UploadCloud className="h-5 w-5" />
            </div>
            <p className="max-w-[280px] text-center text-sm text-muted-foreground">
              Drag & drop an {video ? "MP4 video" : "image"}, or{" "}
              <span className="font-medium text-primary">browse</span> to select.
            </p>
            {!video && (
              <p className="text-xs text-muted-foreground">
                Recommended 1024×576 · 16:9
              </p>
            )}
          </div>
        )}
      </div>
      {errors[name] && (
        <span className="text-xs text-destructive">{label} is required</span>
      )}
    </div>
  );
}
