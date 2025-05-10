"use client";
import DarkMode from "../../_components/config/config";
import { useSession } from "next-auth/react";
import { use, useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Config() {
  const { data: session, status } = useSession();
  useEffect(() => {
    console.log("Llega al useEffect de about");
  if (status == "unauthenticated"){
    console.log("No autenticado");
    redirect("/homepages/auth/login");
  }
},
 [session, status]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-500">Configuración</h1>
      <div className="">
        <DarkMode/>
      </div>
    </div>
  );
}
