import React from "react";

const JobDetails = ({ job }) => {
  return (
    <div className="w-full mx-auto bg-black-bg shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:-translate-y-2 hover:shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-2">{job.title}</h2>
      <div className="flex justify-between items-center my-5">
        <div>
          <p className="text-white/95 text-lg ">{job.company}</p>
          <p className="text-white/85 text-md ">{job.location}</p>
        </div>
        <div>
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-glod-color text-white py-2 px-4 rounded hover:bg-[#b99b55] focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Apply Now
          </a>
        </div>
      </div>
      <p className="text-white/80 text-md mb-4">{job.job_description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">
          {job.job_type}
        </span>
        <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">
          {job.experience}
        </span>
        <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm">
          {new Date(job.posted_date).toLocaleDateString()}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white/95">
          About the Company
        </h3>
        <p className="text-white/80">
          {job.about_company || "Information not provided."}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white/95">
          Role and Responsibilities
        </h3>
        <p className="text-white/80">
          {job.role_and_responsibility || "Not specified"}
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white/95">
          Education and Skills
        </h3>
        <p className="text-white/80">
          {job.education_and_skills || "Not specified"}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
