"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "../feedBack/loading";

interface CurseProps {
  image: string;
  title: string;
  description: string;
  route: string;
  sectionId: string; 
  claseId: string;
  onNavigate?: (route: string, sectionId: string, claseId: string) => void; // Nueva prop
}

const Curse: React.FC<CurseProps> = ({ image, title, description, route, sectionId, claseId, onNavigate }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    if (onNavigate) {
      onNavigate(route, sectionId, claseId);
    } 
  };

  if (isLoading) {
    return <Loading />;
  }

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
