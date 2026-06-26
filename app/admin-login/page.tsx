"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { useLoginMutation } from "@/lib/redux/api/authApi";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/slices/authSlice";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const AdminLoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      dispatch(
        setCredentials({
          user: {
            id: res.user.id,
            email: res.user.email,
            name:
              `${res.user.firstName || ""} ${res.user.lastName || ""}`.trim() ||
              res.user.email,
          },
          token: res.accessToken,
          refreshToken: res.refreshToken,
        })
      );

      // Redirect to the dashboard
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      if (err?.data?.message) {
        setErrorMsg(err.data.message);
      } else {
        setErrorMsg("Invalid email or password.");
      }
    }
  };

  return (
    <div
      className={`${playfair.className} w-full bg-[#F5F3EE] min-h-screen relative overflow-x-hidden flex flex-col justify-center`}
    >
      {/* --- TRAPEZOID TITLE SECTION --- */}
      <section className="relative w-full flex justify-center mb-8 mt-4 lg:mt-0">
        <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
          <div
            className="bg-[#DEDAD2] w-[85%] md:w-[45%] h-20 md:h-28"
            style={{ clipPath: "polygon(10% 0%, 90% 0%, 82% 100%, 18% 100%)" }}
          ></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex items-center justify-center h-20 md:h-28">
          <div className="absolute left-1/2 -translate-x-1/2 text-[#1a1a1a] flex flex-col items-center gap-1">
            <Link
              href="/"
              className="text-xs md:hidden text-neutral-500 hover:text-[#1a1a1a]"
            >
              Home ❯
            </Link>
            <h1 className="text-md md:text-xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-center leading-tight">
              Admin Login
            </h1>
          </div>
          <div className="ml-auto hidden md:block">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm font-medium text-[#1a1a1a] hover:opacity-70"
            >
              <span className="text-[10px]">❮</span> Return to Home
            </Link>
          </div>
        </div>
      </section>

      {/* --- LOGIN FORM SECTION --- */}
      <main className="max-w-[480px] w-full mx-auto px-4 py-8 text-[#1A1A1A]">
        <div className="bg-[#DEDAD2] border border-[#CFCAC1] p-8 md:p-14 shadow-sm">
          <div className="flex justify-center mb-8">
            <h2 className="text-2xl font-bold tracking-widest uppercase text-center border-b-2 border-[#1A1A1A] pb-2 inline-block">
              Artisan & Co.
            </h2>
          </div>

          <h3 className="text-lg font-bold mb-6 tracking-wide text-center">
            Dashboard Access
          </h3>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 text-sm">
              {errorMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-[14px] italic mb-2 text-[#4A4A4A]">
                Email Address *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#EAE7DF] border border-[#CFCAC1] py-3 px-4 focus:outline-none focus:border-[#1A1A1A] transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-[14px] italic mb-2 text-[#4A4A4A]">
                Password *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#EAE7DF] border border-[#CFCAC1] py-3 px-4 focus:outline-none focus:border-[#1A1A1A] transition-colors"
                required
              />
            </div>
            <div className="flex items-center justify-between text-[12px] py-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#1A1A1A] w-3 h-3"
                />
                <span>Remember me</span>
              </label>
              <Link
                href="#"
                className="italic cursor-pointer hover:underline text-[#4A4A4A]"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1A1A1A] text-[#F5F3EE] hover:bg-[#333333] disabled:bg-gray-400 disabled:cursor-not-allowed py-4 text-[13px] font-bold uppercase tracking-[0.2em] transition-colors mt-4"
            >
              {isLoading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default AdminLoginPage;
