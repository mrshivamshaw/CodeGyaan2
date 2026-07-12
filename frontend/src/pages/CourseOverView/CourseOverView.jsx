import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import NavBar from "../../components/NavBar/NavBar";
import HeroSection from "../../components/CourseOverView/HeroSection";
import CourseContent from "../../components/CourseOverView/CourseContent";
import ReviewSection from "../../components/CourseOverView/ReviewSection";
import BuyCourseCard from "../../components/CourseOverView/BuyCourseCard";
import Footer from "../../components/Footer/Footer";
import { getFullDetailsOfCourse } from "../../servies/operations/courseOpertaions";
import { setLoading } from "../../slices/UIslice";

const CourseOverView = () => {
  const [result, setResult] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await getFullDetailsOfCourse(id);
        setResult(data);
      } catch (e) {
        console.error(e);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchData();
  }, [dispatch, id]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container-page py-12">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr,auto]">
          <div className="min-w-0">
            <HeroSection course={result} />
            <CourseContent
              content={result?.courseContent}
              author={result?.instructor}
            />
            <ReviewSection reviews={result?.ratingAndReviews} />
          </div>
          <BuyCourseCard
            thumbnail={result?.thumbnail}
            id={result?._id}
            price={result?.price}
            sectionId={result?.courseContent?.[0]?._id}
            subSectionId={result?.courseContent?.[0]?.subSection?.[0]?._id}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CourseOverView;
