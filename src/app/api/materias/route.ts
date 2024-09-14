import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CrearMateria, CreateStudent, Materia, Student } from "../../../../types";

export async function GET(_req:Request){
    try {
        const students = await prisma.rAE_Materia.findMany({});
        return NextResponse.json(students, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Error fetching materia' }, { status: 500 });
      }
}


export async function POST(_req: Request) {
  try {
    const data: CrearMateria = await _req.json();  
    const newStudent = await prisma.rAE_Materia.create({
      data: {
        Nombre:data.Nombre,       
        Descripcion:data.Descripcion || null,      
        Tipo_materia:data.Tipo_materia,  
      },
    });
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating materia' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
      const data : Materia = await req.json();
      const updatedStudent = await prisma.rAE_Materia.update({
        where: { Id_Materia: data.Id_Materia }, 
        data: {
          Nombre:data.Nombre,       
          Descripcion:data.Descripcion || null,      
          Tipo_materia:data.Tipo_materia, 
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
      const { Id_Materia } = await _req.json(); 
      const deletedStudent = await prisma.rAE_Materia.delete({
        where: { Id_Materia: Id_Materia },
      });
      return NextResponse.json(deletedStudent, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting student' }, { status: 500 });
    }
  }
  