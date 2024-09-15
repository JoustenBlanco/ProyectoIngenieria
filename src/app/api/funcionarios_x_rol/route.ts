import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { FuncionariosXAnnolectivo, FuncionariosXRol } from "../../../../types";

export async function GET(){
    try {
        const result = await prisma.rAE_Funcionarios_X_Rol.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching FuncionariosXRol' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: FuncionariosXRol = await _req.json();  
      const result = await prisma.rAE_Funcionarios_X_Rol.create({
        data: {
            Id_rol_funcionario:data.Id_rol_funcionario,
            Id_funcionario:data.Id_funcionario,
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error creating FuncionariosXRol' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_rol_funcionario, Id_funcionario } = await _req.json(); 
      const result = await prisma.rAE_Funcionarios_X_Rol.delete({
        where: { 
            Id_funcionario_Id_rol_funcionario:{
                Id_funcionario:Id_funcionario,
                Id_rol_funcionario:Id_rol_funcionario,
            }
        }, 
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting FuncionariosXRol' }, { status: 500 });
    }
  }