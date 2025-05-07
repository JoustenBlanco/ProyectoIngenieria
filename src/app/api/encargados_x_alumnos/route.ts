import {NextResponse} from "next/server"
import {prisma} from '../../../../lib/prisma'


export async function GET(){
    try {
        const result = await prisma.rAE_Encargado_X_Alumno.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching EncargadosXAlumnos' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: EncargadoXAlumno = await _req.json();  
      const result = await prisma.rAE_Encargado_X_Alumno.create({
        data: {
            Id_alumno:data.Id_alumno,
            Id_encargado_legal:data.Id_encargado_legal
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error creating EncargadosXAlumnos' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_encargado_legal, Id_alumno } = await _req.json(); 
      const result = await prisma.rAE_Encargado_X_Alumno.delete({
        where: { 
            Id_encargado_legal_Id_alumno:{
                Id_alumno:Id_alumno,
                Id_encargado_legal:Id_encargado_legal,
            }
        }, 
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting EncargadosXAlumnos' }, { status: 500 });
    }
  }