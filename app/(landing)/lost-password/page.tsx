"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Footer from "../_components/Footer";
import Newsletter from "../_components/Newsletter";
import Navbar from "../_components/Navbar";
import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";

import { Playfair_Display } from "next/font/google";
import {
  useForgotPasswordMutation,
  useResetPasswordOtpMutation,
} from "@/lib/redux/api/authApi";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const LostPasswordPage = () => {
  const router = useRouter();

  // RTK Query hooks
  const [forgotPassword, { isLoading: isSendingOtp }] =
    useForgotPasswordMutation();
  const [resetPasswordOtp, { isLoading: isResettingPassword }] =
    useResetPasswordOtpMutation();

  // State
  const [step, setStep] = useState<1 | 2>(1); // 1 = Request OTP, 2 = Verify OTP and Reset
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!email) {
      setErrorMsg("Veuillez saisir votre adresse e-mail.");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      setSuccessMsg("Un code OTP a été envoyé à votre adresse e-mail.");
      setStep(2);
    } catch (err: any) {
      console.error("Forgot password error:", err);
      if (err?.data?.message) {
        setErrorMsg(err.data.message);
      } else {
        setErrorMsg("Impossible d'envoyer le code OTP. Veuillez réessayer.");
      }
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!otp || !newPassword) {
      setErrorMsg("Veuillez remplir tous les champs.");
      return;
    }

    try {
      await resetPasswordOtp({
        email,
        otp,
        newPassword,
      }).unwrap();

      setSuccessMsg(
        "Votre mot de passe a été réinitialisé avec succès. Redirection vers la page de connexion..."
      );
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (err: any) {
      console.error("Reset password OTP error:", err);
      if (err?.data?.message) {
        setErrorMsg(err.data.message);
      } else {
        setErrorMsg(
          "Code OTP incorrect ou expiré. Veuillez vérifier et réessayer."
        );
      }
    }
  };

  return (
    <div
      className={`${playfair.className} w-full bg-[#fdfaf5] min-h-screen relative overflow-x-hidden`}
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
              className="text-xs md:hidden text-neutral-500 hover:text-[#1a1a1a] transition-colors"
            >
              Accueil ❯
            </Link>
            <h1 className="text-md md:text-xl font-bold tracking-[0.1em] md:tracking-[0.15em] uppercase text-center leading-tight">
              {step === 1 ? "Mot de passe oublié" : "Vérification OTP"}
            </h1>
          </div>

          <div className="ml-auto hidden md:block">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-1.5 text-sm font-medium text-[#1a1a1a] hover:opacity-70 transition-all"
            >
              <span className="text-[10px]">❮</span> Retour à la page précédente
            </button>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center">
        <div className="max-w-2xl text-center mb-10 md:mb-12">
          <p className="text-[#666] md:text-[#85827B] text-[14px] md:text-[16px] leading-[1.8] font-medium">
            {step === 1
              ? "Mot de passe oublié ? Veuillez saisir votre adresse e-mail. Vous recevrez par e-mail un code OTP pour créer un nouveau mot de passe."
              : `Un code OTP a été envoyé à l'adresse email : ${email}. Veuillez saisir le code reçu et configurer votre nouveau mot de passe.`}
          </p>
        </div>

        {errorMsg && (
          <div className="w-full max-w-[420px] bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-6 text-sm">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="w-full max-w-[420px] bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-6 text-sm">
            {successMsg}
          </div>
        )}

        {step === 1 ? (
          <form
            onSubmit={handleRequestOtp}
            className="w-full max-w-[420px] space-y-6 md:space-y-7"
          >
            <div className="space-y-3">
              <label className="block text-[15px] md:text-[13px] font-bold text-black tracking-wide">
                Adresse e-mail *
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#e5e1da] border border-[#cfcbc4] py-4 px-5 focus:outline-none focus:border-gray-500 transition-all text-gray-800"
                required
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSendingOtp}
                className="w-full bg-[#f2e6cf] hover:bg-[#e9dab9] disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-bold py-4 text-[16px] md:text-[17px] tracking-[0.08em] transition-all border border-[#d3c7ad] shadow-sm"
              >
                {isSendingOtp ? "Envoi en cours..." : "Envoyer le code OTP"}
              </button>
            </div>
            <div className="text-center pt-2">
              <Link
                href="/login"
                className="text-sm italic text-gray-600 hover:text-black hover:underline"
              >
                Retour à la page de connexion
              </Link>
            </div>
          </form>
        ) : (
          <form
            onSubmit={handleResetPassword}
            className="w-full max-w-[420px] space-y-6 md:space-y-7"
          >
            <div className="space-y-3">
              <label className="block text-[15px] md:text-[13px] font-bold text-black tracking-wide">
                Code OTP *
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-[#e5e1da] border border-[#cfcbc4] py-4 px-5 focus:outline-none focus:border-gray-500 transition-all text-gray-800 font-mono tracking-widest text-center"
                placeholder="000000"
                required
              />
            </div>
            <div className="space-y-3">
              <label className="block text-[15px] md:text-[13px] font-bold text-black tracking-wide">
                Nouveau mot de passe *
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-[#e5e1da] border border-[#cfcbc4] py-4 px-5 focus:outline-none focus:border-gray-500 transition-all text-gray-800"
                required
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                disabled={isResettingPassword}
                className="w-full bg-[#f2e6cf] hover:bg-[#e9dab9] disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-bold py-4 text-[16px] md:text-[17px] tracking-[0.08em] transition-all border border-[#d3c7ad] shadow-sm"
              >
                {isResettingPassword}
                {isResettingPassword
                  ? "Mise à jour..."
                  : "Confirmer le nouveau mot de passe"}
              </button>
            </div>
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-sm italic text-gray-600 hover:text-black hover:underline"
              >
                Renvoyer le code OTP
              </button>
            </div>
          </form>
        )}
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default LostPasswordPage;
