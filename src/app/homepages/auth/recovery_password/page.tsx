"use client";

import React, { useState } from "react";
import Input from "../../../_components/Atoms/input";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import useAuthStore from "../../../../../provider/store";

export default function LoginPage() {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const { setUser, user } = useAuthStore();

  const handleShowPassword = () => {
    if (showPassword === "text") {
      setShowPassword("password");
    } else {
      setShowPassword("text");
    }
  };

  const handleNewPassword = async (event: React.FormEvent) => {
    event.preventDefault();
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(newPassword)) {
      setError(
        "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número."
      );
      return;
    }

    if (newPassword !== retypedPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const urlGetUser = `/api/funcionarios/[id]?Id_funcionario=${user?.Id}`;

    const fetchWorker = await fetch(urlGetUser, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const worker: Funcionarios = await fetchWorker.json();
    if (!worker) {
      setError("Error al actualizar la contraseña, comuniquese con soporte");
      router.push("/homepages/auth/login");
    }
    const urlUpdateWorker = `/api/funcionarios/[id]?Id_funcionario`;
    worker.Password = newPassword;
    worker.Change_password = "N";
    const result = await fetch(urlUpdateWorker, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(worker),
    });
    if (!result.ok) {
      setError("Error al actualizar la contraseña, comuniquese con soporte");
      router.push("/homepages/auth/login");
    }
    router.push("/homepages/curses");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Nueva contraseña
        </h1>
        <form onSubmit={handleNewPassword} className="w-full">
          <Input
            id="password"
            name="password"
            type={showPassword}
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Input
            id="retypedPassword"
            name="retypedPassword"
            type={showPassword}
            label="Confirmar contraseña"
            placeholder="Confirma tu contraseña"
            required
            value={retypedPassword}
            onChange={(e) => setRetypedPassword(e.target.value)}
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}
          <div className="flex items-center mt-4 mb-6">
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              onChange={handleShowPassword}
            />
            <label
              htmlFor="showPassword"
              className="ml-2 text-lg font-medium text-gray-700 dark:text-gray-300"
            >
              Mostrar contraseñas
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#2783B1] dark:bg-blue-900 text-white py-3 px-6 rounded-md shadow-sm hover:bg-[#03075E] dark:hover:bg-blue-950 text-lg"
          >
            Cambiar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
