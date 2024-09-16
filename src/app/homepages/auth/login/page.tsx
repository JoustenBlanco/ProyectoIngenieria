"use client";

import React, { useState } from "react";
import Input from "../../../components/Atoms/input";
import Carousel from "../../../components/Atoms/carousel";
import Footer from "../../../components/Landign/footer";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";  // Importa la función signIn de NextAuth

export default function LoginPage() {
  const router = useRouter();

  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const images = [
    "/images/user.svg",
    "/images/escudo.svg",
    "/images/To-do-list.svg",
  ];

  const titles = ["Bienvenido", "Liceo San Pedro", "Control de Asistencias LSP"];
  const descriptions = [
    "¡Inicia sesión y a trabajar!",
    "Cada día es una nueva oportunidad para aprender, crecer y brillar",
    "Controla la asistencia de tus estudiantes",
  ];

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await signIn("credentials", {
      redirect: false, 
      cedula,          
      password,        
    });
    if (res?.error) {
      
      setError("Credenciales incorrectas, por favor intente de nuevo.");
    } else {
      router.push('/homepages/curses');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E6FAFF] from-5% to-white to-50% flex items-center justify-center flex-col p-8 flex-wrap ">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden w-full max-w-6xl mx-auto shadow-2xl relative">
        <div className="absolute top-4 right-4">
          <img
            src="/images/escudo.svg"
            alt="Logo de LSP"
            className="h-14 w-14"
          />
        </div>
        <div className="w-full md:w-2/5 text-white p-7 flex items-center justify-center bg-lsp-blue flex-col">
          <Carousel
            images={images}
            titles={titles}
            descriptions={descriptions}
          />
        </div>
        <div className="w-full md:w-3/5 bg-white p-16 flex flex-col items-center justify-center ">
          <div className="w-full mb-8 text-left max-w-md">
            <h1 className="text-lg font-bold ">
              Iniciar Sesión <br /> en el Sistema
            </h1>
          </div>
          <form onSubmit={handleLogin} className="w-full max-w-md">
            <div className="mb-6">
              <a
                href="#"
                className="flex w-full bg-white border border-gray-300 rounded-md shadow-xl py-3 px-4 hover:bg-gray-100 h-12"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M20.64 12.2045c0-.6381-.0573-1.2518-.1636-1.8409H12v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M12 21c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.344 0-4.3282-1.5831-5.036-3.7104H3.9574v2.3318C5.4382 18.9832 8.4818 21 12 21z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M6.964 13.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2823-1.71V7.9582H3.9573A8.9965 8.9965 0 0 0 3 12c0 1.4523.3477 2.8268.9573 4.0418L6.964 13.71z"
                    ></path>
                    <path
                      fill="#EA4335"
                      d="M12 6.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C16.4632 3.8918 14.426 3 12 3 8.4818 3 5.4382 5.0168 3.9573 7.9582L6.964 10.29C7.6718 8.1627 9.6559 6.5795 12 6.5795z"
                    ></path>
                  </svg>
                </div>
                <div className="text-center w-full mr-7">
                  <span className="ml-4 text-gray-700 text-sm font-medium">
                    Iniciar Sesión con <b>Google</b>
                  </span>
                </div>
              </a>
            </div>

            <div className="relative my-12 flex items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">ó</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <Input
              id="cedula"
              name="cedula"
              type="text"
              label="Cédula"
              placeholder="Ingresa tu cédula"
              required
              value={cedula} 
              onChange={(e) => setCedula(e.target.value)} 
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              required
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />

            {error && <p className="text-red-500">{error}</p>} {/* Muestra el error si ocurre */}

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-lg font-medium text-gray-700"
              >
                Recordarme
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2783B1] text-white py-3 px-6 rounded-md shadow-sm hover:bg-[#03075E] text-lg"
            >
              Iniciar sesión
            </button>

            <div className="mt-4 text-left">
              <a href="#" className="text-gray-700 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
