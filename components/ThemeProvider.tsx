"use client";

import { ReactNode, useEffect } from "react";

export default function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Default to dark. Light only when explicitly saved.
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  return <>{children}</>;
}
