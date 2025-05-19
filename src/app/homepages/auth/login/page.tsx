"use client";

import React, { useState } from "react";
import Input from "../../../_components/Atoms/input";
import Carousel from "../../../_components/Atoms/carousel";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import useAuthStore from "../../../../../provider/store";
import recoveryPassword from "../../../services/password_mail";

export default function LoginPage() {
  const router = useRouter();
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  const { setUser } = useAuthStore();

  const images = [
    "/images/user.svg",
    "/images/escudo.svg",
    "/images/To-do-list.svg",
  ];

  const titles = [
    "Bienvenido",
    "Liceo San Pedro",
    "Control de Asistencias LSP",
  ];
  const descriptions = [
    "¡Inicia sesión y a trabajar!",
    "Cada día es una nueva oportunidad para aprender, crecer y brillar",
    "Controla la asistencia de tus estudiantes",
  ];

  const handleShowPassword = () => {
    if (showPassword === "text") {
      setShowPassword("password");
    } else {
      setShowPassword("text");
    }
  };

  const handleRecoveryPassword = async (event: React.MouseEvent) => {
    event.preventDefault();
    if (cedula === "") {
      setError("Por favor ingrese su cédula");
      return;
    } else {
      const urlGetUser = `/api/funcionarios/cedula/[ced]?cedula=${cedula}`;
      const fetchWorker = await fetch(urlGetUser, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const worker: Funcionarios = await fetchWorker.json();
      if (!worker) {
        setError("Error al recuperar la contraseña, comuniquese con soporte");
        return;
      }
      if (worker.Estado === "I" || worker.Change_password === "Y") {
        setError(
          "El usuario se encuentra inactivo o ya solicito recuperar su contraseña, comuniquese con soporte si cree que es un error"
        );
        return;
      }
      try {
        await recoveryPassword(worker);
        setError("Se ha enviado un correo a su cuenta con la nueva contraseña");
      } catch (error) {
        console.error("Error al recuperar la contraseña:", error);
        setError("Error al recuperar la contraseña, comuniquese con soporte");
        return;
      }
    }
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      cedula,
      password,
    });
    if (res?.error) {
      setError("Credenciales incorrectas, por favor intente de nuevo.");
      console.log("El error es " + res.error);
    } else {
      const session = await getSession();
      const urlUsuario = `/api/funcionarios/[id]?Id_funcionario=${session?.user.id}`;
      const resultUsuario = await fetch(urlUsuario);
      const funcionario: Funcionarios = await resultUsuario.json();
      if (funcionario.Estado === "I") {
        setError("El usuario se encuentra inactivo, comuniquese con soporte");
        return;
      }
      const urlRolxFuncionario = `/api/funcionarios_x_rol?Id_funcionario=${session?.user.id}`;
      const resultRolXFuncionario = await fetch(urlRolxFuncionario);
      const rol_x_funcionario: FuncionariosXRol =
        await resultRolXFuncionario.json();
      const rolUrl = `/api/rol_funcionario/[Id]?Id_rol_funcionario=${rol_x_funcionario.Id_rol_funcionario}`;
      const resultRol = await fetch(rolUrl);
      const rol: RolFuncionario = await resultRol.json();
      const usuario: User = {
        Id: funcionario.Id_funcionario,
        FirstName: funcionario.Primer_nombre,
        LastName: funcionario.Primer_apellido,
        Email: funcionario.Email,
        Cedula: funcionario.Cedula,
        Status: funcionario.Estado,
        PhoneNumber: funcionario.Numero_telefono,
        Rol: rol.Nombre,
      };
      setUser(usuario);
      console.log("El funcionario es: ", funcionario);
      if (funcionario.Change_password === "Y") {
        router.push("/homepages/auth/recovery_password");
      } else {
        router.push("/homepages/curses");
      }
    }
  };

  return (
    <div className="app-scaled flex flex-col md:flex-row bg-white dark:bg-gray-900 rounded-2xl overflow-hidden w-full max-w-6xl mx-auto shadow-2xl relative">
      <div className="absolute top-4 right-4">
        <img src="/images/escudo.svg" alt="Logo de LSP" className="h-14 w-14" />
      </div>
      <div className="w-full md:w-2/5 hidden md:flex text-white p-7 items-center justify-center bg-lsp-blue dark:bg-gray-900 flex-col border-r border-blue-100 dark:border-gray-800">
        <Carousel images={images} titles={titles} descriptions={descriptions} />
      </div>
      <div className="w-full md:w-3/5 bg-white dark:bg-gray-800 p-16 flex flex-col items-center justify-start ">
        <div className="w-full mb-8 text-left max-w-md">
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Iniciar Sesión <br /> en el Sistema
          </h1>
        </div>
        <form onSubmit={handleLogin} className="w-full max-w-md">
          <Input
            id="cedula"
            name="cedula"
            type="text"
            label="Cédula"
            placeholder="Solo números o letras"
            pattern="[a-zA-Z0-9]+"
            required
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
          />
          <Input
            id="password"
            name="password"
            type={showPassword}
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500">{error}</p>}{" "}
          <div className="flex items-center mb-6">
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
              Mostrar contraseña
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-[#2783B1] dark:bg-blue-900 text-white py-3 px-6 rounded-md shadow-sm hover:bg-[#03075E] dark:hover:bg-blue-950 text-lg"
          >
            Iniciar sesión
          </button>
          <div className="mt-4 text-left">
            <a
              href=""
              onClick={handleRecoveryPassword}
              className="text-gray-700 dark:text-gray-300 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
