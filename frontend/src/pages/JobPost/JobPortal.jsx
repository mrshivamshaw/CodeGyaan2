import axios from "axios";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import NavBar from "../../components/NavBar/NavBar";
import Filter from "./Filter.jsx";
import toast from "react-hot-toast";
import { FaArrowLeftLong } from "react-icons/fa6";
import JobDetails from "./JobDetails.jsx";
import Footer from "../../components/Footer/Footer.jsx";

const JobPost = () => {
  const [jobs, setJobs] = useState([]);
  const [companySet, setCompanySet] = useState(new Set());
  const [locationSet, setLocationSet] = useState(new Set());
  const [seletedCompany, setSelectedCompany] = useState("");
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

      const toastId = toast.loading("Fetching Jobs...");

      try {
        const response = await axios.request(options);
        setJobs(response.data);
        const companies = response.data.map((job) => job.company);
        setCompanySet(new Set(companies));
        const locations = response.data.map((job) => job.location);
        setLocationSet(new Set(locations));
        sessionStorage.setItem("jobs", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching jobs:", error);
        toast.error("Failed to fetch jobs. Please try again later.");
      } finally {
        toast.dismiss(toastId);
      }
    };

    // Check sessionStorage for cached jobs
    if (!sessionStorage.getItem("jobs")) {
      fetchJobs();
    } else {
      const cachedJobs = JSON.parse(sessionStorage.getItem("jobs"));
      setJobs(cachedJobs);
      const companies = cachedJobs.map((job) => job.company);
      setCompanySet(new Set(companies));
      const locations = cachedJobs.map((job) => job.location);
      setLocationSet(new Set(locations));
    }
  }, []);

  return (
    <div className="w-full h-auto">
      <NavBar />
      <div className="w-full h-auto flex justify-center items-start gap-8 mt-14 md:mt-14 lg:mt-32 xl:mt-32">
        <div className="w-[95%] md:w-[95%] lg:w-[50%] xl:w-[50%] h-auto flex flex-col justify-start items-start gap-10 my-7">
          <div className="flex flex-col justify-start items-start gap-1 w-full">
            <h1 className="text-white/90 text-4xl font-semibold flex justify-center items-center">
              {jobDetailsPage && <span onClick={() => setJobDetailsPage(false)} className="cursor-pointer">
                <FaArrowLeftLong className="text-xl mr-2" />
              </span>}
              Job <span className="text-glod-color">Listing</span>.
            </h1>
            <p className="text-white/70 text-lg">
              Dive deep into a world of career possibilities with our tailored
              job listings.
            </p>
          </div>
          {!jobDetailsPage && <div className="w-full block md:block lg:hidden xl:hidden">
            <div className="flex flex-col gap-3 justify-center items-start md:items-start lg:items-center xl:items-center -mb-6">
              <span className="text-white/95 text-2xl font-semibold">
                Filter by
              </span>
              <select
                id="company"
                className="border-2 border-white px-2 py-[10px] rounded-lg bg-blue-bg text-white transition-all duration-400"
                style={{ borderBottom: "1px solid white" }}
                value={seletedCompany}
                onChange={(e) => {
                  setSelectedCompany(e.target.value);
                }}
              >
                <option value="" disabled>
                  Choose a Company
                </option>
                {Array.from(companySet)?.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>

              <select
                id="location"
                className="border-2 border-white px-2 py-[10px] rounded-lg bg-blue-bg text-white transition-all duration-400"
                style={{ borderBottom: "1px solid white" }}
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                }}
              >
                <option value="" disabled>
                  Choose Location
                </option>
                {Array.from(locationSet)?.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              <button
                className="bg-black-bg py-1 px-4 rounded-2xl text-white/90 font-semibold hover:bg-slate-500"
                onClick={() => {
                  setSelectedCompany("");
                  setSelectedLocation("");
                }}
              >
                Clear all
              </button>
            </div>
          </div>}
          {jobs.length > 0 && !jobDetailsPage ? (
            jobs?.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                seletedCompany={seletedCompany}
                selectedLocation={selectedLocation}
                setJobDetails={setJobDetails}
                setJobDetailsPage={setJobDetailsPage}
              />
            ))
          ) : (
            jobs.length <= 0 ? (<p className="text-white">No jobs found.</p>) : (<JobDetails job={jobDetails} />)
          )}
        </div>
        {!jobDetailsPage && <Filter
          companies={Array.from(companySet)}
          locations={Array.from(locationSet)}
          setSelectedCompany={setSelectedCompany}
          setSelectedLocation={setSelectedLocation}
        />}
      </div>
      <Footer />
    </div>
  );
};

export default JobPost;
