import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Share2,
  GraduationCap,
  CalendarDays,
  Tag,
  Star,
  Clock,
  PlayCircle,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CourseCard = ({
  img,
  title,
  instructor,
  date,
  features,
  original_price,
  discounted_price,
  discount_percentage,
  id,
}) => {
  const [copied, setCopied] = useState(false);

  const copyLink = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const link = `${window.location.origin}/course/${encodeURIComponent(
      title
    )}/${id}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {});
  };

  return (
    <Link
      to={`/course/${title}/${id}`}
      className="group relative flex min-w-[290px] flex-col overflow-hidden rounded-2xl border border-border bg-card card-hover sm:min-w-[320px] lg:min-w-[340px]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <Badge variant="glow" className="absolute left-3 top-3 gap-1">
          <Star className="h-3 w-3 fill-current" /> 4.8
        </Badge>
        <button
          onClick={copyLink}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-md border border-border bg-background/60 text-foreground backdrop-blur transition hover:border-primary/30 hover:bg-background/80"
          aria-label="Share"
        >
          {copied ? (
            <Check className="h-4 w-4 text-emerald-400" />
          ) : (
            <Share2 className="h-4 w-4" />
          )}
        </button>
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-background/60 px-2 py-1 text-[11px] text-muted-foreground backdrop-blur">
          <PlayCircle className="h-3 w-3" /> Self-paced
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5" /> {instructor}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="h-3.5 w-3.5" />{" "}
            {date ? new Date(date).toLocaleDateString() : "—"}
          </span>
        </div>

        {features && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {features}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between border-t border-border pt-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-foreground">
                ₹{Math.round(discounted_price)}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{original_price}
              </span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400">
              <Tag className="h-3 w-3" /> {discount_percentage}% off
            </span>
          </div>
          <Button size="sm" className="pointer-events-none">
            Enroll
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
