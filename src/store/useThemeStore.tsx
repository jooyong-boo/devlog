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
      document.body.dataset.theme = "";
    }
    if (currentTheme === "") {
      document.body.dataset.theme = "dark";
    }
    set((state) => ({
      theme: state.theme === "" ? "dark" : "",
    }));
  },
}));

export default useThemeStore;
