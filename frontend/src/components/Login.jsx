import React from "react";
import cat2 from "../assets/cat2.webm";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthContext";

import { toast } from "react-toastify";

export default function Login({ onToggle }) {
  const { login } = useAuth();

  const navigate = useNavigate();

  const formSchema = z.object({
    uname: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(3, { message: "Name must have atleast 3 characters" })
      .max(250, { message: "Maximum characters exceeded" }),

    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(8, { message: "Minimum 8 characters required" })
      .max(25, { message: "Maximum 25 characters only" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  async function onsubmit(data) {
    console.log("DATA BEFORE SEND:", data);

    try {
      const res = await api.post("/login", data);

      console.log(res.data);

      // cookie already stored automatically
      login(res.data.user);

      toast.success("Logged in successfully");

      navigate("/app/addjob");
    } catch (err) {
      console.error(err);

      toast.error(
        "Login failed: " +
          (err.response?.data?.message || "Server error")
      );
    }
  }

  return (
    <div className="md:w-160 w-auto md:p-6 h-90 md:h-120 border border-rose2 rounded-xl flex flex-row md:gap-5 items-center bg-periwinkle2 ring-2 ring-periwinkle shadow-xl shadow-dusty">
      <form
        className="flex flex-col items-center justify-center p-2 md:p-5 gap-3 md:gap-10"
        onSubmit={handleSubmit(onsubmit)}
      >
        <div className="flex gap-3">
          <label
            htmlFor="username"
            className="w-20 md:w-24 text-rose-950 md:text-xl font-medium"
          >
            Username
          </label>

          <input
            type="text"
            {...register("uname")}
            className="border border-periwinkle md:py-1 md:px-3"
          />

          {errors.uname && (
            <p className="text-red-500 text-sm">
              {errors.uname.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <label
            htmlFor="password"
            className="w-20 md:w-24 text-rose-950 font-medium md:text-xl"
          >
            Password
          </label>

          <input
            type="password"
            className="border border-periwinkle md:py-1 md:px-3"
            {...register("password")}
          />

          {errors.password && (
            <p className="text-red-500 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="border rounded-l bg-rose hover:bg-amber-900 hover:shadow-xs hover:ring-accent1 md:hover:scale-125 md:font-bold border-blackcream text-major2 shadow-xs shadow-rose py-1 px-2 cursor-pointer"
          >
            LogIn
          </button>
        </div>

        <div className="flex">
          <p className="text-blackcream font-medium">
            Don't have an account?
            <span
              className="cursor-pointer font-bold text-lavender2 hover:shadow-xs md:hover:scale-125 ml-1"
              onClick={onToggle}
            >
              SignIn
            </span>
          </p>
        </div>
      </form>

      <div>
        <video
          src={cat2}
          type="video/webm"
          autoPlay
          loop
          muted
          className="w-30 h-30 md:w-90 md:h-90"
        ></video>
      </div>
    </div>
  );
}