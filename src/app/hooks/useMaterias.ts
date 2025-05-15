import { useState, useCallback, useEffect } from "react";

export function useMaterias() {
  const [subjects, setSubjects] = useState<Materia[]>([]);
  const fetchSubjects = useCallback(async () => {
    try {
      const response = await fetch("/api/materias");
      if (response.ok) {
        const data = await response.json();
        setSubjects(data);
      } else {
        throw new Error("Error al obtener las Materias");
      }
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    fetchSubjects();
  }, [fetchSubjects]);
  return { subjects, setSubjects, fetchSubjects };
}
