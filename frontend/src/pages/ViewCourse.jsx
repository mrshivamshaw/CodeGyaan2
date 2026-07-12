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
  const [reviewModal, setReviewModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const courseData = await getFullCompleteCourse(courseId, token);
      dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent));
      dispatch(setEntireCourseData(courseData));
      dispatch(setCompletedLectures(courseData.completedVideos));
      const total = (courseData?.courseDetails?.courseContent || []).reduce(
        (a, s) => a + (s.subSection?.length || 0),
        0
      );
      dispatch(setTotalNoOfLectures(total));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, token, dispatch]);

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="flex flex-col lg:flex-row">
        <VideoDetailsSidebar
          setReviewModal={setReviewModal}
          open={open}
          setOpen={setOpen}
        />
        <main className="min-w-0 flex-1">
          <Outlet />
        </main>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </div>
  );
}
