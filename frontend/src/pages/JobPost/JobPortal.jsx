import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ArrowLeft, Briefcase, Sparkles } from "lucide-react";

import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import JobCard from "./JobCard";
import Filter from "./Filter.jsx";
import JobDetails from "./JobDetails.jsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [companySet, setCompanySet] = useState(new Set());
  const [locationSet, setLocationSet] = useState(new Set());
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [jobDetails, setJobDetails] = useState(false);
  const [jobDetailsPage, setJobDetailsPage] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const options = {
        method: "GET",
        url: "https://jobs-api19.p.rapidapi.com/jobs",
        params: { limit: "20" },
        headers: {
          "x-rapidapi-key":
            "3c85520001msh1a12e9ad6fe871bp1cfe94jsn6c2e902c0cc0",
          "x-rapidapi-host": "jobs-api19.p.rapidapi.com",
        },
      };
      const tId = toast.loading("Fetching jobs…");
      try {
        const res = await axios.request(options);
        setJobs(res.data);
        setCompanySet(new Set(res.data.map((j) => j.company)));
        setLocationSet(new Set(res.data.map((j) => j.location)));
        sessionStorage.setItem("jobs", JSON.stringify(res.data));
      } catch (e) {
        toast.error("Failed to fetch jobs.");
      } finally {
        toast.dismiss(tId);
      }
    };

    const cached = sessionStorage.getItem("jobs");
    if (!cached) {
      fetchJobs();
    } else {
      const arr = JSON.parse(cached);
      setJobs(arr);
      setCompanySet(new Set(arr.map((j) => j.company)));
      setLocationSet(new Set(arr.map((j) => j.location)));
    }
  }, []);

  const visible = jobs.filter((j) => {
    if (selectedCompany && j.company !== selectedCompany) return false;
    if (selectedLocation && j.location !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <NavBar />

      <section className="relative border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
        <div className="container-page relative py-14">
          <Badge variant="glow" className="gap-1.5">
            <Sparkles className="h-3 w-3" /> Curated openings
          </Badge>
          <h1 className="mt-4 flex items-center gap-3 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {jobDetailsPage && (
              <button
                onClick={() => setJobDetailsPage(false)}
                className="grid h-10 w-10 place-items-center rounded-md border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Back"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            Job <span className="gradient-text">Portal</span>.
          </h1>
          <p className="mt-3 max-w-xl text-muted-foreground">
            Tailored roles from partner companies — apply directly, track your
            progress, get hired.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Briefcase className="h-3 w-3" /> {jobs.length} live roles
            </span>
            <span>·</span>
            <span>{companySet.size} companies</span>
            <span>·</span>
            <span>{locationSet.size} locations</span>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 min-w-0">
            {!jobDetailsPage && jobs.length > 0 && (
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {visible.length}
                  </span>{" "}
                  of {jobs.length} jobs
                </p>
                {(selectedCompany || selectedLocation) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedCompany("");
                      setSelectedLocation("");
                    }}
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            )}

            <div className="grid gap-5">
              {jobDetailsPage ? (
                <JobDetails job={jobDetails} />
              ) : visible.length > 0 ? (
                visible.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    seletedCompany={selectedCompany}
                    selectedLocation={selectedLocation}
                    setJobDetails={setJobDetails}
                    setJobDetailsPage={setJobDetailsPage}
                  />
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center">
                  <p className="text-muted-foreground">
                    {jobs.length === 0 ? "Loading jobs…" : "No jobs match your filters."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {!jobDetailsPage && (
            <Filter
              companies={Array.from(companySet)}
              locations={Array.from(locationSet)}
              setSelectedCompany={setSelectedCompany}
              setSelectedLocation={setSelectedLocation}
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobPost;
