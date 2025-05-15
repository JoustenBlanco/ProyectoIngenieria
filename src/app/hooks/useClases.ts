import { useState, useCallback, useEffect } from "react";

export function useClases() {
  const [classes, setClasses] = useState<Clase[]>([]);
  const fetchClasses = useCallback(async () => {
    try {
      const response = await fetch("/api/clases");
      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      } else {
        throw new Error("Error al obtener las Clases");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    fetchClasses();
  }, [fetchClasses]);
  return { classes, setClasses, fetchClasses };
}
