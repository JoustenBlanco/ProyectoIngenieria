"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface CurseProps {
  image: string;
  title: string;
  route: string;
}

const Mainten: React.FC<CurseProps> = ({ image, title, route }) => {
  const router = useRouter();

  const getPaddingColor = (title: string) => {
    switch (title.toLowerCase()) {
      case "usuarios":
        return "bg-gradient-to-br from-green-400 to-emerald-700";
      case "estudiantes":
        return "bg-gradient-to-br from-violet-400 to-indigo-700";
      case "encargados legales":
        return "bg-gradient-to-br from-rose-400 to-red-600";
      default:
        return "bg-gradient-to-br from-gray-400 to-gray-700";
    }
  };

  const handleClick = () => {
    router.push(route);
  };

  return (
    <div
      className="flex flex-col items-center justify-between w-40 h-56 md:w-64 md:h-72 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-br hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-800 dark:hover:to-gray-900"
      onClick={handleClick}
    >
      <div className={`flex items-center justify-center w-28 h-28 md:w-40 md:h-40 ${getPaddingColor(title)} rounded-full mb-6 shadow-lg`}>
        <img
          src={image}
          className="w-20 h-20 md:w-32 md:h-32 object-cover rounded-full p-3"
          alt={title}
        />
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-700 dark:text-gray-100 drop-shadow">{title}</h2>
    </div>
  );
};

export default Mainten;
