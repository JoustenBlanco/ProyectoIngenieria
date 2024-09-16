import {NextResponse} from "next/server"
import prisma from '../../../../lib/prisma'
import { FuncionariosXRol } from "../../../../types";

//filtra por funcionarios de momento no le veo sentido al findMany
//api/funcionarios_x_rol?Id_funcionario=1
export async function GET(_req:Request){
    try {
        const { searchParams } = new URL(_req.url); 
        const Id_funcionario = searchParams.get('Id_funcionario'); 
        console.log('El id del funcionario es ',Id_funcionario);
        const result = await prisma.rAE_Funcionarios_X_Rol.findFirst({
          where:{Id_funcionario:Number(Id_funcionario)}
        });
        return NextResponse.json(result,{status:200});
    } catch (error) {
        console.log(error);
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