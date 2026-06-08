import { cn } from "@/lib/utils";

export default function IconBtn({
  text,
  onclick,
  children,
  disabled,
  outline = false,
  customClasses = "",
  type,
}) {
  return (
    <button
      disabled={disabled}
      onClick={onclick}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md px-5 py-2 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
        outline
          ? "border border-border bg-transparent text-foreground hover:bg-accent"
          : "bg-primary text-primary-foreground shadow-[0_1px_0_0_hsl(0_0%_100%/0.15)_inset,0_8px_24px_-8px_hsl(var(--primary)/0.5)] hover:bg-primary/90",
        customClasses
      )}
    >
      {text}
      {children}
    </button>
  );
}
