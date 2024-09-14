import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CreateClasses, Classes } from "../../../../types";


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
      const data: CreateClasses = await _req.json();  
      const result = await prisma.rAE_Clases.create({
        data: {                      
            Descripcion:data.Descripcion || null,            
            Hora_inicio:data.Hora_inicio,          
            Hora_finalizacion:data.Hora_finalizacion,         
            Estado:data.Estado,           
            Id_Materia:data.Id_Materia,
            Id_asistencia:data.Id_asistencia,          
            Id_dia_lectivo:data.Id_dia_lectivo, 
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating classes' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : Classes = await req.json();
      const result = await prisma.rAE_Clases.update({
        where: { 
            Id_Clase_Id_dia_lectivo:{
                Id_Clase:data.Id_Clase,
                Id_dia_lectivo:data.Id_dia_lectivo
            }
        }, 
        data: {
            Descripcion:data.Descripcion || null,            
            Hora_inicio:data.Hora_inicio,          
            Hora_finalizacion:data.Hora_finalizacion,         
            Estado:data.Estado,           
            Id_Materia:data.Id_Materia,
            Id_asistencia:data.Id_asistencia,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating classes' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_Clase, Id_dia_lectivo } = await _req.json(); 
      const result = await prisma.rAE_Clases.delete({
        where: { 
            Id_Clase_Id_dia_lectivo:{
                Id_Clase:Id_Clase,
                Id_dia_lectivo:Id_dia_lectivo,
            },
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting classes' }, { status: 500 });
    }
  }