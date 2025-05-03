import { NextResponse } from "next/server";import prisma from '../../../../lib/prisma';

export async function GET(_req: Request) {
  try {
    const { searchParams } = new URL(_req.url); 
    const Id_seccion = searchParams.get('Id_seccion'); 
    
    if (!Id_seccion) {
      return NextResponse.json({ error: 'Id_seccion is required' }, { status: 400 });
    }

    const alumnos = await prisma.rAE_Alumnos.findMany({
      where: { Id_seccion: Number(Id_seccion) },
      include: {
        RAE_Secciones: true
      }
    });
    
    return NextResponse.json(alumnos, { status: 200 });
  } catch (error) {
    console.log('Error fetching students: ', error);
    return NextResponse.json({ error: 'Error fetching students' }, { status: 500 });
  }
}
