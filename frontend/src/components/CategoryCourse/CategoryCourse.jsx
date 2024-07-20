import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import { useParams } from "react-router-dom";
import { fetchCourseByCategory } from "../../servies/operations/courseOpertaions";
import CourseCard from "../Home/CourseView/CourseCard";
import Footer from "../Footer/Footer";
import toast from "react-hot-toast";

const CategoryCourse = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [frequentlyViewed, setFrequentlyViewed] = useState([]);
  const name = JSON.parse(sessionStorage.getItem("category")).find(
    (item) => item._id === category
  ).name;
  const description = JSON.parse(sessionStorage.getItem("category")).find(
    (item) => item._id === category
  ).description;

  useEffect(() => {
    const getCategories = async () => {
      // const toast = toast.loading("Please wait...");
      const categories = await fetchCourseByCategory(category);
      setCourses(categories);
      //   toast.dismiss(toast);
      //   console.log(categories);
    };

    getCategories();

    const allCourses = JSON.parse(sessionStorage.getItem("getAllCourses"));
    if (allCourses) {
        const shuffledCourses = shuffleArray(allCourses);
        setRelatedCourses(shuffledCourses.slice(0, 5));
        setFrequentlyViewed(shuffledCourses.slice(5, 10));
      }
  }, [category]);

  // Fisher-Yates shuffle algorithm
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  return (
    <div className="w-full h-full bg-blue-bg">
      <NavBar />
      <div className="w-full py-10 bg-black-bg px-[3vw] flex flex-col gap-2 md:gap-3 lg:gap-4 xl:gap-4 mt-14 md:mt-14 lg:mt-32 xl:mt-32">
        <h2 className="text-white/80 text-base">
          Home / Category / <span className="text-glod-color">{name}</span>
        </h2>
        <h1 className="text-4xl text-white/95 font-semibold tracking-wide">
          {name}
        </h1>
        <p className="w-[65%] text-base text-white/70 font-light">
          {description}
        </p>
      </div>
      <div className="w-full h-auto">
        <div className="w-[95%] md:w-[90%] lg:w-[85%] xl:w-[85%] mx-auto py-10">
          <div className="text-xl text-glod-color font-semibold border-b-2 text-center border-glod-color w-[10vw] ">
            Most Popular
          </div>
          <hr className="border-1 border-white/70" />
          <div className="w-full h-auto py-10 flex flex-wrap  gap-10">
            {courses.map((course, index) => (
              course?.status === "Published" && <CourseCard
                key={index}
                img={course.thumbnail}
                title={course.courseName}
                date={course.startDate}
                instructor={`${course.instructor.firstName} ${course.instructor.lastName}`}
                id={course._id}
                features={course.courseDescription}
                original_price={course.price}
                discounted_price={course.price - (20 / 100) * course.price}
                discount_percentage={20}
              />
            ))}
          </div>
          <div className="text-4xl text-white font-semibold text-start mt-16">
            Related <span className="text-glod-color">Courses</span>.
          </div>
          <div className="w-full h-auto pb-10 pt-5 flex flex-wrap  gap-10">
            {relatedCourses?.map((course, index) => (
              course?.status === "Published" && <CourseCard
                key={index}
                img={course.thumbnail}
                title={course.courseName}
                date={course.startDate}
                instructor={`${course.instructor.firstName} ${course.instructor.lastName}`}
                id={course._id}
                features={course.courseDescription}
                original_price={course.price}
                discounted_price={course.price - (20 / 100) * course.price}
                discount_percentage={20}
              />
            ))}
          </div>
          <div className="text-4xl text-white font-semibold text-start mt-16">
            Frequently <span className="text-glod-color">Viewed</span>.
          </div>
          <div className="w-full h-auto pb-10 pt-5 flex flex-wrap gap-10">
            {frequentlyViewed?.map((course, index) => (
              course?.status === "Published"  && <CourseCard
                key={index}
                img={course.thumbnail}
                title={course.courseName}
                date={course.startDate}
                instructor={`${course.instructor.firstName} ${course.instructor.lastName}`}
                id={course._id}
                features={course.courseDescription}
                original_price={course.price}
                discounted_price={course.price - (20 / 100) * course.price}
                discount_percentage={20}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryCourse;
