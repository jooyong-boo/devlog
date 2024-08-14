"use client";

import LogoBlack from "@/assets/img/logo_black.png";
import LogoWhite from "@/assets/img/logo_white.png";
import DarkModeSvg from "@/assets/svg/dark_mode.svg";
import LightModeSvg from "@/assets/svg/light_mode.svg";
import useThemeStore from "@/store/useThemeStore";
import Link from "next/link";
import { useStore } from "zustand";

const HeaderMenu = [
  { title: "Home", href: "/" },
  { title: "Posts", href: "/posts" },
  { title: "Tags", href: "/tags" },
  { title: "About", href: "/about" },
];

function Header() {
  const { theme, toggleTheme } = useStore(useThemeStore);

  return (
    <div className="w-full flex items-center justify-between min-h-14 px-4 py-4">
      <Link href="/" className="text-slate-900 dark:text-slate-50">
        {/* <Image
          src={theme === "dark" ? LogoWhite : LogoBlack}
          alt="logo"
          width={100}
          height={100}
        /> */}
        개발블로그
      </Link>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {HeaderMenu.map((menu) => (
            <Link
              key={menu.title}
              href={menu.href}
              className="text-gray-800 dark:text-gray-200"
            >
              {menu.title}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme}>
            {theme === "dark" && (
              <DarkModeSvg className="w-6 h-6 fill-slate-50" />
            )}
            {!theme && <LightModeSvg className="w-6 h-6 fill-slate-900" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
