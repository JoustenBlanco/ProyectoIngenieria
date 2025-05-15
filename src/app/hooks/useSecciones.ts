import { useState, useCallback, useEffect } from "react";

export function useSecciones() {
  const [sections, setSections] = useState<Seccion[]>([]);
  const fetchSections = useCallback(async () => {
    try {
      const response = await fetch("/api/secciones");
      if (response.ok) {
        const data = await response.json();
        setSections(data);
      } else {
        throw new Error("Error al obtener las Secciones");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    fetchSections();
  }, [fetchSections]);
  return { sections, setSections, fetchSections };
}
