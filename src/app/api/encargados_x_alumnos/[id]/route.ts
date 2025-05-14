import { NextResponse } from "next/server";
import { prisma } from "../../../../../lib/prisma";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const Id_student = searchParams.get("Id_estudiante");

    if (!Id_student) {
      return NextResponse.json(
        { error: "Id_estudiante is required" },
        { status: 400 }
      );
    }

    const result = await prisma.rAE_Encargado_X_Alumno.findMany({
      where: {
        Id_alumno: parseInt(Id_student, 10),
      },
      include: {
        RAE_Encargado_legal: true,
      },
    });

    if (!result || result.length === 0) {
      return NextResponse.json({ error: "Parents not found" }, { status: 404 });
    }
    const parentsOnly = result.map((entry) => entry.RAE_Encargado_legal);

    return NextResponse.json(parentsOnly, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching parents per student" },
      { status: 500 }
    );
  }
}
