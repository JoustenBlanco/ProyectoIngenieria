"use client";
import DarkMode from "../../components/config/config";

export default function Config() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Configuración</h1>
      <div className="">
        <DarkMode/>
      </div>
    </div>
  );
}
