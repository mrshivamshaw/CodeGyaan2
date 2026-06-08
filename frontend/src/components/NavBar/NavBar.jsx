import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Search,
  ShoppingCart,
  Menu,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  User2,
  Settings as SettingsIcon,
  GraduationCap,
  Plus,
  Code2,
  Sparkles,
} from "lucide-react";

import { setToken } from "../../slices/authSlice";
import { logout } from "../../servies/operations/authOpertaion";
import { setLoading } from "../../slices/UIslice";
import { getCart } from "../../servies/operations/cartOperation";
import { fetchCourseCategories } from "../../servies/operations/courseOpertaions";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/job", label: "Jobs" },
  { to: "/aboutus", label: "About" },
  { to: "/contact-us", label: "Contact" },
];

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((s) => s.auth);
  const { user } = useSelector((s) => s.profile);
  const { totalItem } = useSelector((s) => s.cart);

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (token) dispatch(setToken(token));
  }, [token, dispatch]);

  useEffect(() => {
    const cached = sessionStorage.getItem("category");
    if (cached) {
      setCategories(JSON.parse(cached));
    } else {
      fetchCourseCategories().then((c) => c && setCategories(c));
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  const goCart = async () => {
    dispatch(setLoading(true));
    await getCart(dispatch, setLoading, toast);
    dispatch(setLoading(false));
    navigate("/dashboard/your-cart");
  };

  const onSearch = () => {
    if (!searchInput.trim()) {
      toast.error("Type something to search.");
      return;
    }
    try {
      const products = JSON.parse(sessionStorage.getItem("category")) || [];
      const q = searchInput.toLowerCase();
      const match = products.find((p) => p.name.toLowerCase().includes(q));
      if (!match) return toast.error("No course matches that.");
      const all = JSON.parse(sessionStorage.getItem("getAllCourses")) || [];
      const cat = all.find((c) => c.category === match._id)?.category ?? match._id;
      navigate(`/courses/category/${cat}`);
      setSearchInput("");
    } catch (e) {
      toast.error("Search failed.");
    }
  };

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-background/40 backdrop-blur-md"
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-amber-400 text-primary-foreground shadow-[0_8px_24px_-8px_hsl(var(--primary)/0.6)]">
            <Code2 className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Code<span className="gradient-text">Gyaan</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Courses <ChevronDown className="h-3.5 w-3.5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[14rem]">
              <DropdownMenuLabel>Categories</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {categories.length === 0 && (
                <DropdownMenuItem disabled>Loading…</DropdownMenuItem>
              )}
              {categories.map((c) => (
                <DropdownMenuItem
                  key={c._id}
                  onClick={() => navigate(`/courses/category/${c._id}`)}
                >
                  {c.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        <div className="hidden lg:flex flex-1 max-w-md mx-2">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyUp={(e) => e.key === "Enter" && onSearch()}
              placeholder="Search courses, categories…"
              className="h-10 w-full rounded-lg border border-border bg-secondary/60 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {token && user?.accountType === "Student" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={goCart}
              className="relative hidden sm:inline-flex"
              aria-label="Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItem > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {totalItem}
                </span>
              )}
            </Button>
          )}

          {!token && (
            <div className="hidden lg:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signin">
                  Get started <Sparkles className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}

          {token && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="hidden lg:flex items-center gap-2 rounded-full border border-border bg-secondary/60 p-1 pr-2 transition hover:bg-secondary">
                  <img
                    src={user?.image}
                    alt=""
                    className="h-7 w-7 rounded-full object-cover"
                  />
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[16rem]">
                <DropdownMenuLabel>
                  <div className="flex items-center gap-3 py-1">
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
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/dashboard/profile")}>
                  <User2 className="h-4 w-4" /> Profile
                </DropdownMenuItem>
                {user?.accountType === "Student" && (
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/enrolled-courses")}
                  >
                    <GraduationCap className="h-4 w-4" /> Enrolled courses
                  </DropdownMenuItem>
                )}
                {user?.accountType === "Instructor" && (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/dashboard")}
                    >
                      <LayoutDashboard className="h-4 w-4" /> Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/my-courses")}
                    >
                      <GraduationCap className="h-4 w-4" /> My courses
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate("/dashboard/add-courses")}
                    >
                      <Plus className="h-4 w-4" /> Add course
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem onClick={() => navigate("/dashboard/setting")}>
                  <SettingsIcon className="h-4 w-4" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logoutHandler}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="h-4 w-4" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88%] sm:max-w-sm p-0">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-2 border-b border-border p-5">
                  <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-amber-400 text-primary-foreground">
                    <Code2 className="h-4 w-4" />
                  </div>
                  <span className="text-base font-semibold">
                    Code<span className="gradient-text">Gyaan</span>
                  </span>
                </div>

                <div className="border-b border-border p-5">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      onKeyUp={(e) => e.key === "Enter" && onSearch()}
                      placeholder="Search courses…"
                      className="h-10 w-full rounded-lg border border-border bg-secondary/60 pl-9 pr-3 text-sm placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {token && (
                  <div className="flex items-center gap-3 border-b border-border p-5">
                    <img
                      src={user?.image}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <Badge variant="secondary" className="mt-1">
                        {user?.accountType}
                      </Badge>
                    </div>
                  </div>
                )}

                <nav className="flex-1 overflow-y-auto p-3">
                  <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Browse
                  </p>
                  {navLinks.map((l) => (
                    <SheetClose asChild key={l.to}>
                      <NavLink
                        to={l.to}
                        end={l.to === "/"}
                        className={({ isActive }) =>
                          cn(
                            "block rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-secondary text-foreground"
                              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                          )
                        }
                      >
                        {l.label}
                      </NavLink>
                    </SheetClose>
                  ))}

                  {categories.length > 0 && (
                    <>
                      <Separator className="my-3" />
                      <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Categories
                      </p>
                      {categories.map((c) => (
                        <SheetClose asChild key={c._id}>
                          <button
                            onClick={() =>
                              navigate(`/courses/category/${c._id}`)
                            }
                            className="block w-full rounded-md px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
                          >
                            {c.name}
                          </button>
                        </SheetClose>
                      ))}
                    </>
                  )}

                  {token && (
                    <>
                      <Separator className="my-3" />
                      <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Account
                      </p>
                      <SheetClose asChild>
                        <NavLink
                          to="/dashboard/profile"
                          className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                        >
                          <User2 className="h-4 w-4" /> Profile
                        </NavLink>
                      </SheetClose>
                      {user?.accountType === "Student" && (
                        <>
                          <SheetClose asChild>
                            <NavLink
                              to="/dashboard/enrolled-courses"
                              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                            >
                              <GraduationCap className="h-4 w-4" /> Enrolled
                            </NavLink>
                          </SheetClose>
                          <SheetClose asChild>
                            <NavLink
                              to="/dashboard/your-cart"
                              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                            >
                              <ShoppingCart className="h-4 w-4" /> Cart{" "}
                              {totalItem > 0 && (
                                <Badge variant="default" className="ml-auto">
                                  {totalItem}
                                </Badge>
                              )}
                            </NavLink>
                          </SheetClose>
                        </>
                      )}
                      {user?.accountType === "Instructor" && (
                        <>
                          <SheetClose asChild>
                            <NavLink
                              to="/dashboard/dashboard"
                              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                            >
                              <LayoutDashboard className="h-4 w-4" /> Dashboard
                            </NavLink>
                          </SheetClose>
                          <SheetClose asChild>
                            <NavLink
                              to="/dashboard/my-courses"
                              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                            >
                              <GraduationCap className="h-4 w-4" /> My courses
                            </NavLink>
                          </SheetClose>
                          <SheetClose asChild>
                            <NavLink
                              to="/dashboard/add-courses"
                              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                            >
                              <Plus className="h-4 w-4" /> Add course
                            </NavLink>
                          </SheetClose>
                        </>
                      )}
                      <SheetClose asChild>
                        <NavLink
                          to="/dashboard/setting"
                          className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                        >
                          <SettingsIcon className="h-4 w-4" /> Settings
                        </NavLink>
                      </SheetClose>
                    </>
                  )}
                </nav>

                <div className="border-t border-border p-4">
                  {token ? (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        setMobileOpen(false);
                        logoutHandler();
                      }}
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <SheetClose asChild>
                        <Button asChild variant="outline" className="flex-1">
                          <Link to="/login">Log in</Link>
                        </Button>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button asChild className="flex-1">
                          <Link to="/signin">Sign up</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    <div aria-hidden className="h-16" />
    </>
  );
};

export default NavBar;
