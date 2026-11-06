import { useState } from "react";
import {
  IconArrowRight,
  IconBolt,
  IconCheck,
  IconEye,
  IconEyeOff,
  IconLock,
  IconMail,
  IconShieldCheck,
} from "@tabler/icons-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { login, type LoginFormData } from "../services/auth";
import axios from "axios";
import { useAuth } from "../context/useAuth";

function SignInField({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  nodeId: string;
}) {
  return (
    <label className="block min-w-0 text-[#cac4d4]">
      <span className="mb-1.5 block px-1 text-xs font-medium leading-4 tracking-[0.12px]">
        {label}
      </span>
      <span className="group relative flex h-11 items-center rounded-xl border border-transparent bg-[#10131d] transition-[border-color,box-shadow] duration-140 focus-within:border-[#a78bfa80] focus-within:shadow-[0_0_0_3px_#a78bfa1c] max-[600px]:bg-[#181b26]">
        <span className="flex w-10 shrink-0 justify-center text-[#948e9d] [&>svg]:size-4 [&>svg]:stroke-[1.8]">
          {icon}
        </span>
        {children}
      </span>
    </label>
  );
}

export default function Login() {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    try {
      setMessage("Signing in...");

      const response = await login(data);
      localStorage.setItem("token", response.data.token);

      setIsAuthenticated(true);
      navigate("/home");

      console.log("Login response:", response);

      setMessage("Login successful!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Login error:", error.response?.data);

        setMessage(
          error.response?.data?.message || "Login failed. Please try again.",
        );
      } else {
        console.error(error);
        setMessage("Something went wrong.");
      }
    }
  }

  return (
    <main
      className="relative flex min-h-dvh flex-col items-center justify-[safe_center] overflow-x-hidden overflow-y-auto bg-[#10131d] px-5 py-8 text-[#e0e2f0] max-[600px]:justify-start max-[600px]:px-4.75 max-[600px]:py-6"
      data-node-id="1:122"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-1/2 -top-55 z-0 h-90 w-160 -translate-x-1/2 rounded-full bg-[#a78bfa12] blur-[90px] max-[600px]:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -bottom-42.5 left-[15%] z-0 size-85 rounded-full bg-[#5022b626] blur-[90px] max-[600px]:hidden"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed -right-30 top-[34%] z-0 size-100 rounded-full bg-[#a78bfa1a] blur-[90px] max-[600px]:hidden"
      />

      <div className="relative z-1 w-115 max-w-full" data-node-id="1:127">
        <section className="rounded-xl border border-[#ffffff08] bg-[#1c1f2a] p-8 shadow-[0_28px_100px_#05071130] max-[600px]:border-0 max-[600px]:bg-transparent max-[600px]:p-0 max-[600px]:shadow-none">
          <header
            className="flex flex-col items-center text-center"
            data-node-id="1:147"
          >
            <div
              className="grid size-14 place-items-center rounded-xl bg-[#272a34] text-[#cebdff] shadow-[0_0_20px_#a78bfa33,inset_0_1px_0_#ffffff0d] max-[600px]:size-16 max-[600px]:rounded-full max-[600px]:bg-[#5022b6] max-[600px]:shadow-[0_0_28px_#a78bfa4d]"
              data-node-id="1:160"
            >
              <IconBolt
                className="size-7 fill-current stroke-[1.5]"
                aria-hidden="true"
              />
            </div>
            <div
              className="mt-2 flex items-center gap-2 text-xl font-bold tracking-[1.2px] max-[600px]:text-2xl max-[600px]:tracking-[2.4px]"
              data-node-id="1:149"
            >
              <span>VYBE</span>
              <span className="rounded-full bg-[#32343f] px-1.75 py-0.5 text-[9px] font-medium tracking-[0.8px] text-[#cebdff]">
                ID 2.0
              </span>
            </div>
            <h1 className="mt-3 mb-1 text-xl font-semibold leading-7 tracking-[-0.5px] max-[600px]:mt-2 max-[600px]:text-2xl">
              Welcome back to VYBE
            </h1>
            <p className="m-0 max-w-[320px] text-[13px] leading-4.5 text-[#cac4d4]">
              Enter your credentials to access your feed, creators, and
              communities.
            </p>
          </header>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <SignInField
              label="Email or username"
              icon={<IconMail />}
              nodeId="1:166"
            >
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address",
                  },
                })}
                className="h-full w-full min-w-0 border-0 bg-transparent pr-3 text-[15px] tracking-[-0.08px] text-[#e0e2f0] outline-none placeholder:text-[#948e9d]"
                type="email"
                autoComplete="username"
                placeholder="you@domain.com"
                aria-label="Email"
              />
              {errors.email && (
                <p className="text-xs text-red-400">{errors.email.message}</p>
              )}
            </SignInField>

            <div className="flex flex-col gap-1.5" data-node-id="1:177">
              <div className="flex items-center justify-between gap-3 px-1">
                <label
                  className="text-xs font-medium leading-4 tracking-[0.12px] text-[#cac4d4]"
                  htmlFor="signin-password"
                >
                  Password
                </label>
                <button
                  className="shrink-0 border-0 bg-transparent p-0 text-[11px] font-medium leading-4 tracking-[0.12px] text-[#cebdff] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff]"
                  type="button"
                  onClick={() =>
                    setMessage("Password recovery isn't connected yet.")
                  }
                  data-node-id="1:181"
                >
                  Forgot password?
                </button>
              </div>
              <span className="group relative flex h-11 items-center rounded-xl border border-transparent bg-[#10131d] transition-[border-color,box-shadow] duration-140 focus-within:border-[#a78bfa80] focus-within:shadow-[0_0_0_3px_#a78bfa1c] max-[600px]:bg-[#181b26]">
                <span className="flex w-10 shrink-0 justify-center text-[#948e9d] [&>svg]:size-4 [&>svg]:stroke-[1.8]">
                  <IconLock />
                </span>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="h-full w-full min-w-0 border-0 bg-transparent pr-10 text-[15px] tracking-[-0.08px] text-[#e0e2f0] outline-none placeholder:text-[#948e9d]"
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                />
                <button
                  className="absolute right-1.75 grid size-8 place-items-center rounded-lg border-0 bg-transparent text-[#948e9d] transition-colors hover:bg-white/4 hover:text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] [&>svg]:size-4 [&>svg]:stroke-[1.8]"
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IconEyeOff /> : <IconEye />}
                </button>
              </span>
              {errors.password && (
                <p className="text-xs text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <label
              className="-mt-0.5 flex min-h-7 cursor-pointer items-center gap-3 text-[12px] font-medium leading-4.5 text-[#cac4d4]"
              data-node-id="1:191"
            >
              <input className="peer sr-only" type="checkbox" name="remember" />
              <span className="grid size-4 shrink-0 place-items-center rounded border border-[#5d586b] text-[#21005e] transition-[background,border-color] duration-150 peer-checked:border-[#a78bfa] peer-checked:bg-[#a78bfa] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#cebdff] [&>svg]:size-3 [&>svg]:stroke-3 [&>svg]:opacity-0 peer-checked:[&>svg]:opacity-100">
                <IconCheck />
              </span>
              Remember me for 30 days
            </label>

            <button
              className="mt-1 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-0 bg-[#a78bfa] text-sm font-semibold text-[#3c1989] shadow-[0_8px_18px_#a78bfa30] transition-[transform,background,box-shadow] duration-150 hover:-translate-y-px hover:bg-[#b49cff] hover:shadow-[0_10px_22px_#a78bfa40] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#cebdff] max-[600px]:rounded-full"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In to VYBE"}{" "}
              <IconArrowRight className="size-4 stroke-2" />
            </button>
            {message && (
              <p
                className="-mt-1 mb-0 text-center text-xs leading-4.5 text-[#cebdff]"
                role="status"
                aria-live="polite"
              >
                {message}
              </p>
            )}
          </form>

          <footer
            className="mt-7 border-t border-[#32343f] pt-5 text-center max-[600px]:mt-5 max-[600px]:border-0 max-[600px]:pt-0"
            data-node-id="1:205"
          >
            <p className="m-0 text-[13px] leading-4.5 text-[#cac4d4]">
              Don't have an account?{" "}
              <Link
                className="ml-1 font-medium text-[#cebdff] transition-colors hover:text-white focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff]"
                to="/signup"
              >
                Sign up
              </Link>
            </p>
          </footer>
        </section>

        <div className="mt-4 flex justify-center" data-node-id="1:128">
          <div
            className="inline-flex min-h-6.5 items-center justify-center gap-2 rounded-lg bg-[#181b26] px-3 py-1.25 text-center text-[10px] font-medium tracking-[0.16px] text-[#948e9d] max-[600px]:rounded-full max-[600px]:text-[10px]"
            data-node-id="1:134"
          >
            <IconShieldCheck
              className="size-3.25 shrink-0 text-[#cebdff]"
              aria-hidden="true"
            />
            <span>End-to-end encrypted session · Passkey supported</span>
          </div>
        </div>
      </div>
    </main>
  );
}
