"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button, DarkThemeToggle } from "flowbite-react";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
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

  return (
    <aside
      className={`${
        isCollapsed ? "w-14" : "w-64"
      } h-full bg-lsp-blue  dark:bg-[#00011f] text-white dark:text-gray-400 flex-col justify-start items-center pt-8 transition-all duration-300`}
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
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`flex items-center p-2 cursor-pointer w-full border-l-4 border-black my-2 hover:bg-gray-500 hover:bg-opacity-20 transition-all duration-300
                ${
                  pathname === item.path
                    ? "bg-gray-500 bg-opacity-25 border-white dark:border-gray-400 font-bold text-white dark:text-gray-500 transition-all duration-300"
                    : "text-gray-400"
                }
              `}
              onClick={async() => {
                if (item.name === "Cerrar Sesión") {
                    sessionStorage.removeItem("auth-store");
                    await signOut({ 
                      redirect: true, 
                      callbackUrl: "/homepages/auth/login" 
                    });
                }
                else{
                  router.push(item.path)}}
                }
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
          )
          )}
          {/* <li onClick={async () => {
      sessionStorage.removeItem("auth-store");
      await signOut({ 
        redirect: true, 
        callbackUrl: "/homepages/auth/login" 
      });
    }}>
  <Button className={`
    flex items-center p-2 cursor-pointer w-full border-l-4 border-transparent my-2 
    transition-all duration-300 bg-lsp-blue dark:bg-[#00011f] hover:bg-red-700
    ${isCollapsed ? 'justify-center' : ''}
  `}
    >
    <img
      src="/images/logout.svg"
      alt="Logout icon"
      className="h-6 w-6 mr-4"
    />
    {!isCollapsed && <span>Cerrar Sesión</span>}
  </Button>
</li> */}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
