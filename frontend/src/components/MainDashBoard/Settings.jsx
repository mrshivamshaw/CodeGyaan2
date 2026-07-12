import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Upload, ImagePlus } from "lucide-react";

import {
  updatePic,
  updateProfile,
} from "../../servies/operations/updateProfile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Settings = () => {
  const [image, setImage] = useState();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "Male",
    contactNumber: "",
    about: "",
  });
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const uploadPic = () => {
    if (!image) return toast.error("Select an image first.");
    dispatch(updatePic(image));
  };

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(form));
  };

  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary">
          Account
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Edit <span className="gradient-text">profile</span>.
        </h1>
      </div>

      <div className="flex flex-col gap-6">
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-5 text-lg font-semibold text-foreground">
            Profile photo
          </h2>
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="relative">
              <img
                src={image ? URL.createObjectURL(image) : user?.image}
                alt=""
                className="h-24 w-24 rounded-full object-cover ring-2 ring-primary/30 ring-offset-4 ring-offset-card"
              />
              <label
                htmlFor="avatar"
                className="absolute -bottom-1 -right-1 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-primary text-primary-foreground shadow-lg"
              >
                <ImagePlus className="h-4 w-4" />
              </label>
              <input
                id="avatar"
                type="file"
                accept=".jpeg,.jpg,.png"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold text-foreground">
                Change your avatar
              </p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG. Max 2MB.
              </p>
              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="avatar" className="cursor-pointer">
                    Select file
                  </label>
                </Button>
                <Button size="sm" onClick={uploadPic} disabled={!image}>
                  Upload <Upload className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        <form onSubmit={onSubmit}>
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-5 text-lg font-semibold text-foreground">
              Profile information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder={user?.firstName}
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder={user?.lastName}
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="dob">Date of birth</Label>
                <Input id="dob" name="dob" type="date" onChange={onChange} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="gender">Gender</Label>
                <select
                  id="gender"
                  name="gender"
                  onChange={onChange}
                  defaultValue={form.gender}
                  className="h-10 w-full rounded-md border border-border bg-secondary/50 px-3 text-sm text-foreground focus:border-primary/50 focus:bg-secondary/80 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactNumber">Contact number</Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  type="tel"
                  placeholder="Enter contact number"
                  onChange={onChange}
                />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="about">About</Label>
                <Textarea
                  id="about"
                  name="about"
                  placeholder="Tell us a bit about yourself…"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <Button variant="ghost" type="button">
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};

export default Settings;
