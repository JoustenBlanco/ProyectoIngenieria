import React from "react";

interface CurseProps {
  image: string;
  title: string;
}

const Mainten: React.FC<CurseProps> = ({ image, title }) => {
  const getPaddingColor = (title: string) => {
    switch (title.toLowerCase()) {
      case "usuarios":
        return "bg-green-500";
      case "estudiantes":
        return "bg-violet-700";
      case "encargados legales":
        return "bg-red-500";
      default:
        return "bg-gray-700";
    }
  };

  return (
    <div className="flex gap-8 justify-start items-center w-full h-24 bg-white p-4 pl-0 rounded-xl hover:bg-gray-100 transition-all duration-300">
      <img
        src={image}
        className={`w-32 h-32 ${getPaddingColor(title)} rounded-full rounded-s-none p-1 shadow-md`}
        alt=""
      />
      <h2 className="text-2xl font-bold text-gray-500">{title}</h2>
    </div>
  );
};

export default Mainten;
