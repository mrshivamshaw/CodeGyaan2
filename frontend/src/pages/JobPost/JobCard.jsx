import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Building2, MapPin, Clock, ArrowUpRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const JobCard = ({
  job,
  seletedCompany,
  selectedLocation,
  setJobDetails,
  setJobDetailsPage,
}) => {
  if (seletedCompany && job.company !== seletedCompany) return null;
  if (selectedLocation && job.location !== selectedLocation) return null;

  const posted = formatDistanceToNow(new Date(job.posted_date), {
    addSuffix: true,
  });

  return (
    <article className="group w-full rounded-2xl border border-border bg-card p-6 card-hover">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
            <Building2 className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-muted-foreground">
              {job.company}
            </p>
            <h3 className="mt-0.5 line-clamp-2 text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {job.job_title}
            </h3>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" /> {posted}
          </span>
          {job.job_type && (
            <Badge variant="outline" className="text-[10px]">
              {job.job_type}
            </Badge>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <MapPin className="h-3 w-3" /> {job.location}
        </span>
      </div>

      <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
        {job.job_description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild className="flex-1 min-w-[140px]">
          <a href={job.apply_link} target="_blank" rel="noreferrer">
            Apply <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
        <Button
          variant="outline"
          className="flex-1 min-w-[140px]"
          onClick={() => {
            setJobDetails(job);
            setJobDetailsPage(true);
          }}
        >
          <Eye className="h-4 w-4" /> View details
        </Button>
      </div>
    </article>
  );
};

export default JobCard;
