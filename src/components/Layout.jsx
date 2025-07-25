import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useThemeStore } from "../store/useThemeStore";

function Layout() {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme}>
      <Navbar />
      <div>
        <Outlet />
      </div>

      <div className="text-center py-5 px-2  bg-green-500 text-white">
        Made By Ahmed Mousa 😘
      </div>
    </div>
  );
}

export default Layout;
