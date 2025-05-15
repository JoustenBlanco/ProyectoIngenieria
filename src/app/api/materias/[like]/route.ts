import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nombre = searchParams.get("nombre");

    if (!nombre) {
      return NextResponse.json(
        { error: "Falta el nombre de la materia" },
        { status: 400 }
      );
    }
    const whereClause: any = {
      Nombre: {
        contains: nombre,
        lte: "insensitive",
      },
    };

    const subjects = await prisma.rAE_Materia.findMany({ where: whereClause });
    if (subjects.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron materias" },
        { status: 404 }
      );
    }
    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las materias", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
