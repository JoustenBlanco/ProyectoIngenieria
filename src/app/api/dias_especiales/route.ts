import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CreateSpecialDay, SpecialDay } from "../../../../types";

export async function GET(){
    try {
        const result = await prisma.rAE_Dias_especiales.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching special days' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: CreateSpecialDay = await _req.json();  
      const result = await prisma.rAE_Dias_especiales.create({
        data: {
            Fecha:new Date(data.Fecha),                          
            Comentarios:data.Comentarios || null,
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating special days' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : SpecialDay = await req.json();
      const result = await prisma.rAE_Dias_especiales.update({
        where: {Id_dia_especial : data.Id_dia_especial}, 
        data: {
            Comentarios:data.Comentarios || null,
            Fecha:new Date(data.Fecha),
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating special day' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_dia_especial } = await _req.json(); 
      const result = await prisma.rAE_Dias_especiales.delete({
        where: { Id_dia_especial:Id_dia_especial}, 
    });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting special day' }, { status: 500 });
    }
  }