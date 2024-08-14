import { menus } from "@/layouts/Header/constants/menu";
import Link from "next/link";
import React, { useState } from "react";

function MobileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="sm:hidden">
      <button onClick={handleMenuOpen}>
        <svg
          className="w-6 h-6 fill-current text-gray-800 dark:text-gray-200"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
        </svg>
      </button>
      {isMenuOpen && (
        <div className="absolute top-14 left-0 w-full bg-white dark:bg-slate-900 shadow-lg">
          <div className="flex flex-col items-center gap-4 py-4">
            {menus.map((menu) => (
              <Link
                key={menu.title}
                href={menu.href}
                className="text-gray-800 dark:text-gray-200"
              >
                {menu.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
