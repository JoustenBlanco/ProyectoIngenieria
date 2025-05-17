import {NextResponse} from "next/server"
import {prisma} from '../../../../lib/prisma'

export async function GET(){
    try {
        const result = await prisma.rAE_Asistencia.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching record' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
  try {
    const data: CreateRecord = await _req.json();
    console.log('Data received:', data);
    const result = await prisma.rAE_Asistencia.create({
      data: {
        Comentarios: data.Comentarios || null,
        Fecha: new Date(data.Fecha),
        Lugar: data.Lugar,
        Hora_inicio: new Date(data.Hora_inicio),
        Hora_finalizacion: new Date(data.Hora_finalizacion),
        Id_clase: data.Id_clase || null,
      },
    });
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error creating record:", error);
    return NextResponse.json({ error: "Error creating record" }, { status: 500 });
  }
}

  export async function PUT(req: Request) {
    try {
      const data : AttendanceRecord = await req.json();
      const result = await prisma.rAE_Asistencia.update({
        where: { Id_asistencia: data.Id_asistencia }, 
        data: {
            Comentarios:data.Comentarios || null,                 
            Fecha :new Date(data.Fecha),          
            Lugar: data.Lugar,
            Hora_inicio: new Date(data.Hora_inicio),
            Hora_finalizacion: new Date(data.Hora_finalizacion),
            Id_clase: data.Id_clase || null,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating record' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
  try {
    // Soporte para query string
    const { searchParams } = new URL(_req.url);
    let Id_asistencia = searchParams.get("Id_asistencia");

    // Si no viene por query, intenta leer del body
    if (!Id_asistencia) {
      const body = await _req.json().catch(() => ({}));
      Id_asistencia = body.Id_asistencia;
    }

    if (!Id_asistencia) {
      return NextResponse.json({ error: 'Missing Id_asistencia' }, { status: 400 });
    }

    const result = await prisma.rAE_Asistencia.delete({
      where: { Id_asistencia: Number(Id_asistencia) },
    });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting record' }, { status: 500 });
  }
  }