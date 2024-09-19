import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CreateParents, Parents } from "../../../../types";

export async function GET(){
    try {
        const result = await prisma.rAE_Encargado_legal.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching parents' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: CreateParents = await _req.json();  
      const result = await prisma.rAE_Encargado_legal.create({
        data: {
            Primer_nombre:data.Primer_nombre,
            Segundo_nombre:data.Segundo_nombre || null,        
            Primer_apellido:data.Primer_apellido,      
            Segundo_apellido:data.Segundo_apellido || null,      
            Cedula:data.Cedula,               
            Numero:data.Numero,                
            Correo:data.Correo,
            Estado:data.Estado,
        },
      }); 
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating parent' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : Parents = await req.json();
      const result = await prisma.rAE_Encargado_legal.update({
        where: { 
            Id_encargado_legal : data.Id_encargado_legal
        }, 
        data: {
            Primer_nombre:data.Primer_nombre,
            Segundo_nombre:data.Segundo_nombre || null,        
            Primer_apellido:data.Primer_apellido,      
            Segundo_apellido:data.Segundo_apellido || null,      
            Cedula:data.Cedula,               
            Numero:data.Numero,                
            Correo:data.Correo,
            Estado:data.Estado,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating parent' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_encargado_legal } = await _req.json(); 
      const result = await prisma.rAE_Encargado_legal.delete({
        where:{Id_encargado_legal:Id_encargado_legal},
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting parent' }, { status: 500 });
    }
  }