"use client";
import { useEffect } from "react";

export default function ScrollThumbEffect() {
  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;
    const enableThumb = () => {
      document.body.classList.add("scrolling");
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.body.classList.remove("scrolling");
      }, 700);
    };

    const handleKeydown = (e: KeyboardEvent) => {
      if (
        ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(e.key)
      ) {
        enableThumb();
      }
    };

    window.addEventListener("scroll", enableThumb, { passive: true });
    window.addEventListener("wheel", enableThumb, { passive: true });
    window.addEventListener("touchmove", enableThumb, { passive: true });
    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("scroll", enableThumb);
      window.removeEventListener("wheel", enableThumb);
      window.removeEventListener("touchmove", enableThumb);
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  return null;
}