"use client";

import LogoBlack from "@/assets/img/logo_black.png";
import LogoWhite from "@/assets/img/logo_white.png";
import DarkModeSvg from "@/assets/svg/dark_mode.svg";
import LightModeSvg from "@/assets/svg/light_mode.svg";
import useThemeStore from "@/store/useThemeStore";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";

function Header() {
  const { theme, toggleTheme } = useStore(useThemeStore);

  return (
    <div className="w-full flex items-center justify-between min-h-14 px-4 py-4">
      <Link href="/">
        <Image src={LogoWhite} alt="logo" width={100} height={100} />
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Link href="/posts">Posts</Link>
          <Link href="/tags">Tags</Link>
          <Link href="/about">About</Link>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme}>
            {theme === "dark" && <DarkModeSvg className="w-6 h-6" />}
            {!theme && <LightModeSvg className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
