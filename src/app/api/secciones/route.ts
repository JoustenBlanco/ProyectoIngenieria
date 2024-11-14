import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CreateSeccion, Seccion } from "../../../../types";

export async function GET(_req:Request){
    try {
        const students = await prisma.rAE_Secciones.findMany({
          include: {
          RAE_Funcionarios: true
        }
      });
        return NextResponse.json(students, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Error fetching secciones' }, { status: 500 });
      }
}


export async function POST(_req: Request) {
  try {
    const data: CreateSeccion = await _req.json();  
    console.log(data);
    const newStudent = await prisma.rAE_Secciones.create({
      data: {
        Estado: data.Estado,                   
        Comentarios: data.Comentarios || null,      
        Grado: data.Grado,                    
        Nombre: data.Nombre,                  
        Id_funcionario: data.Id_funcionario,     
      },
    });
    return NextResponse.json(newStudent, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error creating seccion' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
    try {
      const data : Seccion = await req.json();
      const updatedStudent = await prisma.rAE_Secciones.update({
        where: { Id_seccion: data.Id_seccion }, 
        data: {
            Estado: data.Estado,                   
            Comentarios: data.Comentarios || null,      
            Grado: data.Grado,                    
            Nombre: data.Nombre,                  
            Id_funcionario: data.Id_funcionario,
        },
      });
      return NextResponse.json(updatedStudent, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating seccion' }, { status: 500 });
    }
  }
  

  export async function DELETE(_req: Request) {
    try {
      const { Id_seccion } = await _req.json(); 
      const deletedStudent = await prisma.rAE_Secciones.delete({
        where: { Id_seccion: Id_seccion },
      });
      return NextResponse.json(deletedStudent, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting seccion' }, { status: 500 });
    }
  }
  