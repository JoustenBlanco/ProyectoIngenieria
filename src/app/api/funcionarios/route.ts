import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { CrearFuncionarios, Funcionarios } from "../../../../types";

export async function GET(){
    try {
        const result = await prisma.rAE_Funcionarios.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching teachers' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: CrearFuncionarios = await _req.json();  
      const result = await prisma.rAE_Funcionarios.create({
        data: {
            Primer_nombre:data.Primer_nombre,                                        
            Segundo_nombre:data.Segundo_nombre || null,                                         
            Primer_apellido:data.Primer_apellido,                                          
            Segundo_apellido:data.Segundo_apellido || null,                                    
            Cedula:data.Cedula,                                                
            Estado:data.Estado,                                                 
            Suplente:data.Suplente,                                               
            Password:data.Password,
        },
      }); 
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: 'Error creating teacher' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : Funcionarios = await req.json();
      const result = await prisma.rAE_Funcionarios.update({
        where: { 
            Id_funcionario : data.Id_funcionario
        }, 
        data: {
            Primer_nombre:data.Primer_nombre,                                        
            Segundo_nombre:data.Segundo_nombre || null,                                         
            Primer_apellido:data.Primer_apellido,                                          
            Segundo_apellido:data.Segundo_apellido || null,                                    
            Cedula:data.Cedula,                                                
            Estado:data.Estado,                                                 
            Suplente:data.Suplente,                                               
            Password:data.Password,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error updating teachers' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_funcionario } = await _req.json(); 
      const result = await prisma.rAE_Funcionarios.delete({
        where:{Id_funcionario:Id_funcionario},
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting teacher' }, { status: 500 });
    }
  }