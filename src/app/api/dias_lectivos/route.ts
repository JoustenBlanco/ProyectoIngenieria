import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CreateSchoolDay, SchoolDay } from "../../../../types";

export async function GET(){
    try {
        const result = await prisma.rAE_Dias_lectivos.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching school days' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: CreateSchoolDay = await _req.json();  
      const result = await prisma.rAE_Dias_lectivos.create({
        data: {
            Fecha:new Date(data.Fecha),                          
            Comentario:data.Comentario || null,
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating School days' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : SchoolDay = await req.json();
      const result = await prisma.rAE_Dias_lectivos.update({
        where: {Id_dia_lectivo : data.Id_dia_lectivo}, 
        data: {
            Comentario:data.Comentario || null,
            Fecha:new Date(data.Fecha),
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating school day' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_dia_lectivo } = await _req.json(); 
      const result = await prisma.rAE_Dias_lectivos.delete({
        where: { Id_dia_lectivo:Id_dia_lectivo}, 
    });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting school day' }, { status: 500 });
    }
  }