import { useState, useCallback, useEffect } from "react";

export function useFuncionarios() {
  const [funcionarios, setFuncionarios] = useState<Funcionarios[]>([]);
  const fetchFuncionarios = useCallback(async () => {
    try {
      const response = await fetch("/api/funcionarios");
      if (response.ok) {
        const data = await response.json();
        setFuncionarios(data);
      } else {
        throw new Error("Error al obtener los Funcionarios");
      }
    } catch (error) {
      console.error("Error al cargar funcionarios:", error);
    }
  }, []);
  useEffect(() => {
    fetchFuncionarios();
  }, [fetchFuncionarios]);
  return { funcionarios, setFuncionarios, fetchFuncionarios };
}
