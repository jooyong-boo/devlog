import useThemeStore from "@/store/useThemeStore";
import React from "react";
import { useStore } from "zustand";
import DarkModeSvg from "@/assets/svg/dark_mode.svg";
import LightModeSvg from "@/assets/svg/light_mode.svg";

function Darkmode() {
  const { theme, toggleTheme } = useStore(useThemeStore);

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" && <DarkModeSvg className="w-6 h-6 fill-slate-50" />}
      {!theme && <LightModeSvg className="w-6 h-6 fill-slate-900" />}
    </button>
  );
}

export default Darkmode;
