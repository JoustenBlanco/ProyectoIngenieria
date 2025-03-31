import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const cedula = searchParams.get("cedula");

    if (!startDate || !endDate || !cedula) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    const asistencias = await prisma.rAE_Asistencia_X_Alumnos.findMany({
      where: {
        RAE_Alumnos: {
          Cedula: cedula,
        },
        RAE_Asistencia: {
          Fecha: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        },
      },
      select: {
        RAE_Asistencia: {
          select: {
            Fecha: true,
            RAE_Clases: {
              select: {
                Descripcion: true,
              },
            },
          },
        },
        Asistio: true,
      },
    });

    const formattedData = asistencias.map((asistencia) => ({
      fecha: asistencia.RAE_Asistencia?.Fecha,
      clase: asistencia.RAE_Asistencia?.RAE_Clases?.Descripcion || "Sin clase",
      asistio: asistencia.Asistio,
    }));
    console.log(formattedData);
    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error al obtener el reporte de asistencia", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
