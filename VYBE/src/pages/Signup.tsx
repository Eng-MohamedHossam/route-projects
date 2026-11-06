import { useState } from "react";
import {
  IconArrowRight,
  IconCheck,
  IconChevronDown,
  IconEye,
  IconEyeOff,
  IconGenderAndrogyne,
  IconLock,
  IconMail,
  IconShieldLock,
  IconUser,
} from "@tabler/icons-react";
import type { SignupFormData } from "../types/auth";
import { useForm, useWatch } from "react-hook-form";
import { signup } from "../services/auth";
import axios from "axios";
import { Link } from "react-router";

function FormField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0 text-[#cac4d4]">
      <span className="mb-1.5 block text-xs font-medium leading-4 tracking-[0.12px] max-[600px]:mx-1 max-[600px]:mb-1">
        {label}
      </span>
      <span className="group relative flex h-11 items-center rounded-xl border border-transparent bg-[#181b26] transition-[border-color,box-shadow] duration-140 focus-within:border-[#a78bfa80] focus-within:shadow-[0_0_0_3px_#a78bfa1c] max-[600px]:h-11.5 max-[600px]:bg-[#1c1f2a]">
        <span className="flex w-10 shrink-0 justify-center text-[#948e9d] [&>svg]:size-4 [&>svg]:stroke-[1.8]">
          {icon}
        </span>
        {children}
      </span>
    </label>
  );
}

