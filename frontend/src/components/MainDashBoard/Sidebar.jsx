import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User2,
  GraduationCap,
  ShoppingCart,
  LayoutDashboard,
  BookOpen,
  Plus,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";

import { logout } from "../../servies/operations/authOpertaion";
import { setLoading } from "../../slices/UIslice";
import { getCart } from "../../servies/operations/cartOperation";
import { cn } from "@/lib/utils";

const Item = ({ to, icon: Icon, label, end, onClick, badge }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-secondary text-foreground shadow-[0_0_0_1px_hsl(var(--primary)/0.15)]"
          : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
      )
    }
  >
    <Icon className="h-4 w-4" />
    <span className="flex-1 truncate">{label}</span>
    {badge ? (
      <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
        {badge}
      </span>
    ) : null}
  </NavLink>
);

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountType, user } = useSelector((state) => state.profile);
  const { totalItem } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const cartHandler = async () => {
    dispatch(setLoading(true));
    await getCart(dispatch, setLoading, toast);
    dispatch(setLoading(false));
    navigate("/dashboard/your-cart");
  };

  return (
    <aside className="hidden h-[calc(100vh-4rem)] w-[260px] shrink-0 sticky top-16 border-r border-border bg-card/40 backdrop-blur lg:block">
      <div className="flex h-full flex-col">
        <div className="border-b border-border p-4">
          <div className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3">
            <img
              src={user?.image}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {accountType}
              </p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-1 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Account
          </p>
          <Item to="/dashboard/profile" icon={User2} label="Profile" />

          {accountType === "Student" && (
            <>
              <p className="mt-4 px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Learning
              </p>
              <Item
                to="/dashboard/enrolled-courses"
                icon={GraduationCap}
                label="Enrolled courses"
              />
              <Item
                to="/dashboard/your-cart"
                icon={ShoppingCart}
                label="Your cart"
                onClick={cartHandler}
                badge={totalItem || null}
              />
            </>
          )}

          {accountType === "Instructor" && (
            <>
              <p className="mt-4 px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Teaching
              </p>
              <Item
                to="/dashboard/dashboard"
                icon={LayoutDashboard}
                label="Dashboard"
              />
              <Item
                to="/dashboard/my-courses"
                icon={BookOpen}
                label="My courses"
              />
              <Item
                to="/dashboard/add-courses"
                icon={Plus}
                label="Add course"
              />
            </>
          )}

          <p className="mt-4 px-3 pb-2 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Preferences
          </p>
          <Item to="/dashboard/setting" icon={SettingsIcon} label="Settings" />
        </nav>

        <div className="border-t border-border p-3">
          <button
            onClick={logoutHandler}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" /> Log out
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
