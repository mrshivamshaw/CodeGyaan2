import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { useParams } from "react-router-dom";
import CourseCard from "../../components/Home/CourseView/CourseCard";
import Footer from "../../components/Footer/Footer";
import { getAllCourses } from "../../servies/operations/courseOpertaions";
import { useSelector } from "react-redux";

const SearchResults = () => {
  const { query } = useParams();
  const [courses, setCourses] = useState([]);
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    const fetchAndFilterCourses = async () => {
      const allCourses = await getAllCourses();
      if (allCourses && query) {
        const lowerQuery = query.toLowerCase();
        const filtered = allCourses.filter((course) => {
          const matchTitle = course.courseName?.toLowerCase().includes(lowerQuery);
          const matchDesc = course.courseDescription?.toLowerCase().includes(lowerQuery);
          const matchTags = course.tag?.some((t) => t.toLowerCase().includes(lowerQuery));
          
          return matchTitle || matchDesc || matchTags;
        });
        setCourses(filtered);
      }
    };

    fetchAndFilterCourses();
  }, [query]);

  return (
    <div className="w-full h-full bg-blue-bg">
      <NavBar />
      <div className="w-full py-10 bg-black-bg px-[3vw] flex flex-col gap-2 md:gap-3 lg:gap-4 xl:gap-4 mt-14 md:mt-14 lg:mt-32 xl:mt-32">
        <h2 className="text-white/80 text-base">
          Home / Search / <span className="text-glod-color">{query}</span>
        </h2>
        <h1 className="text-4xl text-white/95 font-semibold tracking-wide">
          Search Results for "{query}"
        </h1>
        <p className="w-[65%] text-base text-white/70 font-light">
          Browse courses matching your search criteria.
        </p>
      </div>
      <div className="w-full h-auto min-h-[40vh]">
        <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[85%] mx-auto py-10">
          <div className="text-xl text-glod-color font-semibold border-b-2 text-center border-glod-color w-[10vw] ">
            Results ({courses.length})
          </div>
          <hr className="border-1 border-white/70" />
          <div className="w-full h-auto py-10 flex flex-wrap gap-10">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                (course?.status === "Published" || (user && user._id === course?.instructor?._id)) && (
                  <CourseCard
                    key={index}
                    img={course.thumbnail}
                    title={course.courseName}
                    date={course.startDate}
                    instructor={course?.instructor ? `${course.instructor.firstName} ${course.instructor.lastName}` : "Unknown Instructor"}
                    id={course._id}
                    features={course.courseDescription}
                    original_price={course.price}
                    discounted_price={course.price - (20 / 100) * course.price}
                    discount_percentage={20}
                  />
                )
              ))
            ) : (
              <div className="text-white text-xl">No courses found matching your search.</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SearchResults;
