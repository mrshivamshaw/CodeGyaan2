import React, { useState } from "react";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";
import Review from "../About/Review";
import { Mail, Phone, MapPin, Send, MessageSquare, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "support@codegyaan.com",
    href: "mailto:support@codegyaan.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8867917516",
    href: "tel:+918867917516",
  },
  {
    icon: MapPin,
    label: "HQ",
    value: "Bengaluru, IN",
    href: null,
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const change = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-50" />
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[460px] w-[760px] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

        <div className="container-page relative py-20">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr,1.1fr]">
            <div className="flex flex-col gap-6">
              <Badge variant="glow" className="gap-1.5">
                <Sparkles className="h-3 w-3" /> We reply within 24 hours
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Get in touch with{" "}
                <span className="gradient-text">our team</span>.
              </h1>
              <p className="max-w-md text-muted-foreground">
                Questions about cohorts, hiring partnerships, or instructor
                program — we&apos;re here.
              </p>

              <ul className="mt-2 grid gap-3 sm:grid-cols-1">
                {channels.map(({ icon: Icon, label, value, href }) => {
                  const Tag = href ? "a" : "div";
                  return (
                    <li key={label}>
                      <Tag
                        href={href || undefined}
                        className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:bg-card/80"
                      >
                        <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-wider text-muted-foreground">
                            {label}
                          </p>
                          <p className="truncate text-sm font-semibold text-foreground">
                            {value}
                          </p>
                        </div>
                      </Tag>
                    </li>
                  );
                })}
              </ul>
            </div>

            <form
              onSubmit={submit}
              className="rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">
                  Tell us about your project
                </h2>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Share a bit about you. We&apos;ll route to the right team.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={change}
                    placeholder="Ada Lovelace"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={change}
                    placeholder="you@codegyaan.dev"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={change}
                    placeholder="+91 ..."
                  />
                </div>
                <div className="grid gap-2 sm:col-span-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={change}
                    placeholder="Tell us a little more…"
                    rows={5}
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="mt-6 w-full">
                Send message <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>

      <Review />
      <Footer />
    </div>
  );
};

export default Contact;
