import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CreateEarlyWarning, EarlyWarning } from "../../../../types";

export async function GET (){
    try {
        const result = await prisma.rAE_Alerta_Temprana.findMany();
        return NextResponse.json(result,{status:200})
    } catch (error) {
        return NextResponse.json({error:'Error while fetching all the early warnings'},{status:500});
    }
}

export async function POST (_req:Request){
    try {
        const data : CreateEarlyWarning = await _req.json();
        const result = await prisma.rAE_Alerta_Temprana.create({
            data:{
                Id_alumno:data.Id_alumno,
                Descripcion:data.Descripcion,          
                Fecha:new Date(data.Fecha),
                Estado:data.Estado,        
                Id_funcionario:data.Id_funcionario,
            }
        });
        return NextResponse.json(result,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:'Error while creating the early warnings'},{status:500});
    }
}

export async function PUT(_req: Request) {
    try {
      const data: EarlyWarning = await _req.json();
  
      const result = await prisma.rAE_Alerta_Temprana.update({
        where: {
          Id_alerta:data.Id_alerta
        },
        data: {
          Descripcion: data.Descripcion,
          Fecha: new Date(data.Fecha),  
          Estado: data.Estado,
        },
      });
  
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.error(error);  
      return NextResponse.json({ error: 'Error while updating the early warning' }, { status: 500 });
    }
  }
  

/*
La es estructura del body es 

{
  "Id_alerta": 2,
  "Id_alumno": 1,
  "Id_Funcionario": 1
}
*/

export async function DELETE(_req: Request) {
    try {
      const { Id_alerta } = await _req.json(); 
  
      const deletedAlert = await prisma.rAE_Alerta_Temprana.delete({
        where: {Id_alerta:Id_alerta},
      });
  
      return NextResponse.json(deletedAlert, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting the early warning' }, { status: 500 });
    }
  }
  