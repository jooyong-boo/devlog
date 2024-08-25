import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type Theme = 'dark' | '';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const useThemeStore = create(
  persist<ThemeStore>(
    (set, get) => ({
      theme: '',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => {
        const currentTheme = get().theme;
        if (currentTheme === 'dark') {
          document.documentElement.classList.remove('dark');
          set(() => ({
            theme: '',
          }));
        }
        if (currentTheme === '') {
          document.documentElement.classList.add('dark');
          set(() => ({
            theme: 'dark',
          }));
        }
      },
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useThemeStore;
