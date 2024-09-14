"use client";
import { useRouter, usePathname } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menuItems = [
    { name: 'Cursos', path: '/homepages/curses' },
    { name: 'Reportes', path: '/homepages/Reports' },
    { name: 'Mantenimiento', path: '/mantainence' },
    { name: 'Información', path: '/about' }
  ];

  return (
    <aside className="w-64 h-screen bg-lsp-blue text-white flex-col justify-start items-center pt-8">
      <div className="flex items-center space-x-4 px-4">
      <img
            src="/images/escudo.svg"
            alt="Logo de LSP"
            className="h-12 w-12"
          />
        <h1 className="text-2xl font-bold">RAE LSP</h1>
      </div>
      <nav className="pt-6 ">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={`p-2 cursor-pointer w-full border-l-4 border-black my-2${pathname === item.path ? 'bg-gray-500 bg-opacity-25 border-white' : ''}`}
              onClick={() => router.push(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
