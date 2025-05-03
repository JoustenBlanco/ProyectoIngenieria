import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'


export async function GET(_req:Request){
    try {
        const students = await prisma.rAE_Anno_lectivo.findMany({});
        return NextResponse.json(students, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Error fetching school years' }, { status: 500 });
      }
}

export async function POST (_req:Request){
    try {
        const data : CreateSchoolYear = await _req.json();
        const result = await prisma.rAE_Anno_lectivo.create({
            data:{
                Anno:data.Anno,
                Comentarios:data.Comentarios || null,                         
                Estado:data.Estado,                               
                Id_colegio:data.Id_colegio,
                Criterio_alerta_temprana:data.Criterio_alerta_temprana,
                Fecha_Inicio:new Date(data.Fecha_Inicio),
                Fecha_Finalizacion:new Date(data.Fecha_Finalizacion),
            }
        });
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json({error:'Error creating the school year'}, {status:500})
    }
}

export async function PUT(_req:Request){
    try {
        const data : SchoolYear = await _req.json();
        const result = await prisma.rAE_Anno_lectivo.update({
            where:{Id_anno_lectivo:data.Id_anno_lectivo},
            data:{
                Anno:data.Anno,
                Comentarios:data.Comentarios || null,                         
                Estado:data.Estado,                               
                Id_colegio:data.Id_colegio,
                Criterio_alerta_temprana:data.Criterio_alerta_temprana,
                Fecha_Inicio:new Date(data.Fecha_Inicio),
                Fecha_Finalizacion:new Date(data.Fecha_Finalizacion),
            },
        });
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({error:'Error updating the school year'}, {status:500});
    }
}

export async function DELETE(_req: Request) {
    try {
      const { Id_anno_lectivo } = await _req.json(); 
      const result = await prisma.rAE_Anno_lectivo.delete({
        where: { Id_anno_lectivo: Id_anno_lectivo },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting student' }, { status: 500 });
    }
  }
