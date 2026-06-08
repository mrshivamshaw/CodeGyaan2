import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import {
  ArrowRight,
  GraduationCap,
  Mic2,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";

import { sendOtp } from "../../servies/operations/authOpertaion";
import AuthLayout from "../common/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const SignInSite = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    accountType: "Student",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const required = ["firstName", "lastName", "email", "password", "confirmPassword"];
    if (required.some((k) => !form[k])) {
      toast.error("Please fill all fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(sendOtp(form.email, navigate, form));
    } finally {
      setSubmitting(false);
    }
  };

  const RoleBtn = ({ value, icon: Icon, label, sub }) => {
    const active = form.accountType === value;
    return (
      <button
        type="button"
        onClick={() => setForm((p) => ({ ...p, accountType: value }))}
        className={cn(
          "flex flex-1 items-center gap-3 rounded-lg border p-3 text-left transition-all",
          active
            ? "border-primary/50 bg-primary/10 shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]"
            : "border-border bg-secondary/40 hover:border-border hover:bg-secondary"
        )}
      >
        <div
          className={cn(
            "grid h-9 w-9 place-items-center rounded-md",
            active ? "bg-primary/20 text-primary" : "bg-background text-muted-foreground"
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className={cn("text-sm font-semibold", active ? "text-foreground" : "text-muted-foreground")}>
            {label}
          </p>
          <p className="text-[11px] text-muted-foreground">{sub}</p>
        </div>
      </button>
    );
  };

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account"
      subtitle="Two minutes to set up. Lifetime access to your cohort."
    >
      <form onSubmit={submit} className="flex flex-col gap-5">
        <div className="flex gap-2">
          <RoleBtn
            value="Student"
            icon={GraduationCap}
            label="Student"
            sub="Learn & get hired"
          />
          <RoleBtn value="Instructor" icon={Mic2} label="Instructor" sub="Teach & earn" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First name</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={change}
                placeholder="Ada"
                className="pl-9"
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              name="lastName"
              value={form.lastName}
              onChange={change}
              placeholder="Lovelace"
              required
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={change}
              placeholder="you@codegyaan.dev"
              className="pl-9"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={change}
                placeholder="••••••••"
                className="pl-9 pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm</Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirm ? "text" : "password"}
                value={form.confirmPassword}
                onChange={change}
                placeholder="••••••••"
                className="pl-9 pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>

        <Button size="lg" type="submit" disabled={submitting}>
          {submitting ? "Sending OTP…" : "Create account"}{" "}
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignInSite;
