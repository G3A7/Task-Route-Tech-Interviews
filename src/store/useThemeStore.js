import { create } from "zustand";
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("route-theme") || "coffee",
  setTheme: (theme) => {
    localStorage.setItem("route-theme", theme);
    set({ theme });
  },
}));
