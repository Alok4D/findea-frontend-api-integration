"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "../_components/Footer";
import Newsletter from "../_components/Newsletter";
import Navbar from "../_components/Navbar";
import { Playfair_Display } from "next/font/google";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { logout, setProfileInfo, setProfile } from "@/lib/redux/slices/authSlice";
import {
  useGetMeQuery,
  useUpdateMeMutation,
  useUpdatePasswordMutation,
} from "@/lib/redux/api/userApi";

import LandingTopAnnouncementBar from "../_components/LandingTopAnnouncementBar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
});

const DashboardPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isHydrated, user } = useAppSelector(
    (state) => state.auth
  );

  // Check if we already have cached profile details in Redux state
  const hasProfileDetails = !!user?.isProfileFetched;

  // Queries and mutations - skip query if we already have the details cached
  const { data: profile, isLoading: isProfileLoading } = useGetMeQuery(
    undefined,
    {
      skip: !isAuthenticated || hasProfileDetails,
    }
  );
  const [updateMe, { isLoading: isUpdatingProfile }] = useUpdateMeMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useUpdatePasswordMutation();

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [genre, setGenre] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Password change states
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Client-side Route protection backup
  useEffect(() => {
    if (isHydrated && !isAuthenticated) {
      router.push("/login");
    }
  }, [isHydrated, isAuthenticated, router]);

  // Bind profile data - first try to use API profile response, then fall back to Redux cache
  useEffect(() => {
    if (!isHydrated) return;

    if (profile && !isInitialized) {
      setFirstName(profile.firstName || "");
      setLastName(profile.lastName || "");
      setEmail(profile.email || "");
      setPhone(profile.phone || "");
      setIsInitialized(true);

      // Save to Redux store cache to prevent future API calls
      dispatch(
        setProfile({
          id: profile.id,
          email: profile.email,
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          phone: profile.phone || "",
          role: profile.role || "CUSTOMER",
          name: `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || profile.email,
        })
      );
    } else if (user && hasProfileDetails && !isInitialized) {
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setIsInitialized(true);
    }
  }, [isHydrated, profile, user, hasProfileDetails, isInitialized, dispatch]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName || !lastName) {
      toast.error("Le prénom et le nom sont obligatoires.");
      return;
    }

    try {
      await updateMe({
        firstName,
        lastName,
        phone,
      }).unwrap();

      // Sync the new info to Redux cache
      dispatch(
        setProfileInfo({
          firstName,
          lastName,
          phone,
        })
      );
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Veuillez remplir tous les champs de mot de passe.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    try {
      await updatePassword({
        currentPassword,
        newPassword,
      }).unwrap();

      // Clear password fields on success
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error("Failed to update password:", err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  // If redirected, render nothing
  if (isHydrated && !isAuthenticated) {
    return null;
  }

  // Only show skeleton loader if hydration is incomplete or if data is loading and NOT cached in store
  const isDataLoading = !isHydrated || (isProfileLoading && !hasProfileDetails);

  return (
    <div
      className={`w-full bg-[#fdfaf5] min-h-screen font-serif text-black pb-0 ${playfair.className}`}
    >
      <LandingTopAnnouncementBar />
      <Navbar />

      {/* --- TRAPEZOID SECTION --- */}
      <section className="hidden md:flex relative w-full justify-center mb-2">
        <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
          <div
            className="bg-[#e2ddd3] md:w-[45%] h-28"
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 82% 100%, 18% 100%)",
            }}
          ></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-28 text-[#1a1a1a] px-4">
          <h1 className="text-2xl font-serif font-bold tracking-[0.15em] uppercase text-center leading-tight">
            Mon compte
          </h1>
        </div>
      </section>

      <section className="md:hidden relative w-full flex justify-center mb-2">
        <div className="absolute inset-0 flex justify-center items-start pointer-events-none">
          <div
            className="bg-[#e2ddd3] w-[85%] h-20"
            style={{
              clipPath: "polygon(10% 0%, 90% 0%, 82% 100%, 18% 100%)",
            }}
          ></div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-20 text-[#1a1a1a] px-4">
          <h1 className="text-lg font-serif font-bold tracking-[0.1em] uppercase text-center leading-tight">
            Mon compte
          </h1>
        </div>
      </section>

      {/* --- MOBILE HORIZONTAL MENU --- */}
      <div className="md:hidden w-full overflow-x-auto flex gap-3 px-4 py-8 bg-transparent custom-scrollbar">
        {["Personal Info", "My Orders", "My Registries", "Logout"].map(
          (tab) => (
            <button
              key={tab}
              onClick={() => {
                if (tab === "Logout") handleLogout();
              }}
              className={`flex-shrink-0 px-6 py-4 text-[13px] uppercase font-bold whitespace-nowrap ${
                tab === "Personal Info"
                  ? "bg-[#f2e6cf] border border-[#d3c7ad]"
                  : "bg-[#d1cbc1]"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-6xl mx-auto px-4 md:px-12 py-10 md:py-20 flex flex-col md:flex-row gap-12">
        {/* SIDEBAR */}
        <aside className="hidden md:block w-full md:w-1/4 space-y-3 font-serif md:sticky md:top-24 self-start">
          <button className="w-full bg-[#f2e6cf] text-black font-bold py-4 px-6 text-[13px] uppercase tracking-wider text-left border border-[#d3c7ad]">
            Personal Information
          </button>
          {["My Orders", "My Registries", "Logout"].map((item) => (
            <button
              key={item}
              onClick={() => {
                if (item === "Logout") handleLogout();
              }}
              className="w-full bg-[#e5e1da] text-black font-bold py-4 px-6 text-[13px] uppercase tracking-wider text-left border border-[#cfcbc4] hover:bg-[#e9dab9] transition-colors"
            >
              {item}
            </button>
          ))}
        </aside>

        {/* FORM SECTION */}
        <section className="w-full md:w-3/4">
          {isDataLoading ? (
            // SKELETON SHAPE LOADER PRESERVING LAYOUT
            <>
              <div className="mb-10 flex justify-center md:justify-start">
                <div className="w-24 h-24 rounded-full bg-[#aba8a1]/30 animate-pulse border border-gray-200"></div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="h-4 bg-[#aba8a1]/30 w-20 animate-pulse"></div>
                    <div className="w-full bg-[#aba8a1]/20 h-14 animate-pulse"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-[#aba8a1]/30 w-20 animate-pulse"></div>
                    <div className="w-full bg-[#aba8a1]/20 h-14 animate-pulse"></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-[#aba8a1]/30 w-20 animate-pulse"></div>
                  <div className="w-full bg-[#aba8a1]/20 h-14 animate-pulse"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-[#aba8a1]/30 w-24 animate-pulse"></div>
                  <div className="w-full bg-[#aba8a1]/20 h-14 animate-pulse"></div>
                </div>

                <div className="space-y-2">
                  <div className="h-4 bg-[#aba8a1]/30 w-16 animate-pulse"></div>
                  <div className="w-full bg-[#aba8a1]/20 h-14 animate-pulse"></div>
                </div>

                <div className="w-full md:w-[200px] bg-[#aba8a1]/30 h-16 animate-pulse mt-10"></div>
              </div>

              {/* Password Section Skeleton */}
              <h2 className="text-[24px] font-serif font-bold mb-8 mt-16 tracking-wider text-black">
                Changer le mot de passe
              </h2>

              <div className="space-y-6">
                {["Recent Password", "New Password", "Confirm Password"].map(
                  (label) => (
                    <div key={label} className="space-y-2">
                      <div className="h-4 bg-[#aba8a1]/30 w-32 animate-pulse"></div>
                      <div className="w-full bg-[#aba8a1]/20 h-14 animate-pulse"></div>
                    </div>
                  )
                )}
                <div className="w-full md:w-[200px] bg-[#aba8a1]/30 h-16 animate-pulse mt-10"></div>
              </div>
            </>
          ) : (
            // REAL DYNAMIC FORM SECTION
            <>
              <div className="mb-10 flex justify-center md:justify-start">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-500 uppercase">
                    {firstName ? firstName[0] : email?.[0] || "U"}
                  </span>
                </div>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[14px] font-serif font-bold text-black tracking-tight">
                      Prénom*
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full bg-[#e5e1da] border border-[#aba8a1] py-4 px-5 focus:outline-none text-[16px] font-serif font-bold text-black"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[14px] font-serif font-bold text-black tracking-tight">
                      Nom*
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full bg-[#e5e1da] border border-[#aba8a1] py-4 px-5 focus:outline-none text-[16px] font-serif font-bold text-black"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-serif font-bold text-black tracking-tight">
                    E-mail*
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full bg-[#e5e1da] border border-[#aba8a1] py-4 px-5 focus:outline-none text-[16px] font-serif font-bold text-gray-500 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-serif font-bold text-black tracking-tight">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#e5e1da] border border-[#aba8a1] py-4 px-5 focus:outline-none text-[16px] font-serif font-bold text-black"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[14px] font-serif font-bold text-black tracking-tight">
                    Genre
                  </label>
                  <input
                    type="text"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-[#e5e1da] border border-[#aba8a1] py-4 px-5 focus:outline-none text-[16px] font-serif font-bold text-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUpdatingProfile}
                  className="w-full md:w-auto bg-[#f2e6cf] hover:bg-[#e9dab9] disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-serif font-bold py-5 px-16 text-[15px] border border-[#d3c7ad] mt-10 shadow-sm transition-all"
                >
                  {isUpdatingProfile ? "Mise à jour en cours..." : "Mettre à jour"}
                </button>
              </form>

              {/* Change Password */}
              <h2 className="text-[24px] font-serif font-bold mb-8 mt-16 tracking-wider text-black">
                Changer le mot de passe
              </h2>

              <form onSubmit={handleChangePassword} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[14px] font-serif font-bold text-black tracking-tight">
                    Recent Password*
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#e5e1da] border border-[#aba8a1] py-4 px-5 focus:outline-none text-[16px] font-serif font-bold text-black"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-serif font-bold text-black tracking-tight">
                    New Password*
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#e5e1da] border border-[#aba8a1] py-4 px-5 focus:outline-none text-[16px] font-serif font-bold text-black"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[14px] font-serif font-bold text-black tracking-tight">
                    Confirm Password*
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-[#e5e1da] border border-[#aba8a1] py-4 px-5 focus:outline-none text-[16px] font-serif font-bold text-black"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUpdatingPassword}
                  className="w-full md:w-auto bg-[#f2e6cf] hover:bg-[#e9dab9] disabled:bg-gray-400 disabled:cursor-not-allowed text-black font-serif font-bold py-5 px-16 text-[15px] border border-[#d3c7ad] mt-10 shadow-sm transition-all"
                >
                  {isUpdatingPassword ? "Mise à jour en cours..." : "Mettre à jour"}
                </button>
              </form>
            </>
          )}
        </section>
      </main>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
          display: block;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          margin: 0 16px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cfc7b9;
          border-radius: 10px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #cfc7b9 #f1f1f1;
        }
      `}</style>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default DashboardPage;
