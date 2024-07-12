import React, { useState } from "react";

const Filter = ({ companies, locations, setSelectedCompany, setSelectedLocation }) => {
  const [selectedCompany, setSelectedCompanyLocal] = useState("");
  const [selectedLocation, setSelectedLocationLocal] = useState("");

  const handleClearFilters = () => {
    setSelectedCompanyLocal(""); // Reset local state for selected company
    setSelectedLocationLocal(""); // Reset local state for selected location
    setSelectedCompany(""); // Reset parent state for selected company
    setSelectedLocation(""); // Reset parent state for selected location
  };

  return (
    <div className="hidden md:hidden lg:block xl:block top-0 my-7 border-gray-400 border-2 bg-black-bg w-[27%] rounded-2xl">
      <div className="p-5 bg-blue-bg rounded-t-2xl text-white/90 font-semibold text-lg">Filter by</div>
      <div className="p-5 flex flex-col gap-5">
        {/* Filter by Company */}
        <div className="flex gap-3 flex-col">
          <label htmlFor="company" className="text-white/60">Company</label>
          <select
            id="company"
            className="border-2 border-white px-2 py-[10px] rounded-lg bg-blue-bg text-white transition-all duration-400"
            style={{ borderBottom: "1px solid white" }}
            value={selectedCompany}
            onChange={(e) => {
              setSelectedCompanyLocal(e.target.value);
              setSelectedCompany(e.target.value);
            }}
          >
            <option value="" disabled>
              Choose a Company
            </option>
            {companies?.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filter by Location */}
        <div className="flex gap-3 flex-col">
          <label htmlFor="location" className="text-white/60">Location</label>
          <select
            id="location"
            className="border-2 border-white px-2 py-[10px] rounded-lg bg-blue-bg text-white transition-all duration-400"
            style={{ borderBottom: "1px solid white" }}
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocationLocal(e.target.value);
              setSelectedLocation(e.target.value);
            }}
          >
            <option value="" disabled>
              Choose Location
            </option>
            {locations?.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="rounded-2xl p-5 bg-black-bg flex justify-end items-center">
        <button
          onClick={handleClearFilters}
          className="bg-blue-bg py-1 px-4 rounded-2xl text-white/90 font-semibold hover:bg-slate-500"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

export default Filter;
