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
      const { Id_asistencia, Id_alumno } = await _req.json(); 
      const result = await prisma.rAE_Asistencia_X_Alumnos.delete({
        where: { 
            Id_asistencia_Id_alumno:{
                Id_alumno:Id_alumno,
                Id_asistencia:Id_asistencia,
            }
        }, 
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting record' }, { status: 500 });
    }
  }