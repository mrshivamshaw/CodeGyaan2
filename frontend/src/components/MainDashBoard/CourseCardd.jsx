import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

import { removeFromCart } from "../../servies/operations/cartOperation";
import { setLoading } from "../../slices/UIslice";

const CourseCardd = ({ image, title, price, id }) => {
  const dispatch = useDispatch();
  const remove = () => {
    removeFromCart(dispatch, setLoading, id, toast);
  };

  return (
    <article className="group flex w-full overflow-hidden rounded-xl border border-border bg-card card-hover sm:w-[320px]">
      <Link
        to={`/course/${title}/${id}`}
        className="flex w-full items-center gap-3 p-3"
      >
        <img
          src={image}
          alt=""
          className="h-20 w-28 shrink-0 rounded-md object-cover"
        />
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </p>
          <p className="mt-1 text-sm font-bold gradient-text">₹ {price}</p>
        </div>
      </Link>
      <button
        onClick={remove}
        title="Remove"
        className="grid w-10 shrink-0 place-items-center border-l border-border text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </article>
  );
};

export default CourseCardd;
