import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CreateStudent, Student } from "../../../../types";

export async function GET(_req:Request){
    try {
        const students = await prisma.rAE_Alumnos.findMany({});
        return NextResponse.json(students, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Error fetching students' }, { status: 500 });
      }
}


export async function POST(_req: Request) {
  try {
    const data: CreateStudent = await _req.json();  
    const newStudent = await prisma.rAE_Alumnos.create({
      data: {
        Primer_nombre: data.Primer_nombre,
        Segundo_nombre: data.Segundo_nombre || null,  
        Primer_apellido: data.Primer_apellido,
        Segundo_apellido: data.Segundo_apellido || null,
        Fecha_nacimiento: new Date(data.Fecha_nacimiento), 
        Grado: data.Grado,
        Cedula: data.Cedula,
        Correo_mep: data.Correo_mep,
        Estado: data.Estado,
        Id_seccion: data.Id_seccion,
      },
    });
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating student' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
      const data : Student = await req.json();
      const updatedStudent = await prisma.rAE_Alumnos.update({
        where: { Id_alumno: data.Id_alumno }, 
        data: {
          Primer_nombre: data.Primer_nombre,
          Segundo_nombre: data.Segundo_nombre || null,
          Primer_apellido: data.Primer_apellido,
          Segundo_apellido: data.Segundo_apellido || null,
          Fecha_nacimiento: new Date(data.Fecha_nacimiento),
          Grado: data.Grado,
          Cedula: data.Cedula,
          Correo_mep: data.Correo_mep,
          Estado: data.Estado,
          Id_seccion: data.Id_seccion,
        },
      });
      return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating student' }, { status: 500 });
    }
  }
  
//El body del request es solo "Id_alumno" : valor

  export async function DELETE(_req: Request) {
    try {
      const { Id_alumno } = await _req.json(); 
      console.log('El valor del id_alumno es ', Id_alumno);
      const deletedStudent = await prisma.rAE_Alumnos.delete({
        where: { Id_alumno: Id_alumno },
      });
      return NextResponse.json(deletedStudent, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting student' }, { status: 500 });
    }
  }
  