import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const descripcion = searchParams.get("descripcion");

    if (!descripcion) {
      return NextResponse.json(
        { error: "Falta la descripcion de la clase" },
        { status: 400 }
      );
    }
    const whereClause: any = {
      Descripcion: {
        contains: descripcion,
        lte: "insensitive",
      },
    };

    const classes = await prisma.rAE_Clases.findMany({
      where: whereClause,
      include: {
        RAE_Funcionarios: {
          select: {
            Primer_nombre: true,
            Primer_apellido: true,
            Segundo_apellido: true,
          },
        },
        RAE_Materia: {
          select: {
            Nombre: true,
          },
        },
        RAE_Secciones: {
          select: {
            Nombre: true,
          },
        },
      },
    });
    if (classes.length === 0) {
      return NextResponse.json(
        { error: "No se encontraron clases" },
        { status: 404 }
      );
    }
    return NextResponse.json(classes, { status: 200 });
  } catch (error) {
    console.error("Error al obtener las clases", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
