"use client";
import React, { useState } from "react";

interface StudentProps {
  image: string;
  name: string;
  cedula: string;
  status: string;
  present: boolean;
  onAttendanceChange: (cedula: string, isPresent: boolean) => void;
  onCommentChange: (cedula: string, comment: string) => void;
}

const Student: React.FC<StudentProps> = ({
  image,
  name,
  cedula,
  status,
  present,
  onAttendanceChange,
  onCommentChange,
}) => {
  const [comment, setComment] = useState("");

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

  const handleAttendanceToggle = () => {
    onAttendanceChange(cedula, !present);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newComment = e.target.value;
    setComment(newComment);
    onCommentChange(cedula, newComment);
  };

  return (
    <div className="flex gap-0 justify-start items-center w-full bg-white p-4 hover:bg-gray-100 transition-all duration-300 h-16 dark:bg-gray-800">
      <img src={image} className="w-12 h-12 bg-green-500 rounded-full p-1 shadow-md" alt="" />
      <h2 className="text-sm font-bold text-gray-500 pr-8 w-80 ml-4">{name}</h2>
      <p className="text-sm text-gray-500 w-24">{cedula}</p>
      <div className="w-24 text-center px-4">
        <p className={`rounded-full ${getStatusColor(status)} text-sm p-1`}>{status}</p>
      </div>
      <div className="flex items-center w-40 gap-2">
        <input
          type="checkbox"
          id={`attendance-${cedula}`}
          name={`attendance-${cedula}`}
          className="h-4 w-4 text-green-600 focus:ring-green-500 bg-green-600 border-gray-300 rounded"
          checked={present}
          onChange={handleAttendanceToggle}
        />
        <input
          type="text"
          placeholder="Comentarios"
          value={comment}
          onChange={handleCommentChange}
          className="w-full text-sm px-2 py-1 border border-gray-300 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:border-green-500"
        />
      </div>
    </div>
  );
};

export default Student;
