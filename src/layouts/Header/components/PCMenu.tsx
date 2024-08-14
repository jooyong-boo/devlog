import { menus } from "@/layouts/Header/constants/menu";
import Link from "next/link";

function PCMenu() {
  return (
    <div className="hidden sm:flex sm:items-center sm:gap-2">
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
  );
}

export default PCMenu;
