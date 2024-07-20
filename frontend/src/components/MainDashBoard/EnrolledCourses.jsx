import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getEnrolledCourses } from "../../servies/operations/profileOperation";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progressCount, setProgressCount] = useState([]);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const courses = await getEnrolledCourses(token);
        setEnrolledCourses(courses);
      } catch (error) {
        console.error("Could not fetch enrolled courses.", error);
      }
    };

    fetchEnrolledCourses();
    const storedProgress = JSON.parse(localStorage.getItem("ProgressCount")) || [];
    setProgressCount(storedProgress);
  }, [token]);

  const handleCourseClick = (courseId, sectionId, subSectionId) => {
    navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${subSectionId}`);
  };

  const getTotalVideos = (courseContent) => {
    return courseContent.reduce((total, section) => total + section.subSection.length, 0);
  };

  return (
    <div className="w-[95%] md:w-[95%] lg:w-[80%] xl:w-[80%] h-[81vh] profile pb-[10vh] pt-[5vh] mt-1 mx-auto xl:p-8 overflow-y-scroll">
      <div className="text-4xl w-full text-white font-bold">
        Enrolled <span className="text-glod-color">Courses</span>.
      </div>
      {!enrolledCourses.length ? (
        <div className="grid w-full min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="my-8 text-richblack-5 w-full">
          <div className="w-full hidden lg:block xl:block">
            <div className="flex justify-between items-center rounded-t-lg">
              <p className="w-[60%] py-3 text-white font-semibold text-lg">Course Name</p>
              <p className="w-[40%] text-start py-3 text-white font-semibold text-lg">Progress</p>
            </div>
          </div>
          {enrolledCourses.map((course, i) => {
            const progress = progressCount.find(prog => prog.courseId === course._id) || {};
            const totalVideos = getTotalVideos(course.courseContent);
            const progressPercentage = totalVideos ? (progress.courseProgressCount / totalVideos) * 100 : 0;

            return (
              <div
                className={`flex flex-col lg:flex-row items-start border ${i === enrolledCourses.length - 1 ? "rounded-lg" : "rounded-none"} mb-5 lg:mb-0`}
                key={course._id}
              >
                <div
                  className="flex w-full lg:w-[60%] cursor-pointer items-start gap-4 px-5 py-3"
                  onClick={() => handleCourseClick(course._id, course.courseContent[0]?._id, course.courseContent[0]?.subSection[0]?._id)}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="w-full lg:w-[300px] h-[180px] lg:h-[140px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-2 pl-2">
                    <p className="font-semibold text-xl text-white">{course.courseName}</p>
                    <p className="text-xs text-white/80">
                      {course.courseDescription.length > 50 ? `${course.courseDescription.slice(0, 50)}...` : course.courseDescription}
                    </p>
                  </div>
                </div>
                <div className="flex w-full lg:w-1/5 flex-col gap-2 px-2 py-3">
                  <p className="text-white">Progress: {progressPercentage.toFixed(2)}%</p>
                  <ProgressBar
                    bgColor="linear-gradient(90deg, rgba(36,31,0,1) 0%, rgba(222,188,18,0.2778361344537815) 0%, rgba(250,252,190,1) 0%, rgba(255,235,0,1) 100%)"
                    completed={progressPercentage}
                    height="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
