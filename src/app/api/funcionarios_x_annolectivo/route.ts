import {NextResponse} from "next/server"
import {prisma} from '../../../../lib/prisma'


export async function GET(){
    try {
        const result = await prisma.rAE_Funcionarios_X_AnnoLectivo.findMany();
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching FuncionariosXAnnoLectivo' }, { status: 500 });
    }
}

export async function POST(_req: Request) {
    try {
      const data: FuncionariosXAnnolectivo = await _req.json();  
      const result = await prisma.rAE_Funcionarios_X_AnnoLectivo.create({
        data: {
            Id_anno_lectivo:data.Id_anno_lectivo,
            Id_funcionario:data.Id_funcionario,
        },
      });
      return NextResponse.json(result, { status: 201 });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: 'Error creating FuncionariosXAnnoLectivo' }, { status: 500 });
    }
  }

  export async function DELETE(_req: Request) {
    try {
      const { Id_anno_lectivo, Id_funcionario } = await _req.json(); 
      const result = await prisma.rAE_Funcionarios_X_AnnoLectivo.delete({
        where: { 
            Id_funcionario_Id_anno_lectivo:{
                Id_funcionario:Id_funcionario,
                Id_anno_lectivo:Id_anno_lectivo,
            }
        }, 
      });
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Error deleting FuncionariosXAnnoLectivo' }, { status: 500 });
    }
  }