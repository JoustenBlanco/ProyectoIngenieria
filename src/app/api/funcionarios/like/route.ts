import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const cedula = searchParams.get("cedula");

    if (!cedula) {
      return NextResponse.json(
        { error: "Falta la cédula del estudiante" },
        { status: 400 }
      );
    }
    const whereClause: any = {
      Cedula: {
        contains: cedula,
        lte: "insensitive",
      },
    };

    const students = await prisma.rAE_Funcionarios.findMany({ where: whereClause });
    return NextResponse.json(students, { status: 200 });
  } catch (error) {
    console.error("Error al obtener los estudiantes", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
