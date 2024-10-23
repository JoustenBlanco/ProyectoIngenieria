"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface CurseProps {
  image: string;
  title: string;
  description: string;
  route: string;
  sectionId: string; 
}

const Curse: React.FC<CurseProps> = ({ image, title, description, route, sectionId }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${route}?sectionId=${sectionId}`);
  };

  return (
    <div
      onClick={handleClick}
      className="flex gap-8 justify-start items-center w-full bg-white p-4 rounded-xl hover:bg-gray-100 transition-all duration-300"
    >
      <img
        src={image}
        className="w-12 h-12 bg-violet-700 rounded-full p-1 shadow-md"
        alt=""
      />
      <div className="flex-col gap-1">
        <h2 className="text-2xl font-bold text-gray-500">{title}</h2>
        <p className="text-lg text-gray-500 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default Curse;
