import React from "react";
import { formatDistanceToNow } from "date-fns";

const JobCard = ({
  job,
  seletedCompany,
  selectedLocation,
  setJobDetails,
  setJobDetailsPage,
}) => {
  const postedDate = formatDistanceToNow(new Date(job.posted_date), {
    addSuffix: true,
  });

  if (job.company !== seletedCompany && seletedCompany) {
    return null;
  }
  if (job.location !== selectedLocation && selectedLocation) {
    return null;
  }

  return (
    <div className="w-[100%] mx-auto shadow-md shadow-white rounded-lg p-8 border border-gray-700 bg-black-bg flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-2xl font-semibold text-white/90">{job.company}</p>
          <p className="text-white/80 text-md">
            <strong>Location:</strong> {job.location}
          </p>
        </div>
        <div>
          <p className="text-white/90">{postedDate}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-white">{job.job_title}</h2>
        <p className="text-white/80">{job.job_description}</p>
      </div>

      <div className="flex justify-between items-center text-base md:text-base lg:text-lg xl:text-lg gap-1 mt-2 w-full">
        {" "}
        <a href={job.apply_link} className="w-[50%]" target="_blank">
          <button className="inline-block w-[100%] bg-blue-bg hover:bg-slate-500 text-white font-semibold py-2 px-6 rounded-3xl  focus:outline-none focus:ring-2 focus:ring-blue-bg transition">
            Apply
          </button>
        </a>
        <button
          onClick={() => {
            setJobDetails(job);
            setJobDetailsPage(true);
          }}
          className="inline-block w-[50%] bg-glod-color text-white font-semibold py-2 px-6 rounded-3xl hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          View details
        </button>
      </div>
    </div>
  );
};

export default JobCard;
