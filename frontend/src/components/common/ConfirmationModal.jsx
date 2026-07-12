import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ConfirmationModal({ modalData }) {
  return (
    <div
      className="fixed inset-0 z-[1000] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/50">
        <div className="flex items-start gap-4 p-6">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-destructive/15 text-destructive">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-foreground">
              {modalData?.text1}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              {modalData?.text2}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-border bg-background/40 p-4">
          <Button variant="ghost" onClick={modalData?.btn2Handler}>
            {modalData?.btn2Text}
          </Button>
          <Button
            variant="destructive"
            onClick={modalData?.btn1Handler}
          >
            {modalData?.btn1Text}
          </Button>
        </div>
      </div>
    </div>
  );
}
