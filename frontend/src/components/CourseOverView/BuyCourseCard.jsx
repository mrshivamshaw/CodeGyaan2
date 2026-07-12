import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Share2,
  ShieldCheck,
  ArrowUpRight,
  Award,
  Infinity as InfinityIcon,
  Video,
  Smartphone,
} from "lucide-react";

import { setLoading } from "../../slices/UIslice";
import { addToCartt } from "../../servies/operations/cartOperation";
import { order } from "../../servies/operations/paymentOperation";
import { Button } from "@/components/ui/button";

const perks = [
  { icon: Video, label: "Live + recorded sessions" },
  { icon: InfinityIcon, label: "Lifetime access" },
  { icon: Award, label: "Completion certificate" },
  { icon: Smartphone, label: "Mobile + desktop" },
];

const BuyCourseCard = ({ thumbnail, price, id, sectionId, subSectionId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);

  const user =
    typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "null")
      : null;
  const enrolled = !!user?.enrolledCourses?.includes(id);
  const inCart = cart?.some((c) => c._id === id);

  const addCart = () => {
    if (inCart) {
      navigate("/dashboard/your-cart");
      return;
    }
    addToCartt(dispatch, setLoading, id, toast);
  };

  const buy = async () => {
    if (!user || !localStorage.getItem("token")) {
      navigate("/login");
      return;
    }
    if (enrolled) {
      navigate(
        `/view-course/${id}/section/${sectionId}/sub-section/${subSectionId}`
      );
      return;
    }
    const tId = toast.loading("Starting checkout…");
    await order([id], user, navigate, dispatch);
    toast.dismiss(tId);
  };

  const copy = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Couldn't copy"));
  };

  return (
    <aside className="w-full lg:sticky lg:top-24 lg:w-[380px]">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/30">
        <div className="relative aspect-video overflow-hidden border-b border-border bg-secondary">
          {thumbnail && (
            <img src={thumbnail} alt="" className="h-full w-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        </div>

        <div className="flex flex-col gap-5 p-6">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              One-time payment
            </p>
            <p className="mt-1 flex items-baseline gap-2 text-4xl font-bold tracking-tight text-foreground">
              ₹{price}
              {price && (
                <span className="text-sm font-medium text-muted-foreground line-through">
                  ₹{Math.round(price * 1.25)}
                </span>
              )}
            </p>
          </div>

          <Button size="lg" onClick={buy} className="w-full">
            {enrolled ? (
              <>
                Go to course <ArrowUpRight className="h-4 w-4" />
              </>
            ) : (
              "Buy now"
            )}
          </Button>

          {!enrolled && (
            <Button variant="outline" size="lg" onClick={addCart} className="w-full">
              {inCart ? "View cart" : "Add to cart"}
            </Button>
          )}

          <div className="flex items-center gap-2 rounded-md border border-border bg-background/40 p-3 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            30-day money-back guarantee
          </div>

          <ul className="space-y-2.5">
            {perks.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2.5 text-sm text-muted-foreground"
              >
                <Icon className="h-4 w-4 text-primary" /> {label}
              </li>
            ))}
          </ul>

          <button
            onClick={copy}
            className="inline-flex items-center justify-center gap-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Share2 className="h-3.5 w-3.5" /> Share this course
          </button>
        </div>
      </div>
    </aside>
  );
};

export default BuyCourseCard;
