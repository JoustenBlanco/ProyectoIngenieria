"use client";
import React, { useEffect, useState } from "react";

const DarkModeSwitch: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  // On mount, sync with localStorage and set the class correctly
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    let isDark: boolean;
    if (savedMode === null) {
      // Default to dark mode if no preference is set
      isDark = true;
      localStorage.setItem("darkMode", "true");
    } else {
      isDark = savedMode === "true";
    }
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // When darkMode changes (after initial mount), update class and localStorage
  useEffect(() => {
    if (darkMode === null) return; // avoid running on first render before mount
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => prev === null ? true : !prev);
  };

  // Avoid SSR hydration mismatch by not rendering until mounted
  if (darkMode === null) return null;

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        className="sr-only peer"
        type="checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <div
        className="w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden \
        before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center \
        before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full \
        before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 \
        peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 \
        peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] \
        after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] \
        after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all \
        after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
      ></div>
    </label>
  );
};

export default DarkModeSwitch;
