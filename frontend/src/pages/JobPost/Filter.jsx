import React, { useState } from "react";
import { Filter as FilterIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Select = ({ value, onChange, placeholder, options }) => (
  <select
    value={value}
    onChange={onChange}
    className="h-10 w-full rounded-md border border-border bg-secondary/50 px-3 text-sm text-foreground focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
  >
    <option value="">{placeholder}</option>
    {options?.map((o, i) => (
      <option key={i} value={o}>
        {o}
      </option>
    ))}
  </select>
);

const Filter = ({
  companies,
  locations,
  setSelectedCompany,
  setSelectedLocation,
}) => {
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");

  const clear = () => {
    setCompany("");
    setLocation("");
    setSelectedCompany("");
    setSelectedLocation("");
  };

  return (
    <aside className="sticky top-24 hidden h-fit w-[300px] shrink-0 overflow-hidden rounded-2xl border border-border bg-card lg:block">
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Filters</h3>
        </div>
        <button
          onClick={clear}
          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          <X className="h-3 w-3" /> Clear
        </button>
      </div>
      <div className="space-y-5 p-5">
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Select
            value={company}
            onChange={(e) => {
              setCompany(e.target.value);
              setSelectedCompany(e.target.value);
            }}
            placeholder="All companies"
            options={companies}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="location">Location</Label>
          <Select
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setSelectedLocation(e.target.value);
            }}
            placeholder="Anywhere"
            options={locations}
          />
        </div>
        <Button onClick={clear} variant="outline" className="w-full">
          Reset filters
        </Button>
      </div>
    </aside>
  );
};

export default Filter;
