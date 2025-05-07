import {NextResponse} from "next/server"
import {prisma} from '../../../../lib/prisma'


export async function GET(){
    try {
        const result = await prisma.rAE_Rol_Funcionario.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching teacher rol' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: CreateRolFuncionario = await _req.json();  
      const result = await prisma.rAE_Rol_Funcionario.create({
        data: {        
            Descripcion:data.Descripcion,     
            Nombre:data.Nombre,
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error creating teacher rol' }, { status: 500 });
    }
  }

  export async function PUT(req: Request) {
    try {
      const data : RolFuncionario = await req.json();
      const result = await prisma.rAE_Rol_Funcionario.update({
        where: { Id_rol_funcionario : data.Id_rol_funcionario}, 
        data: {
            Descripcion:data.Descripcion,     
            Nombre:data.Nombre,
        },
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error updating teacher rol' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_rol_funcionario } = await _req.json(); 
      const result = await prisma.rAE_Rol_Funcionario.delete({
        where: { Id_rol_funcionario:Id_rol_funcionario}, 
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting teacher rol' }, { status: 500 });
    }
  }