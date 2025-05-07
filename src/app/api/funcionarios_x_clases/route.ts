import {NextResponse} from "next/server"
import {prisma} from '../../../../lib/prisma'

//ejemplo de uso del endpoint
///api/clases/[id]?Id_funcionario=1
//Busca a partir del endpoint
export async function GET(_req:Request){
    try {
      const { searchParams } = new URL(_req.url); 
      const Id_funcionario = searchParams.get('Id_funcionario'); 
        const result = await prisma.rAE_Clases.findMany({
          where:{Id_funcionario : Number(Id_funcionario)},
          include:{RAE_Secciones:true, RAE_Materia:true}
        });
        
        return NextResponse.json(result,{status:200});
    } catch (error) {
        console.log('El error es ', error);
        return NextResponse.json({ error: 'Error fetching classes' }, { status: 500 });
    }
}