import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { LiaFreeCodeCamp } from "react-icons/lia";
import { BsCart4, BsSearch } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { FaAngleDown, FaGraduationCap, FaIdCardAlt, FaPlus } from "react-icons/fa";
import CourseList from "./CourseList";
import { TiArrowSortedDown } from "react-icons/ti";
import { RiArrowRightSLine, RiDashboard2Line } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setToken } from "../../slices/authSlice";
import { logout } from "../../servies/operations/authOpertaion";
import { setLoading } from "../../slices/UIslice";
import { getCart } from "../../servies/operations/cartOperation";
import toast from "react-hot-toast";
import { FaBarsStaggered } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { MdSettings } from "react-icons/md";
import { HiArrowSmLeft } from "react-icons/hi";

const NavBar = () => {
  const [dashboardActive, setDashboardActive] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const [searchActive, setSearchActive] = useState(false);
  const [phnExt, setPhnExt] = useState(false);
  const [phnDashboard, setPhnDashboard] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setToken(token));
    }
  }, [token]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getCartHandler = async () => {
    dispatch(setLoading(true));
    await getCart(dispatch, setLoading, toast);
    dispatch(setLoading(false));
    console.log(cart);
    navigate("/dashboard/your-cart");
  };

  return (
    <div className="h-auto max-w-[100vw] overflow-x-hidden py-4 flex flex-col gap-4 shadow-md shadow-black">
      <div className="flex justify-between items-center w-[95%] md:w-[90%] lg:w-[85%] xl:w-[85%] mx-auto ">
        <Link to={"/"}>
          {" "}
          <h1 className="text-xl md:text-xl lg:text-3xl xl:text-3xl font-bold text-white flex justify-start items-center">
            <LiaFreeCodeCamp className="text-[44px] mr-1" />
            Code<span className="text-glod-color">Gyaan</span>.
          </h1>
        </Link>
        <div className="w-[50%] hidden md:hidden lg:block xl:block">
          <div className="w-[100%] relative flex justify-center items-center  border-black bg-black-bg text-white rounded-xl">
            <IoSearch className="px-3 text-[2.6rem] bg-glod-color rounded-l-xl group hover:bg-[#b99b55] cursor-pointer " />
            <input
              type="text"
              className="w-full allunset h-full border-none rounded-lg px-4"
              placeholder="Search by product title"
            />
          </div>
        </div>
        {!token && (
          <div className="w-auto hidden md:hidden lg:block xl:block">
            <div className="flex bg-[#cbab61] px-5 py-3 rounded hover:bg-[#b99b55] text-white">
              <Link to={"/login"}>
                <div className="text-base hover:cursor-pointer font-medium">
                  Login /
                </div>
              </Link>
              <Link to={"/signin"}>
                <div className="text-base hover:cursor-pointer font-medium">
                  &nbsp;Signin
                </div>
              </Link>
            </div>
          </div>
        )}
        <div className="block md:block lg:hidden xl:hidden">
          <div className="flex justify-end items-center gap-2">
            <BsSearch
              className="text-white/80 text-xl font-bold"
              onClick={() => setSearchActive(!searchActive)}
            />
            {searchActive || phnExt ? (
              <RxCross2
                className="text-white/80 text-2xl font-bold"
                onClick={() => {
                  setSearchActive(false);
                  setPhnExt(false);
                  setPhnDashboard(false);
                }}
              />
            ) : (
              <FaBarsStaggered
                className="text-white/80 text-xl font-bold"
                onClick={() => setPhnExt(!phnExt)}
              />
            )}
          </div>
        </div>

        {token && (
          <div className="hidden md:hidden lg:block xl:block">
            <div className="flex justify-center items-center gap-1 text-white py-1 ">
            {user?.accountType === "Student" && (
              <div
                onClick={getCartHandler}
                className={
                  "flex justify-center items-center cursor-pointer group relative"
                }
              >
                <BsCart4 style={{ fontSize: "20px" }} />
                <div className="absolute bg-yellow-300 w-[14px] h-[14px] text-[10px] text-center -top-1 -right-1 text-black/50 font-bold rounded-full">
                  {totalItem}
                </div>
              </div>
            )}

            <div
              onClick={
                dashboardActive
                  ? () => setDashboardActive(false)
                  : () => setDashboardActive(true)
              }
              className="flex justify-center items-center cursor-pointer group"
            >
              {/* <div className="bg-glod-color px-2 py-1 rounded-full">{user.firstName}</div> */}
              <img
                className="w-[35px] h-[35px] rounded-full"
                src={user?.image}
                alt="profile"
              />
              <TiArrowSortedDown style={{ fontSize: "15px" }} />
              <div
                className={
                  dashboardActive
                    ? "bg-[#2c2d30] absolute top-[9vh] right-[6vw] block group-hover:block hover:block  rounded-md"
                    : "bg-[#2c2d30] absolute top-[9vh] right-[6vw] hidden group-hover:block hover:block  rounded-md"
                }
              >
                <NavLink to={"/dashboard/profile"}>
                  <div className="flex justify-start items-center px-3 hover:bg-slate-700 font-light py-2 rounded-md gap-1">
                    <RiDashboard2Line />
                    <div>Dashboard</div>
                  </div>
                </NavLink>
                <div className="flex justify-start items-center px-3  hover:bg-slate-700 font-light py-2 rounded-md gap-1">
                  <IoMdLogOut />
                  <div onClick={logoutHandler}>Logout</div>
                </div>
              </div>
            </div>
          </div>
          </div>
        )}
      </div>
      <div className="w-[85%] mx-auto hidden md:hidden lg:block xl:block mt-3">
        <div className="flex justify-between items-center text-white font-normal text-base ">
          <Link to={"/"}>
            <div className="flex justify-center items-center">Home</div>
          </Link>
          <div className="flex justify-center items-center group cursor-pointer">
            <span>Courses </span>
            <CourseList /> <FaAngleDown className="ml-1" />{" "}
          </div>
          <div className="flex justify-center items-center">Job Portal</div>
          <Link to={"/aboutus"}>
            <div className="flex justify-center items-center">About Us</div>
          </Link>
          <Link to={"/contact-us"}>
            <div className="flex justify-center items-center">Contact Us</div>
          </Link>
        </div>
      </div>
      {searchActive && (
        <div className="w-[95%] mx-auto">
          <div className="w-[100%] relative flex justify-center items-center  border-black bg-black-bg text-white rounded-xl">
            <IoSearch className="px-3 text-[2.6rem] bg-glod-color rounded-l-xl group hover:bg-[#b99b55] cursor-pointer " />
            <input
              type="text"
              className="w-full allunset h-full border-none rounded-lg px-4"
              placeholder="Search by product title"
            />
          </div>
        </div>
      )}
      {phnExt && (
        <div className="w-[85%] mx-auto block md:block lg:hidden xl:hidden mt-3 ">
          <div className="flex flex-col items-start justify-start gap-8 text-white font-normal text-base ">
            {!token ? (
              <div className="w-auto mx-auto">
                <div className="flex bg-[#cbab61] px-5 py-3 rounded hover:bg-[#b99b55] text-white">
                  <Link to={"/login"}>
                    <div className="text-base hover:cursor-pointer font-medium">
                      Login /
                    </div>
                  </Link>
                  <Link to={"/signin"}>
                    <div className="text-base hover:cursor-pointer font-medium">
                      &nbsp;Signin
                    </div>
                  </Link>
                </div>
              </div>
            ) : 
              !phnDashboard ? <div
                onClick={() => setPhnDashboard(!phnDashboard)}
                className="w-full"
              >
                <div className="flex justify-between items-center">
                  <div className="flex justify-center items-center gap-2">
                    <img
                      src={user?.image}
                      alt="profile"
                      className="w-[65px] h-[65px] rounded-full"
                    />
                    <div className="">
                      <h2 className="text-glod-color font-semibold text-lg italic">
                        Hey
                      </h2>
                      <h3 className="text-white/80">
                        {user?.firstName + " " + user?.lastName}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <RiArrowRightSLine className="text-white/90 text-2xl" />
                  </div>
                </div>
              </div> :
              <div className="flex justify-start items-center gap-1 text-white/80" onClick={() => setPhnDashboard(!phnDashboard)}>
                <HiArrowSmLeft className="text-lg" /> <span>Back</span>
              </div>
            }
            {!phnDashboard ? (
              <div className="flex flex-col justify-start items-start gap-8">
                <Link to={"/"}>
                  <div className="flex justify-center items-center text-xl">
                    Home
                  </div>
                </Link>
                <div className="flex justify-center items-center text-xl group cursor-pointer">
                  <span>Courses </span>
                  <CourseList /> <FaAngleDown className="ml-1" />{" "}
                </div>
                <div className="flex justify-center items-center text-xl">
                  Job Portal
                </div>
                <Link to={"/aboutus"}>
                  <div className="flex justify-center items-center text-xl">
                    About Us
                  </div>
                </Link>
                <Link to={"/contact-us"}>
                  <div className="flex justify-center items-center text-xl">
                    Contact Us
                  </div>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col justify-start items-start gap-8">
                <NavLink to={"/dashboard/profile"}>
                  <div className=" w-full flex justify-start items-center gap-1 text-xl rounded-l-3xl">
                    <CgProfile />
                    <div>Profile</div>
                  </div>
                </NavLink>
                {user?.accountType === "Student" && (
                  <NavLink to={"/dashboard/enrolled-courses"}>
                    <div className=" w-full flex justify-start items-center gap-1 text-xl rounded-l-3xl">
                      <FaGraduationCap />
                      <div>Enrolled Courses</div>
                    </div>
                  </NavLink>
                )}
                {user?.accountType === "Student" && (
                  <NavLink to={"/dashboard/your-cart"}>
                    <div className=" w-full flex justify-start items-center gap-1 text-xl rounded-l-3xl">
                      <BsCart4 />
                      <div>Your Collections</div>
                    </div>
                  </NavLink>
                )}
                {user?.accountType === "Instructor" && (
                  <NavLink to={"/dashboard/dashboard"}>
                    <div className=" w-full flex justify-start items-center gap-1 text-xl rounded-l-3xl">
                      <FaGraduationCap />
                      <div>Dashboard</div>
                    </div>
                  </NavLink>
                )}
                {user?.accountType === "Instructor" && (
                  <NavLink to={"/dashboard/my-courses"}>
                    <div className=" w-full flex justify-start items-center gap-1 text rounded-l-3xl">
                      <BsCart4 />
                      <div>My Courses</div>
                    </div>
                  </NavLink>
                )}
                {user?.accountType === "Instructor" && (
                  <NavLink to={"/dashboard/add-courses"}>
                    <div className=" w-full flex justify-start items-center gap-1 text-xl rounded-l-3xl">
                      <FaPlus />
                      <div>Add Courses</div>
                    </div>
                  </NavLink>
                )}
                <NavLink to={'/dashboard/setting'}>
                <div className='w-full flex justify-start items-center gap-1 text-xl rounded-l-3xl'>
                    <MdSettings/>
                    <div>Settings</div>
                </div>
            </NavLink>
            <div onClick={logoutHandler} className='w-full flex justify-start cursor-pointer items-center gap-1 text-xl rounded-l-3xl'>
                <IoMdLogOut/>
                <div>Logout</div>
            </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
