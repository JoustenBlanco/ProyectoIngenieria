import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CreateRecord, RecordXStudent } from "../../../../types";

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
            Id_Alumno:data.Id_Alumno,
            Asistio:data.Asistio,
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating Record X Student' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : RecordXStudent = await req.json();
      const result = await prisma.rAE_Asistencia_X_Alumnos.update({
        where: { 
            Id_asistencia_Id_Alumno:{
                Id_Alumno:data.Id_Alumno,
                Id_asistencia:data.Id_asistencia,
            }
        }, 
        data: {
            Asistio : data.Asistio,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating student' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_asistencia, Id_Alumno } = await _req.json(); 
      const result = await prisma.rAE_Asistencia_X_Alumnos.delete({
        where: { 
            Id_asistencia_Id_Alumno:{
                Id_Alumno:Id_Alumno,
                Id_asistencia:Id_asistencia,
            }
        }, 
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting record' }, { status: 500 });
    }
  }