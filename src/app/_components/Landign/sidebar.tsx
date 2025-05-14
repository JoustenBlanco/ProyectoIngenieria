"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import useAuthStore from "../../../../provider/store";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); // Para el drawer en sm
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: "Asistencia", 
      path: "/homepages/curses", 
      icon: "/images/book.svg" },
    {
      name: "Reportes",
      path: "/homepages/Reports",
      icon: "/images/report.svg",
    },
    {
      name: "Mantenimiento",
      path: "/homepages/maintenance",
      icon: "/images/maintenance.svg",
    },
    {
      name: "Información",
      path: "/homepages/about",
      icon: "/images/about.svg",
    },
    {
      name: "Configuración",
      path: "/homepages/config",
      icon: "/images/config.svg",
    },
    {
      name: "Cerrar Sesión",
      path: "",
      icon: "/images/logout.svg",
    },
  ];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const user = useAuthStore((state) => state.user) as User | null;

  // Función para renderizar los items del menú (reutilizable)
  const renderMenuItems = (onClickItem?: () => void) =>
    menuItems.map((item) => {
      if (item.name === "Mantenimiento" && user?.Rol !== "Administrador") {
        return null;
      }
      return (
        <li
          key={item.path}
          className={`flex items-center p-2 cursor-pointer w-full border-l-4 border-black my-2 hover:bg-gray-500 hover:bg-opacity-20 transition-all duration-300
            ${
              pathname === item.path
                ? "bg-gray-500 bg-opacity-25 border-white dark:border-gray-400 font-bold text-white dark:text-gray-500 transition-all duration-300"
                : "text-gray-400"
            }
          `}
          onClick={async () => {
            if (item.name === "Cerrar Sesión") {
              sessionStorage.removeItem("auth-store");
              await signOut({
                redirect: true,
                callbackUrl: "/homepages/auth/login",
              });
            } else {
              router.push(item.path);
            }
            if (onClickItem) onClickItem();
          }}
        >
          <img
            src={item.icon}
            alt={`${item.name} icon`}
            className={`h-6 w-6 mr-4 ${
              pathname === item.path ? "filter-none" : "filter grayscale"
            }`}
          />
          {!isCollapsed && (
            <span
              className={`${
                pathname === item.path ? "text-white" : "text-gray-400"
              }`}
            >
              {item.name}
            </span>
          )}
        </li>
      );
    });

  return (
    <>
      {/* AppBar para pantallas sm y menores */}
      <nav className="md:hidden flex items-center justify-between bg-lsp-blue dark:bg-[#00011f] text-white dark:text-gray-400 px-4 py-3">
        <button
          className="focus:outline-none hover:bg-gray-500 hover:bg-opacity-20 rounded p-1 transition-all duration-200"
          onClick={() => setDrawerOpen(true)}
          aria-label="Abrir menú"
        >
          <img
            src="/images/hamburger.svg"
            alt="Abrir menú"
            className="h-7 w-7"
            style={{
              filter: drawerOpen ? "none" : "grayscale(80%)",
              opacity: drawerOpen ? 1 : 0.8,
            }}
          />
        </button>
        <div className="flex items-center space-x-3">
          <img src="/images/escudo.svg" alt="Logo de LSP" className="h-10 w-10" />
          <span className="text-xl font-bold">RAE LSP</span>
        </div>
      </nav>
      {/* Drawer lateral para menú en sm */}
      {drawerOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black bg-opacity-40"
            onClick={() => setDrawerOpen(false)}
          />
          <aside className="relative w-64 bg-lsp-blue dark:bg-[#00011f] text-white dark:text-gray-400 h-full flex flex-col pt-8 z-50 transition-all duration-300">
            <div className="flex justify-between items-center px-4 py-2">
              <div className="flex items-center space-x-4">
                <img src="/images/escudo.svg" alt="Logo de LSP" className="h-12 w-12" />
                <h1 className="text-2xl font-bold">RAE LSP</h1>
              </div>
              <button
                className="h-6 w-6 cursor-pointer my-3 hover:bg-gray-500 hover:bg-opacity-40"
                onClick={() => setDrawerOpen(false)}
                aria-label="Cerrar menú"
              >
                <img src="/images/hideSideBar.svg" alt="Cerrar menú" />
              </button>
            </div>
            <nav className="pt-6">
              <ul>
                {renderMenuItems(() => setDrawerOpen(false))}
              </ul>
            </nav>
          </aside>
        </div>
      )}

      {/* Sidebar para pantallas md y mayores */}
      <aside
        className={`${
          isCollapsed ? "w-14" : "w-64"
        } hidden md:block h-full bg-lsp-blue  dark:bg-[#00011f] text-white dark:text-gray-400 flex-col justify-start items-center pt-8 transition-all duration-300`}
      >
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex items-center space-x-4">
            {!isCollapsed && (
              <img
                src="/images/escudo.svg"
                alt="Logo de LSP"
                className="h-12 w-12"
              />
            )}
            {!isCollapsed && <h1 className="text-2xl font-bold">RAE LSP</h1>}
          </div>
          <img
            src="/images/hideSideBar.svg"
            alt="Hide Sidebar"
            className="h-6 w-6 cursor-pointer my-3 hover:bg-gray-500 hover:bg-opacity-40"
            onClick={toggleSidebar}
          />
        </div>
        <nav className="pt-6">
          <ul>
            {renderMenuItems()}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
