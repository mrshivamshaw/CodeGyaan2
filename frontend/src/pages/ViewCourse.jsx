import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import { getFullCompleteCourse } from "../servies/operations/courseOpertaions";
import VideoDetailsSidebar from "../components/ViewCourse/VideoDetailsSidebar";
import CourseReviewModal from "../components/ViewCourse/CourseReviewModal";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(true);

  const {
    courseSectionData,
    courseEntireData,
    completedLectures,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [lectures, setLectures] = useState(0);

  useEffect(() => {
    (async () => {
      const courseData = await getFullCompleteCourse(courseId, token);
      // console.log("Course Data here... ", courseData);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData));
      dispatch(setCompletedLectures(courseData.completedVideos));

      let totalLectures = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        totalLectures += sec?.subSection.length;
      });
      setLectures(totalLectures);
      dispatch(setTotalNoOfLectures(totalLectures));

      // console.log("Lectures", totalLectures);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, token, dispatch]);

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] justify-between ">
      <NavBar/>
      <div className="relative w-full flex justify-start md:justify-start lg:justify-end xl:justify-end items-start flex-col md:flex-col lg:flex-row-reverse xl:flex-row-reverse h-full md:h-full lg:h-[83vh] xl:h-[83vh] mt-[75px] md:mt-[75px] lg:mt-32 xl:mt-32">
        <div className= {`flex ${!open ? "w-full md:w-full lg:w-[95%] xl:w-[95%] " : 'w-full md:w-full lg:w-[80%] xl:w-[80%] '} overflow-auto profile`}>
          <div className="w-[100%]">
            <Outlet />
          </div>
        </div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} open={open} setOpen={setOpen} />
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  )
}