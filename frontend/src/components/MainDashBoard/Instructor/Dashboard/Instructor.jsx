import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../servies/operations/courseOpertaions.js";
import { getUserDetails } from "../../../../servies/operations/profileOperation.js";
import InstructorChart from "./InstructorChart";
import { Link } from "react-router-dom";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const instructorApiData = await getUserDetails(token);
        const result = await fetchInstructorCourses(token);
        // console.log(instructorApiData);
        // console.log(result);
        if (instructorApiData.length) setInstructorData(instructorApiData);
        if (result) {
          setCourses(result);
          // console.log(result);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDetails();
  }, [token]);

  useEffect(() => {
    const calculate = () => {
      let totalAmount = 0;
      let totalStudents = 0;
      courses.forEach((course) => {
        totalAmount += course.price * course.studentsEnrolled.length;
        totalStudents += course.studentsEnrolled.length;
      });
      setTotalAmount(totalAmount);
      setTotalStudents(totalStudents);
    };

    calculate();
  }, [courses]);

  return (
    <div className="w-[100%] md:w-[100%] lg:w-[80%] xl:w-[80%] h-[81vh] profile pb-[10vh] pt-[5vh] mt-1 px-4 md:px-4 lg:px-4 xl:px-4 p-0 md:p-0 lg:p-0 mx-auto xl:p-8 overflow-y-scroll">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-white">
          Hi <span className="text-glod-color">{user?.firstName}</span>👋
        </h1>
        <p className="font-medium text-richblack-200 text-white/90">
          Let's start something new
        </p>
      </div>
      {loading ? (
        <div className="h-full w-full flex justify-center items-center">
          <div className="spinner"></div>
        </div>
      ) : courses.length > 0 ? (
        <div>
          <div className="my-4 flex flex-col md:flex-col lg:flex-row xl:flex-row h-auto md:h-auto lg:h-[450px] xl:h-[450px] gap-4 text-white">
            {/* Render chart / graph */}
            {totalAmount > 0 || totalStudents > 0 ? (
              <InstructorChart courses={courses} />
            ) : (
              <div className="flex-1 rounded-md bg-richblack-800 p-6 bg-black-bg">
                <p className="text-lg font-bold text-richblack-5">Visualize</p>
                <p className="mt-4 text-xl font-medium text-richblack-50">
                  Not Enough Data To Visualize
                </p>
              </div>
            )}
            {/* Total Statistics */}
            <div className="flex min-w-[250px] flex-col rounded-md  p-6 bg-black-bg">
              <p className="text-lg font-bold text-richblack-5">Statistics</p>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-lg text-richblack-200">Total Courses</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {courses.length}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Students</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    {totalStudents}
                  </p>
                </div>
                <div>
                  <p className="text-lg text-richblack-200">Total Income</p>
                  <p className="text-3xl font-semibold text-richblack-50">
                    Rs. {totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md w-full p-0 md:p-0 lg:p-6 xl:p-6">
            {/* Render 3 courses */}
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-white">Your Courses</p>
              <Link to="/dashboard/my-courses">
                <p className="text-xs font-semibold text-yellow-50">View All</p>
              </Link>
            </div>
            <div className="my-4 flex flex-col md:flex-col lg:flex-row xl:flex-row w-full items-start gap-6">
              {courses.slice(0, 3)?.map((course) => (
                <div
                  key={course._id}
                  className="w-full md:w-full lg:w-1/3 xl:w-1/3 "
                >
                  <img
                    src={course.thumbnail}
                    alt={course.courseName}
                    className="h-[161px] md:h-[301px] lg:h-[208px] xl:h-[208px] min-w-full rounded-md object-cover"
                  />
                  <div className="mt-3 w-full">
                    <p className="text-sm font-medium text-white/90">
                      {course.courseName}
                    </p>
                    <div className="mt-1 flex items-center space-x-2">
                      <p className="text-xs font-medium text-white/80">
                        {course.studentsEnrolled.length} students
                      </p>
                      <p className="text-xs font-medium text-white/80">|</p>
                      <p className="text-xs font-medium text-white/80">
                        Rs. {course.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-20 rounded-md p-6 py-20">
          <p className="text-center text-2xl font-bold text-richblack-5">
            You have not created any courses yet
          </p>
          <Link to="/dashboard/add-course">
            <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
              Create a course
            </p>
          </Link>
        </div>
      )}
    </div>
  );
}
