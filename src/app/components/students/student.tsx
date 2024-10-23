"use client";
import React from "react";

interface StudentProps {
  image: string;
  name: string;
  id: string;
  status: string;
  present: string;
}

const Curse: React.FC<StudentProps> = ({
  image,
  name,
  id,
  status,
  present,
}) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "a":
        return "bg-green-500 text-green-800";
      case "i":
        return "bg-red-500 text-red-800";
      default:
        return "bg-gray-700";
    }
  };

  const isPresent = present === "S";

  return (
    <div className="flex gap-0 justify-start items-center w-full bg-white p-4 hover:bg-gray-100 transition-all duration-300 h-16">
      <img
        src={image}
        className="w-12 h-12 bg-green-500 rounded-full p-1 shadow-md"
        alt=""
      />
      <h2 className="text-sm font-bold text-gray-500 pr-8 w-80 ml-4">
        {name}
      </h2>
      <p className="text-sm text-gray-500 w-24">{id}</p>
      <div className="w-24 text-center px-4">
        <p className={`rounded-full ${getStatusColor(status)} text-sm p-1`}>
          {status}
        </p>
      </div>
      <div className="w-40 text-end">
        <input
          type="checkbox"
          id="check"
          name="check"
          className="h-4 w-4 text-green-600 focus:ring-green-500 bg-green-600 border-gray-300 rounded"
          checked={isPresent}
          readOnly
        />
      </div>
    </div>
  );
};

export default Curse;
