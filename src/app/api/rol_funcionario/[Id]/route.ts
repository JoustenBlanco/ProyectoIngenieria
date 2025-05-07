import {NextResponse} from "next/server"
import {prisma} from '../../../../../lib/prisma'


export async function GET(_req: Request) {
    try {
        const { searchParams } = new URL(_req.url); 
        const Id_funcionario = searchParams.get('Id_rol_funcionario');
        if (!Id_funcionario) {
            return NextResponse.json({ error: 'Id_rol_funcionario is required' }, { status: 400 });
        }

        const result = await prisma.rAE_Rol_Funcionario.findUnique({
            where: { Id_rol_funcionario: Number(Id_funcionario) }, 
        });
        if (!result) {
            return NextResponse.json({ error: 'Functionary rol not found' }, { status: 404 });
        }
        return NextResponse.json(result,{status:200});
    } catch (error) {
        return NextResponse.json({ error: 'Error fetching teacher rol' }, { status: 500 });
    }
}