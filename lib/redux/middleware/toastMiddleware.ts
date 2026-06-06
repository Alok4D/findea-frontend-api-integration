import { Middleware } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const toastMiddleware: Middleware = () => (next) => (action: any) => {
  // Check if this action is from our RTK Query api
  if (action?.type?.startsWith("api/")) {
    const endpointName = action?.meta?.arg?.endpointName;
    const requestStatus = action?.meta?.requestStatus;

    if (requestStatus === "fulfilled") {
      // Toast for successful mutations
      if (endpointName === "login") {
        toast.success("Connexion réussie !");
      } else if (endpointName === "register") {
        toast.success("Inscription réussie !");
      } else if (endpointName === "forgotPassword") {
        toast.success("Code OTP envoyé sur votre adresse e-mail.");
      } else if (endpointName === "resetPasswordOtp") {
        toast.success("Votre mot de passe a été réinitialisé avec succès !");
      } else if (endpointName === "updateMe") {
        toast.success("Profil mis à jour avec succès !");
      } else if (endpointName === "updatePassword") {
        toast.success("Mot de passe changé avec succès !");
      }
    } else if (requestStatus === "rejected") {
      // Toast for errors (both queries and mutations)
      const errorPayload = action?.payload as any;
      const message =
        errorPayload?.data?.message ||
        errorPayload?.message ||
        "Une erreur est survenue. Veuillez réessayer.";

      // Prevent double toast for refresh token failures or fetch cancel errors
      if (endpointName !== "refresh" && errorPayload?.status !== "FETCH_ERROR") {
        // Skip generic 'Unauthorized' toasts to prevent duplicates when local components handle auth
        if (message !== "Unauthorized" && errorPayload?.status !== 401) {
          toast.error(message);
        }
      }
    }
  }

  return next(action);
};
