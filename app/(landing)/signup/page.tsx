"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "../_components/Footer";
import Newsletter from "../_components/Newsletter";
import Navbar from "../_components/Navbar";
import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";

import { Playfair_Display } from "next/font/google";
import { useRegisterMutation } from "@/lib/redux/api/authApi";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setCredentials } from "@/lib/redux/slices/authSlice";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const SignupPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!firstName || !lastName || !email || !phone || !password) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const res = await register({
        email,
        password,
        firstName,
        lastName,
        phone,
      }).unwrap();

      dispatch(
        setCredentials({
          user: {
            id: res.user.id,
            email: res.user.email,
            name:
              `${res.user.firstName || firstName} ${
                res.user.lastName || lastName
              }`.trim() || res.user.email,
          },
          token: res.accessToken,
          refreshToken: res.refreshToken,
        })
      );

      router.push("/account");
    } catch (err: any) {
      console.error("Registration error:", err);
      if (err?.data?.message) {
        setErrorMsg(err.data.message);
      } else {
        setErrorMsg("Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  return (
    <div
      className={`${playfair.className} w-full bg-[#f3f0ea] min-h-screen relative overflow-x-hidden`}
    >
      <LandingTopAnnouncementBar />
      <Navbar />

      {/* --- TRAPEZOID TITLE SECTION --- */}
      <section className="relative w-full flex justify-center mb-2">
        <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
          <div
            className="bg-[#e2ddd3] w-[85%] md:w-[45%] h-20 md:h-28"
            style={{ clipPath: "polygon(10% 0%, 90% 0%, 82% 100%, 18% 100%)" }}
          ></div>
        </div>
        <div className="relative z-10 w-full max-w-7xl px-6 md:px-12 flex items-center justify-center h-20 md:h-28">
          <div className="absolute left-1/2 -translate-x-1/2 text-[#1a1a1a] flex flex-col items-center gap-1">
            <Link
              href="/"
              className="text-xs md:hidden text-neutral-500 hover:text-[#1a1a1a]"
            >
              Accueil ❯
            </Link>
            <h1 className="text-md md:text-xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-center leading-tight">
              S'inscrire
            </h1>
          </div>
          <div className="ml-auto hidden md:block">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-1.5 text-sm font-medium text-[#1a1a1a] hover:opacity-70"
            >
              <span className="text-[10px]">❮</span> Retour à la page précédente
            </button>
          </div>
        </div>
      </section>

      {/* --- REGISTRATION FORM SECTION --- */}
      <main className="max-w-[480px] mx-auto px-4 py-8 md:py-16 text-black">
        <div className="bg-[#e1ddd4] border border-[#ccc7bc] p-8 md:p-14">
          <h2 className="text-xl md:text-3xl font-bold mb-8 tracking-widest uppercase text-center">
            S'inscrire
          </h2>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 text-sm">
              {errorMsg}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[14px] italic mb-2 text-gray-800">
                  Prénom *
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-[#ccc7bc] border border-[#b8b3a9] py-3 px-4 focus:outline-none focus:border-gray-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[14px] italic mb-2 text-gray-800">
                  Nom *
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-[#ccc7bc] border border-[#b8b3a9] py-3 px-4 focus:outline-none focus:border-gray-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-[14px] italic mb-2 text-gray-800">
                Adresse e-mail *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#ccc7bc] border border-[#b8b3a9] py-3 px-4 focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-[14px] italic mb-2 text-gray-800">
                Téléphone *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#ccc7bc] border border-[#b8b3a9] py-3 px-4 focus:outline-none focus:border-gray-500"
                required
              />
            </div>
            <div>
              <label className="block text-[14px] italic mb-2 text-gray-800">
                Mot de passe *
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#ccc7bc] border border-[#b8b3a9] py-3 px-4 focus:outline-none focus:border-gray-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#f2e6cf] hover:bg-[#e9dab9] disabled:bg-gray-400 disabled:cursor-not-allowed py-4 text-[13px] font-bold uppercase tracking-[0.2em] border border-[#d3c7ad] transition-colors"
            >
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </form>

          <div className="relative my-8 flex items-center">
            <div className="flex-grow border-t border-[#b8b3a9]"></div>
            <span className="flex-shrink mx-3 text-[10px] italic text-gray-500 uppercase tracking-tight">
              Déjà un compte ?
            </span>
            <div className="flex-grow border-t border-[#b8b3a9]"></div>
          </div>

          <Link
            href="/login"
            className="block text-center w-full bg-[#f2e6cf] hover:bg-[#e9dab9] py-4 text-[13px] font-bold uppercase tracking-[0.2em] border border-[#d3c7ad] transition-colors"
          >
            Se connecter
          </Link>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default SignupPage;
