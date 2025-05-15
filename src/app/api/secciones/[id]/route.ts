import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const nombre = searchParams.get("nombre");

    if (!nombre) {
      return NextResponse.json(
        { error: "Falta el nombre de la seccion" },
        { status: 400 }
      );
    }
    const whereClause: any = {
      Nombre: {
        contains: nombre,
        lte: "insensitive",
      },
    };

    const sections = await prisma.rAE_Secciones.findMany({ where: whereClause });
    if (sections.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron secciones" },
        { status: 404 }
      );
    }
    return NextResponse.json(sections, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las secciones", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
