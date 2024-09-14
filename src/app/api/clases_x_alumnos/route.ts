import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { ClasesXAlumnos, CreateRecord, RecordXStudent } from "../../../../types";

export async function GET(){
    try {
        const result = await prisma.rAE_Clases_X_Alumnos.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching classes X students' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: ClasesXAlumnos = await _req.json();  
      const result = await prisma.rAE_Clases_X_Alumnos.create({
        data: {
            Id_Clase:data.Id_Clase,
            Id_alumno:data.Id_alumno,
            Id_dia_lectivo:data.Id_dia_lectivo,
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating classes X students' }, { status: 500 });
    }
  }


  export async function DELETE(_req: Request) {
    try {
      const { Id_Alumno, Id_Clase, Id_dia_lectivo } = await _req.json(); 
      const result = await prisma.rAE_Clases_X_Alumnos.delete({
        where: { 
            Id_alumno_Id_Clase_Id_dia_lectivo:{
                Id_alumno:Id_Alumno,
                Id_Clase:Id_Clase,
                Id_dia_lectivo:Id_dia_lectivo  
            }
        }, 
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting classes X students' }, { status: 500 });
    }
  }