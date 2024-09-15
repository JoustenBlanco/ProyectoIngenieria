import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { Clase, CreateClase } from "../../../../types";

export async function GET(){
    try {
        const result = await prisma.rAE_Clases.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching classes' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: CreateClase = await _req.json();  
      const result = await prisma.rAE_Clases.create({
        data: {
            Descripcion: data.Descripcion || null,      
            Hora_inicio: new Date(data.Hora_inicio),              
            Hora_finalizacion: new Date(data.Hora_finalizacion),          
            Estado: data.Estado,                   
            Id_asistencia: data.Id_asistencia,            
            Id_funcionario: data.Id_funcionario,           
            Id_materia: data.Id_materia,               
            Id_seccion: data.Id_seccion,               
            Fecha: new Date(data.Fecha),  
        },
      }); 
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating class' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : Clase = await req.json();
      const result = await prisma.rAE_Clases.update({
        where: { 
            Id_clase : data.Id_clase
        }, 
        data: {
            Descripcion: data.Descripcion || null,      
            Hora_inicio: new Date(data.Hora_inicio),              
            Hora_finalizacion: new Date(data.Hora_finalizacion),          
            Estado: data.Estado,                   
            Id_asistencia: data.Id_asistencia,            
            Id_funcionario: data.Id_funcionario,           
            Id_materia: data.Id_materia,               
            Id_seccion: data.Id_seccion,               
            Fecha: new Date(data.Fecha),  
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating class' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_clase } = await _req.json(); 
      const result = await prisma.rAE_Clases.delete({
        where:{Id_clase:Id_clase},
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting class' }, { status: 500 });
    }
  }