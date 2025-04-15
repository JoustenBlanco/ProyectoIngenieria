"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface CurseProps {
  image: string;
  title: string;
  description: string;
  route: string;
  sectionId: string; 
  claseId: string;
}

const Curse: React.FC<CurseProps> = ({ image, title, description, route, sectionId, claseId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${route}?sectionId=${sectionId}&claseId=${claseId}`);
  };


  return (
    <div
      onClick={handleClick}
      className="flex gap-8 justify-start items-center w-full h-44 bg-white dark:bg-gray-800 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700  transition-all duration-300 cursor-pointer"
    >
      <img
        src={image}
        className="w-12 h-12 bg-violet-700 rounded-full p-1 shadow-md"
        alt=""
      />
      <div className="flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-500 dark:text-gray-400">{title}</h2>
        <p className="text-lg text-gray-500 mt-2 hidden md:block">{description}</p>
      </div>
    </div>
  );
};

export default Curse;
