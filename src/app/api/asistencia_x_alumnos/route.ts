import {NextResponse} from "next/server"
import {prisma} from '../../../../lib/prisma'


export async function GET(){
    try {
        const result = await prisma.rAE_Asistencia_X_Alumnos.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching record' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: RecordXStudent = await _req.json();  
      const result = await prisma.rAE_Asistencia_X_Alumnos.create({
        data: {
            Id_asistencia:data.Id_asistencia,
            Id_alumno:data.Id_alumno,
            Asistio:data.Asistio,
            Comentarios : data.Comentarios || null,
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error creating Record X Student' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : RecordXStudent = await req.json();
      const result = await prisma.rAE_Asistencia_X_Alumnos.update({
        where: { 
            Id_asistencia_Id_alumno:{
                Id_alumno:data.Id_alumno,
                Id_asistencia:data.Id_asistencia,
            }
        }, 
        data: {
            Asistio : data.Asistio,
            Comentarios : data.Comentarios || null,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error updating student' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
        // Soporte para query string
        const { searchParams } = new URL(_req.url);
        let Id_asistencia = searchParams.get("Id_asistencia");
        let Id_alumno = searchParams.get("Id_alumno");

        // Si no viene por query, intenta leer del body (soporta ambos)
        if (!Id_asistencia || !Id_alumno) {
          const body = await _req.json().catch(() => ({}));
          Id_asistencia = Id_asistencia || body.Id_asistencia;
          Id_alumno = Id_alumno || body.Id_alumno;
        }

        if (!Id_asistencia || !Id_alumno) {
          return NextResponse.json({ error: 'Missing Id_asistencia or Id_alumno' }, { status: 400 });
        }

        const result = await prisma.rAE_Asistencia_X_Alumnos.delete({
          where: {
            Id_asistencia_Id_alumno: {
              Id_alumno: Number(Id_alumno),
              Id_asistencia: Number(Id_asistencia),
            },
          },
        });
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Error deleting record' }, { status: 500 });
      }
  }