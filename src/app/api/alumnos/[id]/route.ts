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

    const result = await prisma.rAE_Alumnos.findFirst({
      where: {
        Id_alumno: parseInt(Id_student, 10),
      }
    });

    if (!result) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching student per id" },
      { status: 500 }
    );
  }
}
