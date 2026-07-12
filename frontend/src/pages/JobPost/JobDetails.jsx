import React from "react";
import {
  Building2,
  MapPin,
  Clock,
  Briefcase,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Section = ({ icon: Icon, title, body }) => (
  <div className="rounded-xl border border-border bg-background/40 p-5">
    <div className="flex items-center gap-2">
      <Icon className="h-4 w-4 text-primary" />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
      {body || "Not specified"}
    </p>
  </div>
);

const JobDetails = ({ job }) => {
  return (
    <article className="w-full rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-col gap-5 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <Building2 className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {job.title || job.job_title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{job.company}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <Badge variant="outline" className="gap-1">
                <MapPin className="h-3 w-3" /> {job.location}
              </Badge>
              {job.job_type && (
                <Badge variant="outline" className="gap-1">
                  <Briefcase className="h-3 w-3" /> {job.job_type}
                </Badge>
              )}
              {job.experience && <Badge variant="outline">{job.experience}</Badge>}
              <Badge variant="outline" className="gap-1">
                <Clock className="h-3 w-3" />{" "}
                {new Date(job.posted_date).toLocaleDateString()}
              </Badge>
            </div>
          </div>
        </div>
        <Button asChild size="lg">
          <a href={job.apply_link} target="_blank" rel="noreferrer">
            Apply now <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </div>

      <p className="mt-6 leading-relaxed text-muted-foreground">
        {job.job_description}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Section
          icon={Building2}
          title="About the company"
          body={job.about_company}
        />
        <Section
          icon={Briefcase}
          title="Role & responsibilities"
          body={job.role_and_responsibility}
        />
        <Section
          icon={GraduationCap}
          title="Education & skills"
          body={job.education_and_skills}
        />
      </div>
    </article>
  );
};

export default JobDetails;
