import React from "react";
import banner1 from "../../../../assets/banners/banner-3.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const HomeSection5pages3 = () => {
  return (
    <div className="min-w-[100%] h-[100vh] md:h-auto lg:h-[100vh] xl:h-[100vh] flex flex-col-reverse md:flex-col-reverse lg:flex-row xl:flex-row justify-center items-center relative">
      <div className="w-[100%] md:w-[100%] lg:w-[50%] xl:w-[50%] bg-[#b35647] h-[50%] md:h-[50%] lg:h-[100%] xl:h-[100%] flex flex-col justify-start items-start py-3 md:py-3 lg:py-24 xl:py-24 px-3 md:px-3 lg:px-28 xl:px-28 gap-8">
        <div className="flex w-[100%] flex-col justify-start items-start gap-2">
          <h1 className="text-[22px] md:text-[22px] lg:text-4xl xl:text-4xl font-bold text-white w-full text-center md:text-center lg:text-start xl:text-start">
            Real-Time Industry <br className="hidden md:hidden lg:block xl:block"/> Experience
          </h1>
          <p className="text-white font-light w-full text-center md:text-center lg:text-start xl:text-start">
            Learn & experience real-time development as per industry <br className="hidden md:hidden lg:block xl:block"/>{" "}
            standards
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-center lg:justify-start xl:justify-start items-center w-full gap-x-4 gap-y-5 my-6">
          <div className="flex flex-col justify-start items-start ">
            <div
              className="text-xl font-bold text-[#e39f97]"
              style={{ WebkitTextStroke: ".2px black" }}
            >
              15+
            </div>
            <div className="font-semibold text-white">Domains</div>
          </div>
          <div className="flex flex-col justify-start items-start ">
            <div
              className="text-xl font-bold text-[#e39f97]"
              style={{ WebkitTextStroke: ".2px black" }}
            >
              430+
            </div>
            <div className="font-semibold text-white">Projects</div>
          </div>
          <div className="flex flex-col justify-start items-start ">
            <div
              className="text-xl font-bold text-[#e39f97]"
              style={{ WebkitTextStroke: ".2px black" }}
            >
              3000+
            </div>
            <div className="font-semibold text-white">Interns</div>
          </div>
        </div>
        <Link to={"/dashboard/profile"}>
        <button className=" bg-white px-4 py-2 rounded w-full md:w-full lg:w-auto xl:w-auto ">
          <span className="mr-1 font-light">Explore</span>
          <span>
            <FaArrowRight className="inline" />
          </span>
        </button>
                  </Link>
        <button className="rounded text-white hidden md:hidden lg:block xl:block ">
          <span className="mr-1 font-light">Skip</span>
          <span>
            <FaArrowRight className="inline" />
          </span>
        </button>
      </div>
      <div className="w-[100%] md:w-[100%] lg:w-[50%] xl:w-[50%] h-[50%] md:h-[50%] lg:h-[100%] xl:h-[100%]">
        <img src={banner1} alt="banner1" className="w-full h-full" />
      </div>
      <div className="hidden md:hidden lg:block xl:block absolute ">
        <div className=" w-[300px] h-[300px] bg-[#CF6A5D] rounded-full flex flex-col justify-center items-center text-white">
            <div>
            <div className="text-xl font-bold">“Earn your</div>
            <div className="text-3xl font-bold">Experience</div>
            <div className="text-3xl font-bold">Letter”</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection5pages3;
