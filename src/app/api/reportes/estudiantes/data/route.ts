import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const cedula = searchParams.get("cedula");
    const historical = searchParams.get("historical") === "true";

    if (!cedula) {
      return NextResponse.json({ error: "Falta la cédula del estudiante" }, { status: 400 });
    }

    const whereClause: any = {
      RAE_Alumnos: {
        Cedula: cedula,
      },
    };

    if (!historical) {
      if (!startDate || !endDate) {
        return NextResponse.json({ error: "Faltan parámetros de fecha" }, { status: 400 });
      }
      whereClause.RAE_Asistencia = {
        Fecha: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      };
    }

    const asistencias = await prisma.rAE_Asistencia_X_Alumnos.findMany({
      where: whereClause,
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
      orderBy: {
        RAE_Asistencia: {
          Fecha: 'desc',
        },
      },
    });

    const formattedData = asistencias.map((asistencia) => ({
      fecha: asistencia.RAE_Asistencia?.Fecha 
        ? new Date(asistencia.RAE_Asistencia.Fecha).toISOString().split('T')[0]
        : null,
      clase: asistencia.RAE_Asistencia?.RAE_Clases?.Descripcion || "Sin clase",
      asistio: asistencia.Asistio,
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error("Error al obtener el reporte de asistencia", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}