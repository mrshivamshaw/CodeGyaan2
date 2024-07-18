import { useEffect, useState } from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getEnrolledCourses } from "../../servies/operations/profileOperation.js";

export default function EnrolledCourses() {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [ProgressCount, setProgressCount] = useState([]);
  const getUserEnrolledCourses = async () => {
    try {
      setEnrolledCourses(await getEnrolledCourses(token));
      console.log(enrolledCourses);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };
  useEffect(() => {
    getUserEnrolledCourses();
    setProgressCount(JSON.parse(localStorage.getItem("ProgressCount")));
  }, []);

  return (
    <div className="w-[95%] md:w-[95%] lg:w-[80%] xl:w-[80%] h-[81vh]  profile pb-[10vh] pt-[5vh] mt-1 p-0 md:p-0 lg:p-0 mx-auto xl:p-8 overflow-y-scroll">
      <div className="text-4xl w-full text-white font-bold">
        Enrolled <span className="text-glod-color">Courses</span>.
      </div>
      {!enrolledCourses ? (
        <div className="grid w-full min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !enrolledCourses.length ? (
        <p className="grid h-[100%] w-full place-content-center text-white/80 text-3xl">
          You have not enrolled in any course yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5 w-full">
          {/* Headings */}
          <div className="w-full hidden md:hidden lg:block xl:block">
            <div className="flex w-full justify-between items-center  rounded-t-lg ">
              <p className="w-[60%]  py-3 text-white font-semibold text-lg">
                Course Name
              </p>

              <p className="w-[40%] text-start py-3 text-white font-semibold text-lg ">
                Progress
              </p>
            </div>
          </div>
          {/* Course Names */}
          {enrolledCourses.map((course, i, arr) => {
            const progress = ProgressCount.find(
              (prog) => prog.courseId === course._id
            );
            let toatalVideo = 0;
            course?.courseContent?.forEach((section) => {
              toatalVideo += section?.subSection?.length;
            })
            return (
              <div
                className={`flex flex-col md:flex-col lg:flex-row xl:flex-row items-start border mb-5 md:mb-5 lg:mb-0 xl:mb-0 ${
                  i === arr.length - 1 ? "rounded-lg" : "rounded-none"
                }`}
                key={i}
              >
                <div
                  className="flex flex-col md:flex-col lg:flex-row xl:flex-row w-[100%] md:w-[100%] lg:w-[45%] xl:w-[60%] cursor-pointer items-start md:items-start lg:items-start xl:items-start gap-4 px-0 md:px-0 lg:px-5 xl:px-5 py-0 md:py-0 lg:py-0 xl:py-3"
                  onClick={() => {
                    navigate(
                      `/view-course/${course._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    );
                  }}
                >
                  <img
                    src={course.thumbnail}
                    alt="course_img"
                    className="min-w-full w-full md:min-w-full md:w-full lg:min-w-[180px] lg:w-[300px] min-h-[100px] h-[180px] md:min-h-[100px] md:h-[280px] lg:min-h-[100px] lg:h-[140px] xl:min-h-[100px] xl:h-[140px] rounded-lg object-cover"
                  />
                  <div className="flex max-w-xs flex-col gap-2 pl-2">
                    <p className="font-semibold text-xl text-white">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-white/80">
                      {course.courseDescription.length > 50
                        ? `${course.courseDescription.slice(0, 50)}...`
                        : course.courseDescription}
                    </p>
                  </div>
                </div>
                <div className="flex w-full md:w-full lg:w-1/5 xl:w-1/5 flex-col gap-2 px-2 py-3">
                  <p className="text-white">
                    Progress: {progress ? progress.courseProgressCount/toatalVideo * 100 : 0}%
                  </p>
                  <ProgressBar
                    bgColor="linear-gradient(90deg, #f9cb5e 0%, #FFC000 100%)"
                    completed={progress ?  progress.courseProgressCount/toatalVideo * 100 : 0}
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
