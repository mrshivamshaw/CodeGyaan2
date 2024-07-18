import React from "react";
import { FaShareFromSquare } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../slices/UIslice";
import { addToCartt } from "../../servies/operations/cartOperation";
import { toast } from "react-hot-toast";
import { order } from "../../servies/operations/paymentOperation";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";

const BuyCourseCard = ({ thumbnail, price, id, sectionId, subSectionId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  // console.log(cart);
  const addToCartHandler = async () => {
    // Check if the course is already in the cart
    const isCourseInCart = cart.some((course) => course._id === id);

    if (isCourseInCart) {
      navigate("/dashboard/your-cart");
      return;
    }

    // If not, add the course to the cart
    addToCartt(dispatch, setLoading, id, toast);
  };

  const buyCourseHandler = async () => {
    if (!localStorage.getItem("user") || !localStorage.getItem("token")) {
      navigate("/login");
    }
    if (JSON.parse(localStorage.getItem("user")).enrolledCourses.includes(id)) {
      navigate(
        `/view-course/${id}/section/${sectionId}/sub-section/${subSectionId}`
      );
      return;
    }
    const toastId = toast.loading("Please wait...");
    // console.log([id],JSON.parse(localStorage.getItem("user"))._id)
    await order([id], JSON.parse(localStorage.getItem("user")), navigate);
    toast.dismiss(toastId);
  };

  const copyToClipboard = () => {
    const link = window.location.href;
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success("Link Copied"))
      .catch(() => toast.error("Could not copy"));
  };

  return (
    <div className="w-full md:w-full lg:w-[490px] xl:w-[490px] h-[530px] bg-black-bg rounded-xl shadow-md shadow-black mr-9 p-4">
      <div className="w-full h-[220px] bg-glod-color rounded-t-xl flex justify-center items-center">
        <img src={thumbnail} alt="img" className="w-full h-[220px]" />
      </div>
      <div className="flex flex-col justify-between items-center p-2 gap-5">
        <h1 className="text-4xl font-semibold w-full text-start text-white">
          Rs. {price}
        </h1>
        <button
          onClick={buyCourseHandler}
          className="bg-glod-color -mt-2 px-4 py-2 rounded w-full text-center font-semibold text-white/90 text-lg"
        >
          {JSON.parse(localStorage.getItem("user"))?.enrolledCourses.includes(
            id
          ) ? (
            <span className="flex justify-center items-center">
              View <FiArrowUpRight className="text-2xl font-bold" />
            </span>
          ) : (
            "Buy Now"
          )}
        </button>
        {!JSON.parse(localStorage.getItem("user"))?.enrolledCourses.includes(
          id
        ) && (
          <button
            onClick={addToCartHandler}
            className="bg-glod-color px-4 py-2 rounded w-full text-center font-semibold text-white/90 text-lg"
          >
            {cart.map((course) => course._id).includes(id)
              ? "View Cart"
              : "Add to Cart"}
          </button>
        )}
        <p className="text-white/90 font-semibold">
          30-Day Money-Back Guarantee
        </p>
        <div
          onClick={() => copyToClipboard()}
          className="flex justify-center items-center gap-2 hover:cursor-pointer"
        >
          <FaShareFromSquare className="text-3xl text-glod-color" />
          <div className="text-white/90 font-semibold">Share</div>
        </div>
      </div>
    </div>
  );
};

export default BuyCourseCard;
