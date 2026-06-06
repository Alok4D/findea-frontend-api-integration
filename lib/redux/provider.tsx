"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { makeStore, AppStore } from "./store";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </Provider>
  );
}
