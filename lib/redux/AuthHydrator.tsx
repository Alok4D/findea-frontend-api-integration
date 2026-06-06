"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { hydrateAuth } from "./slices/authSlice";
import { hydrateCart } from "./slices/cartSlice";
import { hydrateWishlist } from "./slices/wishlistSlice";

export default function AuthHydrator() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
    dispatch(hydrateCart());
    dispatch(hydrateWishlist());
  }, [dispatch]);

  return null;
}