export default function Signup() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();

  const password = useWatch({ control, name: "password" }) || "";
  const confirmPassword = useWatch({ control, name: "confirmPassword" }) || "";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  async function onSubmit(data: SignupFormData) {
    try {
      setIsSuccess(false);
      setMessage("Creating your account...");

      const response = await signup({
        name: data.name,
        username: data.username,
        email: data.email,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        password: data.password,
        rePassword: data.confirmPassword,
      });

      console.log("Signup response:", response);

      setIsSuccess(true);
      setMessage("Account created successfully!");
    } catch (error) {
      setIsSuccess(false);

      if (axios.isAxiosError(error)) {
        console.log("API error response:", error.response?.data);
        setMessage(error.response?.data?.message || "Signup failed.");
      } else {
        console.error(error);
        setMessage("Something went wrong.");
      }
    }
  }

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-[safe_center] overflow-x-hidden overflow-y-auto bg-[#10131d] px-5 py-8 pb-6 text-[#e0e2f0] max-[600px]:justify-start max-[600px]:px-4.75 max-[600px]:pt-0">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 -top-55 z-0 h-90 w-140 -translate-x-1/2 rounded-full bg-[#a78bfa12] blur-[90px] max-[600px]:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-42.5 left-1/2 z-0 h-75 w-115 translate-x-[-10%] rounded-full bg-[#5022b633] blur-[90px] max-[600px]:absolute max-[600px]:-right-25 max-[600px]:top-75 max-[600px]:bottom-auto max-[600px]:left-auto max-[600px]:h-95 max-[600px]:w-57.5 max-[600px]:translate-x-0 max-[600px]:bg-[#5022b633] max-[600px]:blur-[80px]"
      />
      <section className="relative z-1 w-full max-w-140 rounded-xl border border-[#ffffff08] bg-[#1c1f2a] p-10 shadow-[0_28px_100px_#05071130] max-[600px]:rounded-none max-[600px]:border-0 max-[600px]:bg-transparent max-[600px]:p-0 max-[600px]:shadow-none">
        <header className="flex h-42.5 flex-col items-center text-center max-[600px]:h-43.5">
          <div
            aria-hidden="true"
            className="grid size-14 place-items-center rounded-xl bg-[#272a34] text-[25px] font-bold text-[#a78bfa] shadow-[0_0_20px_#a78bfa20,inset_0_1px_0_#ffffff0d] max-[600px]:rounded-2xl max-[600px]:bg-[#5022b6] max-[600px]:shadow-[0_0_24px_#a78bfa30]"
          >
            <span>V</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-xl font-bold tracking-[1.2px] max-[600px]:text-2xl max-[600px]:tracking-[2.4px]">
            <span>VYBE</span>
            <span className="rounded-full bg-[#32343f] px-1.75 py-0.5 text-[9px] font-medium tracking-[0.8px] text-[#cebdff] max-[600px]:hidden">
              ID 2.0
            </span>
          </div>
          <h1
            className="mt-3 mb-1 text-xl font-semibold leading-7 tracking-[-0.5px] max-[600px]:mt-1 max-[600px]:mb-0.5 max-[600px]:text-xl max-[600px]:tracking-[-0.3px]"
            data-node-id="1:16"
          >
            Create your VYBE account
          </h1>
          <p className="m-0 text-[13px] leading-4.5 text-[#cac4d4] max-[600px]:max-w-67.5">
            Join creators, engineers, and digital pioneers worldwide.
          </p>
        </header>

        <div className="mt-6 hidden h-13 items-center gap-3 rounded-xl border border-[#ffffff08] bg-[#1c1f2a] px-3 max-[600px]:flex">
          <div aria-hidden="true" className="flex shrink-0 basis-17">
            <span className="-mr-2 grid size-7 place-items-center rounded-full border-2 border-[#1c1f2a] bg-linear-to-br from-[#51406e] to-[#272a34] text-[9px] font-semibold text-[#e0e2f0]">
              M
            </span>
            <span className="-mr-2 grid size-7 place-items-center rounded-full border-2 border-[#1c1f2a] bg-linear-to-br from-[#8553a8] to-[#30243d] text-[9px] font-semibold text-[#e0e2f0]">
              A
            </span>
            <span className="-mr-2 grid size-7 place-items-center rounded-full border-2 border-[#1c1f2a] bg-linear-to-br from-[#536b85] to-[#252e39] text-[9px] font-semibold text-[#e0e2f0]">
              J
            </span>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1.25 text-[11px] leading-3.5 text-[#cebdff]">
            <span>14,280+ creators joined this week</span>
            <span className="block h-1 overflow-hidden rounded-full bg-[#272a34]">
              <i className="block h-full w-[78%] rounded-full bg-[#a78bfa]" />
            </span>
          </div>
        </div>

        <form
          className="mt-8 flex flex-col gap-4 max-[600px]:mt-0 max-[600px]:gap-3.5"
          onSubmit={handleSubmit(onSubmit)}
          data-node-id="1:26"
        >
          <FormField label="Full name" icon={<IconUser />}>
            <input
              {...register("name", {
                required: "Full name is required",
              })}
              className="h-full w-full min-w-0 border-0 bg-transparent pr-10 text-sm tracking-[-0.08px] text-[#e0e2f0] outline-none placeholder:text-[#e0e2f0] placeholder:opacity-100 max-[600px]:text-[15px]"
              autoComplete="name"
              placeholder="Mohamed Hossam"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
            )}
          </FormField>

          <FormField label="User name" icon={<IconUser />}>
            <input
              {...register("username", {
                required: "Username is required",
              })}
              className="h-full w-full min-w-0 border-0 bg-transparent pr-10 text-sm tracking-[-0.08px] text-[#e0e2f0] outline-none placeholder:text-[#e0e2f0] placeholder:opacity-100 max-[600px]:text-[15px]"
              autoComplete="username"
              placeholder="M-Hossam"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-400">
                {errors.username.message}
              </p>
            )}
          </FormField>

          <FormField label="Email address" icon={<IconMail />}>
            <input
              {...register("email", {
                required: "Email is required",
              })}
              className="h-full w-full min-w-0 border-0 bg-transparent pr-10 text-sm tracking-[-0.08px] text-[#e0e2f0] outline-none placeholder:text-[#e0e2f0] placeholder:opacity-100 max-[600px]:text-[15px]"
              type="email"
              autoComplete="email"
              placeholder="Mohamed@gmail.com"
            />
            <IconCheck
              className="pointer-events-none absolute right-3.25 size-4 text-[#cebdff]"
              aria-hidden="true"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </FormField>

          <FormField label="Gender" icon={<IconGenderAndrogyne />}>
            <select
              {...register("gender", {
                required: "Please select your gender",
              })}
              className="h-full w-full min-w-0 appearance-none border-0 bg-transparent pr-10 text-sm tracking-[-0.08px] text-[#e0e2f0] outline-none max-[600px]:text-[15px]"
              defaultValue=""
            >
              <option value="" disabled className="bg-[#181b26] text-[#948e9d]">
                Select gender
              </option>
              <option value="female" className="bg-[#181b26] text-[#e0e2f0]">
                Female
              </option>
              <option value="male" className="bg-[#181b26] text-[#e0e2f0]">
                Male
              </option>
            </select>
            <IconChevronDown
              className="pointer-events-none absolute right-3.25 size-4 b text-[#948e9d]"
              aria-hidden="true"
            />
            {errors.gender && (
              <p className="mt-1 text-xs text-red-400">
                {errors.gender.message}
              </p>
            )}
          </FormField>

          <FormField label="Date of Birth" icon={<IconUser />}>
            <input
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
              className="h-full w-full min-w-0 border-0 bg-transparent px-2 text-sm text-[#e0e2f0] outline-none"
              type="date"
            />
            {errors.dateOfBirth && (
              <p className="mt-1 text-xs text-red-400">
                {errors.dateOfBirth.message}
              </p>
            )}
          </FormField>

          <FormField label="Password" icon={<IconLock />}>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
              className="h-full w-full min-w-0 border-0 bg-transparent pr-10 text-sm tracking-[-0.08px] text-[#e0e2f0] outline-none placeholder:text-[#e0e2f0] placeholder:opacity-100 max-[600px]:text-[15px]"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}

            <button
              className="absolute right-2.5 grid size-7 place-items-center rounded-lg border-0 bg-transparent text-[#948e9d] hover:bg-white/4 hover:text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#cebdff] [&>svg]:size-4 [&>svg]:stroke-[1.8]"
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IconEyeOff /> : <IconEye />}
            </button>
          </FormField>
          <FormField label="Confirm Password" icon={<IconLock />}>
            <input
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords don't match",
              })}
              className="h-full w-full min-w-0 border-0 bg-transparent pr-10 text-sm tracking-[-0.08px] text-[#e0e2f0] outline-none placeholder:text-[#e0e2f0] placeholder:opacity-100 max-[600px]:text-[15px]"
              type={showConfirmation ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-400">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              className="absolute right-2.5 grid size-7 place-items-center rounded-lg border-0 bg-transparent text-[#948e9d] hover:bg-white/4 hover:text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#cebdff] [&>svg]:size-4 [&>svg]:stroke-[1.8]"
              type="button"
              aria-label={
                showConfirmation ? "Hide confirmation" : "Show confirmation"
              }
              onClick={() => setShowConfirmation(!showConfirmation)}
            >
              {showConfirmation ? <IconEyeOff /> : <IconEye />}
            </button>
            {confirmPassword && (
              <span
                className={`absolute left-0 top-[calc(100%+8px)] flex items-center gap-1.25 whitespace-nowrap text-[11px] font-medium leading-3.5 tracking-[0.22px] ${passwordsMatch ? "text-[#cebdff]" : "text-rose-300"}`}
              >
                {passwordsMatch ? <IconCheck className="size-3" /> : null}
                {passwordsMatch ? "Passwords match" : "Passwords don't match"}
              </span>
            )}
          </FormField>
          <label
            className="mt-3 flex min-h-10.25 cursor-pointer items-start gap-3 text-[11px] leading-3.5 text-[#cac4d4] max-[600px]:mt-0"
            data-node-id="1:82"
          >
            <input className="peer sr-only" type="checkbox" required />
            <span className="mt-px grid size-4 shrink-0 place-items-center rounded border border-[#5d586b] text-[#0b0e18] transition-[background,border-color] duration-150 peer-checked:border-[#a78bfa] peer-checked:bg-[#a78bfa] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#cebdff] [&>svg]:size-3 [&>svg]:stroke-3 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
              <IconCheck />
            </span>
            <span>
              I agree to VYBE{" "}
              <span className="text-[#cebdff]">Terms of Service</span> and{" "}
              <span className="text-[#cebdff]">Privacy Policy</span>, and
              consent to essential cookies.
            </span>
          </label>
          <button
            className="mt-0 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-0 bg-[#a78bfa] text-base font-semibold text-[#21005e] shadow-[0_8px_18px_#a78bfa30] transition-[transform,background,box-shadow] duration-150 hover:-translate-y-px hover:bg-[#b49cff] hover:shadow-[0_10px_22px_#a78bfa40] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#cebdff] max-[600px]:-mt-0.5 max-[600px]:h-12 max-[600px]:rounded-full max-[600px]:text-sm max-[600px]:tracking-[0.35px]"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
            {!isSubmitting && <IconArrowRight className="size-4 stroke-2" />}
          </button>
          {message && (
            <p
              className={`-mt-1 mb-0 text-xs leading-4.5 ${
                isSuccess ? "text-green-400" : "text-red-400"
              }`}
              role="status"
            >
              {message}
            </p>
          )}
        </form>

        <footer
          className="mt-8 text-center max-[600px]:mt-4"
          data-node-id="1:96"
        >
          <div className="h-px bg-[#32343f] max-[600px]:hidden" />
          <p className="my-2.5 text-[13px] leading-4.5 text-[#cac4d4] max-[600px]:mt-0 max-[600px]:mb-3">
            Already have an account?{" "}
            <Link to="/signin">
              <button
                className="cursor-pointer border-0 bg-transparent p-0 font-semibold text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#cebdff]"
                type="button"
              >
                Sign in
              </button>
            </Link>
          </p>
          <div className="inline-flex min-h-6.5 items-center justify-center gap-2 rounded-lg bg-[#0b0e1899] px-2.5 py-1.25 text-[10px] font-medium tracking-[0.16px] text-[#948e9d] max-[600px]:flex max-[600px]:min-h-11 max-[600px]:justify-start max-[600px]:rounded-xl max-[600px]:bg-[#181b26] max-[600px]:px-3 max-[600px]:py-2 max-[600px]:text-left max-[600px]:text-[11px] max-[600px]:leading-3.5">
            <IconShieldLock className="size-3.25 shrink-0 text-[#cebdff]" />
            <span>
              We never sell your data or train models on private posts.
            </span>
          </div>
        </footer>
      </section>
      <div
        className="relative z-1 mt-5 flex w-full max-w-103.5 justify-between text-[9px] font-medium tracking-[0.15px] text-[#948e9d] max-[600px]:hidden"
        data-node-id="1:106"
      >
        <span className="text-[#cac4d4]">
          <i className="mr-1.5 inline-block size-1.75 rounded-full bg-[#34d399]" />
          Global Cluster Online
        </span>
        <b className="font-normal text-[#6f697a]">•</b>
        <span>End-to-End Encrypted</span>
        <b className="font-normal text-[#6f697a]">•</b>
        <span>v3.4.12-rc</span>
      </div>
    </main>
  );
}
