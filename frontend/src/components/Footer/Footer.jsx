import React from "react";
import { Link } from "react-router-dom";
import { Code2, Mail, Phone, ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Product",
    links: [
      { label: "Courses", to: "/" },
      { label: "Job Portal", to: "/job" },
      { label: "CodeGyaan Lab", to: "/" },
      { label: "Hall of Fame", to: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", to: "/aboutus" },
      { label: "Contact", to: "/contact-us" },
      { label: "Become an affiliate", to: "/" },
      { label: "Blog", to: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", to: "/" },
      { label: "Job Assurance", to: "/" },
      { label: "Privacy policy", to: "/" },
      { label: "Terms", to: "/" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="relative mt-24 border-t border-border bg-background">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container-page py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-amber-400 text-primary-foreground">
                <Code2 className="h-5 w-5" />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                Code<span className="gradient-text">Gyaan</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Practical, project-led courses and a job portal — built to take
              you from learner to hired.
            </p>

            <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground">
              <a
                href="mailto:support@codegyaan.com"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="h-4 w-4" /> support@codegyaan.com
              </a>
              <a
                href="tel:+919142574541"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="h-4 w-4" /> +91 9142574541
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2">
              <Button asChild variant="outline" size="icon" aria-label="LinkedIn">
                <a href="#"><FaLinkedinIn className="h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="icon" aria-label="Twitter">
                <a href="#"><FaTwitter className="h-4 w-4" /></a>
              </Button>
              <Button asChild variant="outline" size="icon" aria-label="GitHub">
                <a href="#"><FaGithub className="h-4 w-4" /></a>
              </Button>
            </div>
          </div>

          {sections.map((s) => (
            <div key={s.title}>
              <h4 className="text-sm font-semibold tracking-tight text-foreground">
                {s.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {s.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3 w-3 opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CodeGyaan. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with care for builders.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
