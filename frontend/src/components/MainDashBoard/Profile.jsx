import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pencil, Mail, Phone, Calendar, User2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs uppercase tracking-wider text-muted-foreground">
      {label}
    </p>
    <p className="mt-1 text-sm font-medium text-foreground">
      {value || <span className="text-muted-foreground">—</span>}
    </p>
  </div>
);

const SectionCard = ({ title, action, children }) => (
  <section className="rounded-2xl border border-border bg-card p-6">
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      {action}
    </div>
    {children}
  </section>
);

const Profile = () => {
  const { user } = useSelector((state) => state.profile);

  const EditBtn = (
    <Button asChild size="sm" variant="outline">
      <Link to="/dashboard/setting">
        Edit <Pencil className="h-3.5 w-3.5" />
      </Link>
    </Button>
  );

  return (
    <div className="container-page py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
            Account
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My <span className="gradient-text">profile</span>.
          </h1>
        </div>
        <Badge variant="glow" className="hidden sm:inline-flex gap-1.5">
          <Sparkles className="h-3 w-3" /> Verified
        </Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr,1.6fr]">
        <SectionCard title="Identity" action={EditBtn}>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="relative">
              <img
                src={user?.image}
                alt=""
                className="h-28 w-28 rounded-full object-cover ring-2 ring-primary/30 ring-offset-4 ring-offset-card"
              />
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <Badge variant="secondary">{user?.accountType}</Badge>
          </div>
        </SectionCard>

        <div className="flex flex-col gap-6">
          <SectionCard title="About" action={EditBtn}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {user?.about || "Write something about yourself."}
            </p>
          </SectionCard>

          <SectionCard title="Personal details" action={EditBtn}>
            <dl className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              <Field label="First name" value={user?.firstName} />
              <Field label="Last name" value={user?.lastName} />
              <Field label="Email" value={user?.email} />
              <Field
                label="Phone"
                value={user?.contactNumber}
              />
              <Field label="Gender" value={user?.gender || "—"} />
              <Field
                label="Date of birth"
                value={user?.dob ? user.dob.slice(0, 10) : "—"}
              />
            </dl>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
