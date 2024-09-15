import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { College, CreateCollege } from "../../../../types";

export async function GET(){
    try {
        const students = await prisma.rAE_Colegio.findMany({});
        return NextResponse.json(students, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error: 'Error fetching colleges' }, { status: 500 });
      }
}

export async function POST(_req:Request){
    try {
        const data: CreateCollege = await _req.json();
        const result = await prisma.rAE_Colegio.create({
            data:{
                Nombre: data.Nombre, 
                Direccion:data.Direccion,  
                Telefono:data.Telefono || null,
                Correo:data.Correo,
            },
        });
        return NextResponse.json(result,{status:201})
    } catch (error) {
        return NextResponse.json({ error: 'Error creating college' }, { status: 500 });
    }
}

export async function PUT(_req:Request){
    try {
        const data : College = await _req.json();
        const result = await prisma.rAE_Colegio.update({
            where:{Id_colegio:data.Id_colegio},
            data:{
                Nombre: data.Nombre, 
                Direccion:data.Direccion,  
                Telefono:data.Telefono || null,
                Correo:data.Correo,
            }
        });
        return NextResponse.json(result,{status:200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:'Error while updating the college'}, {status:500});
    }
}

export async function DELETE(_req: Request) {
    try {
      const { Id_colegio } = await _req.json(); 
      const result = await prisma.rAE_Colegio.delete({
        where: { Id_colegio: Id_colegio },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting college' }, { status: 500 });
    }
  }