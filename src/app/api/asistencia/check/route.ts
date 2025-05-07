import { NextResponse } from "next/server";
import {prisma} from '../../../../../lib/prisma';

// Función para verificar si ya existe una asistencia para la sección, clase y fecha dadas
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sectionId = searchParams.get("sectionId");
  const classId = searchParams.get("classId");
  const date = searchParams.get("date");

  // Validación de los parámetros
  if (!sectionId || !classId || !date) {
    return NextResponse.json(
      { error: "sectionId, classId, y date son obligatorios" },
      { status: 400 }
    );
  }

  try {
    console.log('como llega:', date);
    const parsedDate = new Date(date);
    console.log('como se parsea:', parsedDate);
    const startOfDay = new Date(parsedDate);
    startOfDay.setUTCHours(0, 0, 0, 0);

    const endOfDay = new Date(parsedDate);
    endOfDay.setUTCHours(23, 59, 59, 999);


    const existingAttendance = await prisma.rAE_Asistencia.findFirst({
      where: {
        Id_clase: parseInt(classId, 10),
        RAE_Clases: {
          Id_seccion: parseInt(sectionId, 10),
        },
        Fecha: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      include: {
        RAE_Asistencia_X_Alumnos: {
          include: {
            RAE_Alumnos: true, 
          },
        },
      },
    });
console.log(existingAttendance);
    return NextResponse.json(
      existingAttendance || { exists: false },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking attendance:", error);
    return NextResponse.json({ error: "Error checking attendance" }, { status: 500 });
  }
}
