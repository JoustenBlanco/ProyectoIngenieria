import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cedula = searchParams.get("cedula") || "";

    const reportData = await prisma.rAE_Alumnos.findMany({
      where: {
        Cedula: {
          contains: cedula,
        },
      },
      include: {
        RAE_Asistencia_X_Alumnos: true,
      },
    });
    console.log(reportData);
    return NextResponse.json(reportData, { status: 200 });
  } catch (error) {
    console.error("Error al obtener reporte:", error);
    return NextResponse.json(
      { error: "Error al obtener los datos del reporte" },
      { status: 500 }
    );
  }
}
