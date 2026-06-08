import React from "react";

const Loader = () => {
  return (
    <div
      role="progressbar"
      aria-label="Loading"
      className="fixed inset-x-0 top-0 z-[100] h-0.5 overflow-hidden bg-transparent"
    >
      <div
        className="h-full w-1/3 animate-shimmer rounded-full"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, hsl(var(--primary)), hsl(38 95% 70%), transparent)",
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
};

export default Loader;
