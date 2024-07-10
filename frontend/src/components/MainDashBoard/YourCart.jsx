import React from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import CourseCardd from "./CourseCardd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { order } from "../../servies/operations/paymentOperation";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../../slices/cartSlice";

const YourCart = () => {
  const { cart, totalPrice, totalItem } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const checkOutHandler = async () => {
    const toastId = toast.loading("Please wait...");

    let coursesId = [];

    for (let i = 0; i < cart.length; i++) {
      coursesId.push(cart[i]._id);
    }

    if (coursesId.length > 0) {
      await order(
        coursesId,
        JSON.parse(localStorage.getItem("user")),
        navigate
      );
      dispatch(resetCart());
      localStorage.setItem("cart", JSON.stringify([]));
      localStorage.setItem("totalPrice", 0);
      localStorage.setItem("totalItem", 0);
      toast.success("Order Placed");
    } else {
      toast.error("Cart is empty");
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="flex w-[95%] md:w-[95%] lg:w-[80%] xl:w-[80%] mx-auto h-[81vh] overflow-hidden hover:overflow-y-scroll profile pb-[10vh] pt-[5vh] mt-1">
      <div className="w-[100%] md:w-[100%] lg:w-[90%] xl:w-[90%] mx-auto flex flex-col gap-[5vh]">
        <h1 className="text-4xl text-white font-bold">
          Your <span className="text-glod-color">Collections</span>.
        </h1>
        <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row justify-between items-start w-[100%] gap-10">
          <div className="flex flex-wrap gap-6 w-[100%] items-start justify-start">
            {cart.length ? (
              cart.map((item, index) => (
                <CourseCardd
                  key={index}
                  image={item.thumbnail}
                  title={item.courseName}
                  price={item.price}
                  id={item._id}
                />
              ))
            ) : (
              <h2 className="text-3xl text-white/80 font-normal w-full  mt-10">
                {" "}
                Your cart is empty
              </h2>
            )}
          </div>
          <div className="bg-black-bg text-white py-7 px-9 w-[100%] md:w-[100%] lg:w-[30%] xl:w-[40%] mb-10 rounded-md flex flex-col gap-4 shadow-2xl border-1 border-black">
            <h1 className="text-3xl font-bold">
              My <span className="text-glod-color">cart</span>.
            </h1>
            <div className="flex flex-col gap-1">
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-white/80">
                  No. of courses
                </h2>
                <h2 className="text-md">{totalItem}</h2>
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-white/80">
                  Total price
                </h2>
                <h2 className="text-md">
                  <span className="text-glod-color text-lg font-bold">
                    Rs.{" "}
                  </span>
                  {totalPrice}
                </h2>
                <hr className="my-2" />
              </div>
              <div className="flex flex-col">
                <h2 className="text-xl font-semibold text-white/80">
                  Final price
                </h2>
                <h2 className="text-md">
                  <span className="text-glod-color text-lg font-bold">
                    Rs.{" "}
                  </span>
                  {totalPrice}
                </h2>
              </div>
            </div>
            <button
              onClick={checkOutHandler}
              className="w-full bg-glod-color hover:bg-[#b99b55] text-[#2c2d30] font-semibold py-2 rounded flex justify-center items-center gap-1"
            >
              Checkout <MdShoppingCartCheckout className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCart;
