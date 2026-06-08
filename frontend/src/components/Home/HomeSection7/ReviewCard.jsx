import React from "react";
import { ArrowRight, Quote, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ReviewCard = ({ name, short_name, increment, course, feedback, history }) => {
  return (
    <div className="group relative flex h-full min-w-[300px] max-w-[340px] flex-col gap-5 rounded-2xl border border-border bg-card p-6 card-hover sm:min-w-[340px]">
      <div className="flex items-start justify-between">
        <Quote className="h-7 w-7 text-primary/40" />
        <Badge variant="default" className="gap-1">
          <TrendingUp className="h-3 w-3" /> {increment}
        </Badge>
      </div>

      <p className="line-clamp-5 text-sm leading-relaxed text-foreground">
        “{feedback}”
      </p>

      <div className="mt-auto flex items-center gap-3 border-t border-border pt-4">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary to-amber-400 text-sm font-bold uppercase text-primary-foreground">
          {short_name}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground">
            {name}
          </p>
          <p className="truncate text-xs text-muted-foreground">{course}</p>
        </div>
      </div>

      <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-2 rounded-lg border border-border bg-background/40 p-3">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            From
          </p>
          <p className="truncate text-sm font-medium text-muted-foreground">
            {history[0]?.from}
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-primary" />
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
            To
          </p>
          <p className="truncate text-sm font-semibold gradient-text">
            {history[0]?.to}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
