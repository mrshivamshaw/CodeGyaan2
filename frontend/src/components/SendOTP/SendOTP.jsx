import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { ShieldCheck, ArrowRight } from "lucide-react";

import { sendOtp, signup } from "../../servies/operations/authOpertaion";
import AuthLayout from "../common/AuthLayout";
import { Button } from "@/components/ui/button";

const OTP_LEN = 6;

const SendOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = useSelector((state) => state.auth.signUpData);
  const [otp, setOtp] = useState(Array(OTP_LEN).fill(""));
  const [submitting, setSubmitting] = useState(false);
  const refs = useRef([]);

  const onChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(-1);
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < OTP_LEN - 1) refs.current[i + 1]?.focus();
  };

  const onKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowLeft" && i > 0) refs.current[i - 1]?.focus();
    if (e.key === "ArrowRight" && i < OTP_LEN - 1) refs.current[i + 1]?.focus();
  };

  const onPaste = (e) => {
    const v = (e.clipboardData.getData("text") || "").replace(/\D/g, "").slice(0, OTP_LEN);
    if (!v) return;
    e.preventDefault();
    const next = Array(OTP_LEN).fill("");
    v.split("").forEach((c, i) => (next[i] = c));
    setOtp(next);
    refs.current[Math.min(v.length, OTP_LEN - 1)]?.focus();
  };

  const submit = async (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== OTP_LEN) {
      toast.error("Enter the full 6-digit code.");
      return;
    }
    setSubmitting(true);
    try {
      await dispatch(signup({ ...data, otp: code }, navigate));
    } finally {
      setSubmitting(false);
    }
  };

  const resend = () => {
    setOtp(Array(OTP_LEN).fill(""));
    refs.current[0]?.focus();
    dispatch(sendOtp(data.email, navigate, data));
    toast.success("New code sent.");
  };

  return (
    <AuthLayout
      eyebrow="Verify"
      title="Check your inbox"
      subtitle={`We sent a 6-digit code to ${data?.email || "your email"}.`}
    >
      <form onSubmit={submit} className="flex flex-col gap-6">
        <div className="flex items-center gap-3 rounded-xl border border-border bg-secondary/40 p-3">
          <div className="grid h-9 w-9 place-items-center rounded-md bg-primary/15 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <p className="text-xs text-muted-foreground">
            Codes expire after 10 minutes. Don&apos;t share with anyone.
          </p>
        </div>

        <div className="grid grid-cols-6 gap-2" onPaste={onPaste}>
          {otp.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              className="h-14 rounded-lg border border-border bg-secondary/50 text-center text-2xl font-bold text-foreground caret-primary focus:border-primary/50 focus:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 transition"
            />
          ))}
        </div>

        <Button size="lg" type="submit" disabled={submitting}>
          {submitting ? "Verifying…" : "Verify and continue"}{" "}
          <ArrowRight className="h-4 w-4" />
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          Didn&apos;t get a code?{" "}
          <button
            type="button"
            onClick={resend}
            className="font-medium text-primary hover:underline"
          >
            Resend
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SendOTP;
