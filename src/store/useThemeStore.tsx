import { create } from "zustand";

type Theme = "dark" | "";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: "",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => {
    const currentTheme = get().theme;
    if (currentTheme === "dark") {
      document.documentElement.classList.remove("dark");
      set(() => ({
        theme: "",
      }));
    }
    if (currentTheme === "") {
      document.documentElement.classList.add("dark");
      set(() => ({
        theme: "dark",
      }));
    }
  },
}));

export default useThemeStore;
