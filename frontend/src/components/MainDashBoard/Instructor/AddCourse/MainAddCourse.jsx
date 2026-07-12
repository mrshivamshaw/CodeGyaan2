import RenderSteps from "./RenderSteps";
import { Lightbulb } from "lucide-react";

export default function AddCourse() {
  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Teaching
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Add <span className="gradient-text">course</span>.
        </h1>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr,320px]">
        <div className="min-w-0">
          <RenderSteps />
        </div>
        <aside className="sticky top-24 hidden rounded-2xl border border-border bg-card p-6 lg:block">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Upload tips
            </h2>
          </div>
          <ul className="mt-4 space-y-3 text-xs leading-relaxed text-muted-foreground">
            <li>• Set a competitive price (or free) to attract learners.</li>
            <li>• Thumbnail: 1024×576 (16:9) renders sharpest.</li>
            <li>• Course Builder is where you organize sections + lectures.</li>
            <li>• Topics inside builder = lessons, quizzes, assignments.</li>
            <li>• Additional data appears on the course detail page.</li>
            <li>• Use announcements to notify all enrolled learners.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
