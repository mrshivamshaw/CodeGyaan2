import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingBag, ArrowRight, Receipt } from "lucide-react";

import CourseCardd from "./CourseCardd";
import { order } from "../../servies/operations/paymentOperation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const YourCart = () => {
  const { cart, totalPrice, totalItem } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkout = async () => {
    if (!cart.length) return toast.error("Cart is empty.");
    const tId = toast.loading("Processing checkout…");
    const ids = cart.map((c) => c._id);
    await order(ids, JSON.parse(localStorage.getItem("user")), navigate, dispatch);
    toast.dismiss(tId);
  };

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Cart
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Your <span className="gradient-text">cart</span>.
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {totalItem} {totalItem === 1 ? "course" : "courses"} ready to enroll.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr,360px]">
        <div className="flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card/40 p-16 text-center">
              <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-semibold text-foreground">
                Your cart is empty
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Browse the catalog to add courses.
              </p>
              <Button asChild className="mt-6">
                <Link to="/">
                  Browse courses <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {cart.map((item, i) => (
                <CourseCardd
                  key={i}
                  image={item.thumbnail}
                  title={item.courseName}
                  price={item.price}
                  id={item._id}
                />
              ))}
            </div>
          )}
        </div>

        <aside className="sticky top-24 rounded-2xl border border-border bg-card p-6">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Summary</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Courses</span>
              <span className="font-medium text-foreground">{totalItem}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">₹ {totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span className="font-medium text-foreground">₹ 0</span>
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-2xl font-bold tracking-tight gradient-text">
              ₹ {totalPrice}
            </span>
          </div>
          <Button onClick={checkout} className="mt-6 w-full" size="lg">
            Checkout <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            30-day money-back guarantee
          </p>
        </aside>
      </div>
    </div>
  );
};

export default YourCart;
