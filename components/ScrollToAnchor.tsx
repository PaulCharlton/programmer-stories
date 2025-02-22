"use client";

import { useEffect } from "react";

export default function ScrollToAnchor() {
  const handleScroll = () => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, []);

  return null;
}
