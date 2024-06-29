import React from "react";
import { MdShoppingCartCheckout } from "react-icons/md";
import CourseCardd from "./CourseCardd";
import { useSelector } from "react-redux";

const YourCart = () => {
  const { cart, totalPrice, totalItem } = useSelector((state) => state.cart);

  return (
    <div className="flex w-[80%] h-[81vh] overflow-hidden hover:overflow-y-scroll profile pb-[10vh] pt-[5vh] mt-1">
      <div className="w-[90%] mx-auto flex flex-col gap-[5vh]">
        <h1 className="text-4xl text-white font-bold">
          Your <span className="text-glod-color">Collections</span>.
        </h1>
        <div className="flex justify-between items-start w-[100%] gap-16">
          <div className="grid grid-cols-2 gap-6 w-[70%] items-start justify-start">
            {cart.map((item, index) => (
              <CourseCardd
                key={index}

                image={item.thumbnail}
                title={item.courseName}
                price={item.price}
                id={item._id}
              />
            ))}
          </div>
          <div className="bg-black-bg text-white py-7 px-9 w-[30%] rounded-md flex flex-col gap-4 shadow-2xl border-1 border-black">
            <h1 className="text-3xl font-bold">My <span className="text-glod-color">cart</span>.</h1>
            <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-white/80">No. of courses</h2>
                    <h2 className="text-md">{totalItem}</h2>
                </div>
                <div  className="flex flex-col">
                    <h2  className="text-xl font-semibold text-white/80">Total price</h2>
                    <h2 className="text-md"><span className="text-glod-color text-lg font-bold">Rs. </span>{totalPrice}</h2>
                <hr className="my-2" />
                </div>
                <div  className="flex flex-col">
                    <h2  className="text-xl font-semibold text-white/80">Final price</h2>
                    <h2 className="text-md"><span className="text-glod-color text-lg font-bold">Rs. </span>{totalPrice}</h2>
                </div>
            </div>
            <button className="w-full bg-glod-color hover:bg-[#b99b55] text-[#2c2d30] font-semibold py-2 rounded flex justify-center items-center gap-1">Checkout <MdShoppingCartCheckout className="text-2xl"/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourCart;
