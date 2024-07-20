import React from "react";
import { GiPodiumWinner, GiGraduateCap } from "react-icons/gi";
import { IoDiamondSharp, IoCodeSlashSharp } from "react-icons/io5";
import girlStudy from "../../../assets/TimelineImage.a610b1e5d891ac77fe93.png";
import { Link } from "react-router-dom";

const HomeSection3 = () => {
  return (
    <div className="w-full py-10">
      <div className="w-[95%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto flex flex-col justify-start items-start">
        <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between items-start w-full gap-4">
          <h1 className="w-[100%] md:w-[50%]lg:w-[50%] xl:w-[50%] text-[30px] md:text-4xl lg:text-4xl xl:text-4xl text-white font-semibold">
            Get the skills you need for a{" "}
            <span className="text-glod-color">job that is in demand.</span>
          </h1>
          <div className="w-[100%] md:w-[50%]lg:w-[50%] xl:w-[50%] flex flex-col justify-start items-start gap-5">
            <p className="text-white font-light">
              The modern CodeGyaan is the dictates its own terms. Today, to be a
              competitive specialist requires more than professional skills.
            </p>
            <Link to="/dashboard/profile">
              <button className="py-3 px-6 bg-glod-color rounded font-semibold text-white hover:bg-[#b99b55]">
                Learn More
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-col lg:flex-row xl:flex-row justify-start md:justify-start lg:justify-center xl:justify-center items-center py-16 gap-8">
          <div className="flex flex-col justify-start items-start gap-4 w-full md:w-full lg:w-auto xl:w-auto">
            <div className="flex justify-center items-center gap-7">
              <GiPodiumWinner className="text-6xl text-[#939ad8] bg-black-bg rounded-full p-4" />
              <div className="flex flex-col justify-start items-start gap-1">
                <h2 className="text-white text-xl font-semibold">Leadership</h2>
                <p className="text-white text-sm">
                  Fully committed to the success company
                </p>
              </div>
            </div>
            <div className="h-[5vh] w-full border-dotted border-l-2 ml-7"></div>
            <div className="flex justify-center items-center gap-7">
              <GiGraduateCap className="text-6xl text-rose-500 bg-black-bg rounded-full p-4" />
              <div className="flex flex-col justify-start items-start">
                <h2 className="text-white text-xl font-semibold">
                  Responsibility
                </h2>
                <p className="text-white text-sm">
                  Students will always be our top priority
                </p>
              </div>
            </div>
            <div className="h-[5vh] w-full border-dotted border-l-2 ml-7"></div>
            <div className="flex justify-center items-center gap-7">
              <IoDiamondSharp className="text-6xl text-green-400 bg-black-bg rounded-full p-4" />
              <div className="flex flex-col justify-start items-start">
                <h2 className="text-white text-xl font-semibold">
                  Flexibility
                </h2>
                <p className="text-white text-sm">
                  The ability to switch is an important skills
                </p>
              </div>
            </div>
            <div className="h-[5vh] w-full border-dotted border-l-2 ml-7"></div>
            <div className="flex justify-center items-center gap-7">
              <IoCodeSlashSharp className="text-6xl text-yellow-400 bg-black-bg rounded-full p-4" />
              <div className="flex flex-col justify-start items-start">
                <h2 className="text-white text-xl font-semibold">
                  Solve the problem
                </h2>
                <p className="text-white text-sm">
                  Code your way to a solution
                </p>
              </div>
            </div>
          </div>
          <div className="relative w-[100%] md:w-full lg:w-[55%] xl:w-[55%]">
            <div className=" h-auto z-10 shadow-2xl shadow-black/10 w-full">
              <img src={girlStudy} alt="timeline" className="w-[100%] md:h-[40vh] lg:h-[40vh] xl:h-[40vh] min-h-[55vh]" />
            </div>
            <div className="bg-glod-color absolute -bottom-14 left-5 z-20 w-[92%] flex justify-center items-center py-7 px-3">
              <div className="flex justify-center items-center w-[50%] border-r gap-2 md:gap-2 lg:gap-6 xl:gap-6">
                <div className="text-4xl font-bold text-white">10</div>
                <div className="text-sm font-semibold text-[#f6f1e5]">
                  YEARS
                  <br />
                  EXPERIENCES
                </div>
              </div>
              <div className="flex justify-center items-center w-[50%] gap-2 md:gap-2 lg:gap-6 xl:gap-6">
                <div className="text-4xl font-bold text-white">250</div>
                <div className="text-sm font-semibold text-[#f6f1e5]">
                  TYPES OF <br /> COURSES
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection3;
